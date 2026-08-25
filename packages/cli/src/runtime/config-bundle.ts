/**
 * Build a config-as-code bundle from a directory of YAML files.
 *
 * This is the one client-side step: read `*.yaml` / `*.yml` under a directory, parse each, inline
 * any `file://` references, and collect them into the `{ resources, prune }` body the API's
 * `config diff` / `config apply` endpoints take. The server validates and reconciles — so this
 * loader stays deliberately schema-agnostic (no per-kind knowledge), and any drift is caught by
 * the API, not silently accepted here.
 */

import { readdir, readFile } from 'node:fs/promises';
import { isAbsolute, join, relative, resolve } from 'node:path';

import { parse as parseYaml } from 'yaml';

import { UsageError } from './errors';

export interface ConfigBundle {
  resources: Array<Record<string, unknown>>;
  prune?: boolean;
}

const FILE_PREFIX = 'file://';

/**
 * Resolve a single `file://relative/path` reference against the config root and return the file's
 * contents. Absolute paths and any path that escapes the root are rejected — a config repo should
 * only ever inline files it ships.
 */
const readFileRef = async (value: string, root: string): Promise<string> => {
  const rel = value.slice(FILE_PREFIX.length);
  const target = isAbsolute(rel) ? rel : join(root, rel);
  if (relative(root, target).startsWith('..')) {
    throw new UsageError(`prompt path escapes the config directory: ${value}`);
  }
  return readFile(target, 'utf8');
};

/**
 * Deep-walk a parsed resource and replace every string that begins with `file://` with the
 * referenced file's contents. Kind-agnostic: it inlines a `file://` wherever it appears (prompts,
 * backstories, step content, …) so the loader needs no schema.
 */
const inlineFileRefs = async (value: unknown, root: string): Promise<unknown> => {
  if (typeof value === 'string') {
    return value.startsWith(FILE_PREFIX) ? readFileRef(value, root) : value;
  }
  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => inlineFileRefs(item, root)));
  }
  if (value && typeof value === 'object') {
    const entries = await Promise.all(
      Object.entries(value).map(async ([key, val]) => [key, await inlineFileRefs(val, root)] as const),
    );
    return Object.fromEntries(entries);
  }
  return value;
};

/**
 * Load every resource YAML under `dir` into a bundle. Files are read in sorted order for a
 * deterministic result; each must be a single mapping with a `kind` and a `name`. Duplicate
 * `kind/name` pairs are rejected up front (the server would reject them too, less clearly).
 */
export const buildBundle = async (dir: string, options: { prune?: boolean } = {}): Promise<ConfigBundle> => {
  const root = resolve(dir);
  let entries: string[];
  try {
    entries = (await readdir(root, { recursive: true })).filter(
      (rel) => rel.endsWith('.yaml') || rel.endsWith('.yml'),
    );
  } catch {
    throw new UsageError(`config directory not found: ${dir}`);
  }
  entries.sort();

  const resources: Array<Record<string, unknown>> = [];
  const seen = new Map<string, string>();

  for (const rel of entries) {
    if (rel.endsWith('roark.lock.json')) continue;
    let raw: unknown;
    try {
      raw = parseYaml(await readFile(join(root, rel), 'utf8'));
    } catch (error) {
      throw new UsageError(`${rel}: invalid YAML: ${(error as Error).message}`);
    }
    if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) continue;

    const resource = (await inlineFileRefs(raw, root)) as Record<string, unknown>;
    const kind = resource['kind'];
    const name = resource['name'];
    if (typeof kind !== 'string' || typeof name !== 'string') {
      throw new UsageError(`${rel}: every resource needs a string 'kind' and 'name'`);
    }
    const key = `${kind}/${name}`;
    const prior = seen.get(key);
    if (prior) throw new UsageError(`${rel}: duplicate ${key} (also defined in ${prior})`);
    seen.set(key, rel);
    resources.push(resource);
  }

  if (resources.length === 0) throw new UsageError(`no config resources (*.yaml) found under ${dir}`);

  return { resources, ...(options.prune === undefined ? {} : { prune: options.prune }) };
};
