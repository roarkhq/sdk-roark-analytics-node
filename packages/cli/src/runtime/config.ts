/**
 * Configuration resolution.
 *
 * Precedence, highest first (clig.dev): flag, environment, project config, user
 * config. A project file lets a repo pin a base URL without every contributor
 * exporting it; the user file is where `auth login` writes the token.
 *
 * A project file is untrusted input. It is found by walking up from the cwd, so
 * it arrives with a `git clone` rather than being something the person running
 * the command wrote, which is why `resolveConfig` records where every value came
 * from: sending a credential to a host that a checked-in file chose is a
 * decision the caller has to make deliberately. See `unsafeBaseUrlRedirect`.
 */

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

export interface CliConfig {
  bearerToken?: string;
  baseURL?: string;
  timeout?: number;
  maxRetries?: number;
}

export const PROJECT_FILE = '.roark.json';

export const userConfigPath = (): string => {
  const xdg = process.env['XDG_CONFIG_HOME'];
  const base = xdg && xdg.length > 0 ? xdg : join(homedir(), '.config');
  return join(base, 'roark', 'config.json');
};

/** Walks up from the cwd, so a command run in a subdirectory still sees the repo's config. */
export const projectConfigPath = (from: string = process.cwd()): string | undefined => {
  let directory = resolve(from);
  for (;;) {
    const candidate = join(directory, PROJECT_FILE);
    if (existsSync(candidate)) return candidate;
    const parent = dirname(directory);
    if (parent === directory) return undefined;
    directory = parent;
  }
};

const readFile = (path: string | undefined): CliConfig => {
  if (!path || !existsSync(path)) return {};
  try {
    const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'));
    if (typeof parsed !== 'object' || parsed === null) return {};
    return parsed as CliConfig;
  } catch (cause) {
    // A corrupt config should say so rather than silently behaving as if the
    // file were empty, which looks like "my token stopped working".
    throw new Error(`Could not parse ${path}: ${(cause as Error).message}`);
  }
};

const number = (value: string | undefined): number | undefined => {
  if (value === undefined || value.trim() === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const fromEnvironment = (): CliConfig => ({
  ...(process.env['ROARK_API_BEARER_TOKEN'] ? { bearerToken: process.env['ROARK_API_BEARER_TOKEN'] } : {}),
  ...(process.env['ROARK_BASE_URL'] ? { baseURL: process.env['ROARK_BASE_URL'] } : {}),
  ...(number(process.env['ROARK_TIMEOUT']) !== undefined ?
    { timeout: number(process.env['ROARK_TIMEOUT'])! }
  : {}),
  ...(number(process.env['ROARK_MAX_RETRIES']) !== undefined ?
    { maxRetries: number(process.env['ROARK_MAX_RETRIES'])! }
  : {}),
});

/** Later arguments win, and an absent key never overwrites a present one. */
const merge = (...layers: CliConfig[]): CliConfig => {
  const result: CliConfig = {};
  for (const layer of layers) {
    for (const [key, value] of Object.entries(layer)) {
      if (value !== undefined) (result as Record<string, unknown>)[key] = value;
    }
  }
  return result;
};

/** Which layer a value came from, lowest precedence first. */
export type ConfigSource = 'user' | 'project' | 'environment' | 'flag';

export interface ResolvedConfig {
  config: CliConfig;
  /** The layer that supplied each key that ended up set. */
  sources: Partial<Record<keyof CliConfig, ConfigSource>>;
  /** The project file that took part in the merge, if one was found. */
  projectFile?: string;
}

export const resolveConfig = (overrides: CliConfig = {}, cwd?: string): ResolvedConfig => {
  const projectFile = projectConfigPath(cwd);
  const layers: [ConfigSource, CliConfig][] = [
    ['user', readFile(userConfigPath())],
    ['project', readFile(projectFile)],
    ['environment', fromEnvironment()],
    ['flag', overrides],
  ];

  const config: CliConfig = {};
  const sources: Partial<Record<keyof CliConfig, ConfigSource>> = {};

  for (const [source, layer] of layers) {
    for (const [key, value] of Object.entries(layer)) {
      if (value === undefined) continue;
      (config as Record<string, unknown>)[key] = value;
      sources[key as keyof CliConfig] = source;
    }
  }

  return { config, sources, ...(projectFile === undefined ? {} : { projectFile }) };
};

export const loadConfig = (overrides: CliConfig = {}): CliConfig => resolveConfig(overrides).config;

export interface BaseUrlRedirect {
  baseURL: string;
  projectFile: string;
  credentialFrom: ConfigSource;
}

/**
 * The one combination that leaks a secret: a project file chose the host, and
 * the credential heading for it is one the caller did not choose per-invocation.
 *
 * `git clone` a repository with a `.roark.json` naming someone else's base URL,
 * run any command anywhere inside it, and the token `auth login` stored would be
 * posted to that host - the SDK attaches `Authorization` to whatever base URL it
 * is given, and never scopes a credential to a host. Same shape as a malicious
 * `.npmrc` pointing `registry` at an attacker.
 *
 * A token that came from the same project file is not a leak: the file supplied
 * both halves and nothing of the caller's travels. Neither is one passed as
 * `--token` for this run, which is an explicit act naming both.
 */
export const unsafeBaseUrlRedirect = (resolved: ResolvedConfig): BaseUrlRedirect | undefined => {
  const { baseURL, bearerToken } = resolved.config;
  if (resolved.sources.baseURL !== 'project' || baseURL === undefined) return undefined;
  if (bearerToken === undefined) return undefined;

  const credentialFrom = resolved.sources.bearerToken;
  if (credentialFrom === undefined || credentialFrom === 'project' || credentialFrom === 'flag') {
    return undefined;
  }

  // `sources.baseURL === 'project'` cannot be set without a project file.
  return { baseURL, projectFile: resolved.projectFile!, credentialFrom };
};

/** `ROARK_ALLOW_PROJECT_BASE_URL`, for scripts that cannot pass the flag. */
export const allowProjectBaseUrlFromEnvironment = (): boolean => {
  const value = process.env['ROARK_ALLOW_PROJECT_BASE_URL'];
  return value !== undefined && value !== '' && value !== '0' && value.toLowerCase() !== 'false';
};

/**
 * Written 0600: it holds a bearer token, and the default 0644 would expose it to
 * every account on a shared machine.
 */
export const writeUserConfig = (config: CliConfig): string => {
  const path = userConfigPath();
  mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
  writeFileSync(path, `${JSON.stringify(config, null, 2)}\n`, { mode: 0o600 });
  return path;
};

export const readUserConfig = (): CliConfig => readFile(userConfigPath());

export const clearUserConfig = (): boolean => {
  const path = userConfigPath();
  if (!existsSync(path)) return false;
  rmSync(path);
  return true;
};

/** `roark-...-abcd` -> `roar...abcd`: enough to identify, not enough to use. */
export const maskToken = (token: string): string =>
  token.length <= 8 ? '****' : `${token.slice(0, 4)}...${token.slice(-4)}`;
