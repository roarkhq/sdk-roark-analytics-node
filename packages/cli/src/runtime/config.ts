/**
 * Configuration resolution.
 *
 * Precedence, highest first (clig.dev): flag, environment, project config, user
 * config. A project file lets a repo pin a base URL without every contributor
 * exporting it; the user file is where `auth login` writes the token.
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

const PROJECT_FILE = '.roark.json';

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

export const loadConfig = (overrides: CliConfig = {}): CliConfig =>
  merge(readFile(userConfigPath()), readFile(projectConfigPath()), fromEnvironment(), overrides);

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
