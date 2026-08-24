import { mkdirSync, mkdtempSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  allowProjectBaseUrlFromEnvironment,
  clearUserConfig,
  loadConfig,
  maskToken,
  projectConfigPath,
  readUserConfig,
  resolveConfig,
  unsafeBaseUrlRedirect,
  userConfigPath,
  writeUserConfig,
  type CliConfig,
} from './config';

/**
 * Every layer is a file or an environment variable, so the tests point
 * `XDG_CONFIG_HOME` and the cwd at a scratch directory rather than mocking the
 * filesystem: the walk-up and the 0600 mode are the behaviours under test and a
 * fake would assert neither.
 */
const ENVIRONMENT_KEYS = [
  'XDG_CONFIG_HOME',
  'ROARK_API_BEARER_TOKEN',
  'ROARK_BASE_URL',
  'ROARK_TIMEOUT',
  'ROARK_MAX_RETRIES',
  'ROARK_ALLOW_PROJECT_BASE_URL',
] as const;

let saved: Record<string, string | undefined>;
let root: string;
let cwd: string;

const writeUser = (config: CliConfig): void => {
  const path = join(root, 'config', 'roark', 'config.json');
  mkdirSync(join(root, 'config', 'roark'), { recursive: true });
  writeFileSync(path, JSON.stringify(config));
};

const writeProject = (directory: string, config: CliConfig | string): void => {
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, '.roark.json'), typeof config === 'string' ? config : JSON.stringify(config));
};

beforeEach(() => {
  saved = Object.fromEntries(ENVIRONMENT_KEYS.map((key) => [key, process.env[key]]));
  for (const key of ENVIRONMENT_KEYS) delete process.env[key];

  root = mkdtempSync(join(tmpdir(), 'roark-config-'));
  process.env['XDG_CONFIG_HOME'] = join(root, 'config');

  // Nested, so the walk-up has somewhere to walk from.
  cwd = join(root, 'repo', 'packages', 'thing');
  mkdirSync(cwd, { recursive: true });
});

afterEach(() => {
  for (const key of ENVIRONMENT_KEYS) {
    const value = saved[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe('userConfigPath', () => {
  it('honours XDG_CONFIG_HOME', () => {
    expect(userConfigPath()).toBe(join(root, 'config', 'roark', 'config.json'));
  });

  it('falls back to ~/.config when XDG_CONFIG_HOME is empty', () => {
    process.env['XDG_CONFIG_HOME'] = '';
    expect(userConfigPath()).toMatch(/\.config[/\\]roark[/\\]config\.json$/);
  });
});

describe('projectConfigPath', () => {
  it('is undefined when no .roark.json is anywhere above', () => {
    expect(projectConfigPath(cwd)).toBeUndefined();
  });

  it('finds one in the directory itself', () => {
    writeProject(cwd, { baseURL: 'https://here.example' });
    expect(projectConfigPath(cwd)).toBe(join(cwd, '.roark.json'));
  });

  it('walks up, so a subdirectory sees the repository root file', () => {
    const repo = join(root, 'repo');
    writeProject(repo, { baseURL: 'https://repo.example' });
    expect(projectConfigPath(cwd)).toBe(join(repo, '.roark.json'));
  });

  it('takes the nearest one when there are several', () => {
    writeProject(join(root, 'repo'), { baseURL: 'https://far.example' });
    writeProject(join(root, 'repo', 'packages'), { baseURL: 'https://near.example' });
    expect(projectConfigPath(cwd)).toBe(join(root, 'repo', 'packages', '.roark.json'));
  });

  it('stops at the filesystem root rather than looping', () => {
    expect(projectConfigPath('/')).toBeUndefined();
  });
});

describe('loadConfig precedence', () => {
  it('returns nothing when no layer supplies anything', () => {
    expect(loadConfig()).toEqual({});
  });

  it('reads the user file', () => {
    writeUser({ bearerToken: 'user-token', timeout: 1000 });
    expect(loadConfig()).toEqual({ bearerToken: 'user-token', timeout: 1000 });
  });

  it('lets a project file beat the user file', () => {
    writeUser({ baseURL: 'https://user.example', bearerToken: 'user-token' });
    writeProject(cwd, { baseURL: 'https://project.example' });

    const config = resolveConfig({}, cwd).config;
    expect(config.baseURL).toBe('https://project.example');
    // The key the project file did not set still comes through.
    expect(config.bearerToken).toBe('user-token');
  });

  it('lets the environment beat a project file', () => {
    writeProject(cwd, { baseURL: 'https://project.example' });
    process.env['ROARK_BASE_URL'] = 'https://environment.example';
    expect(resolveConfig({}, cwd).config.baseURL).toBe('https://environment.example');
  });

  it('lets a flag beat everything', () => {
    writeUser({ baseURL: 'https://user.example' });
    writeProject(cwd, { baseURL: 'https://project.example' });
    process.env['ROARK_BASE_URL'] = 'https://environment.example';
    expect(resolveConfig({ baseURL: 'https://flag.example' }, cwd).config.baseURL).toBe(
      'https://flag.example',
    );
  });

  it('coerces the numeric environment variables and ignores unparseable ones', () => {
    process.env['ROARK_TIMEOUT'] = '2500';
    process.env['ROARK_MAX_RETRIES'] = 'not-a-number';
    const config = loadConfig();
    expect(config.timeout).toBe(2500);
    expect(config.maxRetries).toBeUndefined();
  });

  it('reports a corrupt file rather than behaving as if it were empty', () => {
    writeProject(cwd, '{ not json');
    expect(() => resolveConfig({}, cwd)).toThrow(/Could not parse/);
  });
});

describe('resolveConfig provenance', () => {
  it('records the layer each value came from', () => {
    writeUser({ bearerToken: 'user-token', maxRetries: 1 });
    writeProject(cwd, { baseURL: 'https://project.example' });
    process.env['ROARK_TIMEOUT'] = '10';

    const resolved = resolveConfig({ maxRetries: 5 }, cwd);
    expect(resolved.sources).toEqual({
      bearerToken: 'user',
      baseURL: 'project',
      timeout: 'environment',
      maxRetries: 'flag',
    });
    expect(resolved.projectFile).toBe(join(cwd, '.roark.json'));
  });

  it('attributes a value to the highest layer that set it, not the first', () => {
    writeUser({ baseURL: 'https://user.example' });
    writeProject(cwd, { baseURL: 'https://project.example' });
    expect(resolveConfig({}, cwd).sources.baseURL).toBe('project');
  });

  it('leaves projectFile unset when there is no project file', () => {
    expect(resolveConfig({}, cwd).projectFile).toBeUndefined();
  });
});

/**
 * The case this guards is a checked-in `.roark.json` pointing `baseURL` at a host
 * of the attacker's choosing: without it, cd-ing into a cloned repository and
 * running any command posts the stored token there.
 */
describe('unsafeBaseUrlRedirect', () => {
  it('flags a project base URL paired with the stored user credential', () => {
    writeUser({ bearerToken: 'user-token' });
    writeProject(cwd, { baseURL: 'https://evil.example' });

    expect(unsafeBaseUrlRedirect(resolveConfig({}, cwd))).toEqual({
      baseURL: 'https://evil.example',
      projectFile: join(cwd, '.roark.json'),
      credentialFrom: 'user',
    });
  });

  it('flags it for an ambient environment credential too', () => {
    process.env['ROARK_API_BEARER_TOKEN'] = 'environment-token';
    writeProject(cwd, { baseURL: 'https://evil.example' });

    expect(unsafeBaseUrlRedirect(resolveConfig({}, cwd))?.credentialFrom).toBe('environment');
  });

  it('flags it from a subdirectory, since the lookup walks up', () => {
    writeUser({ bearerToken: 'user-token' });
    writeProject(join(root, 'repo'), { baseURL: 'https://evil.example' });

    expect(unsafeBaseUrlRedirect(resolveConfig({}, cwd))).toBeDefined();
  });

  it('allows it when the project file supplied the credential as well', () => {
    writeUser({ bearerToken: 'user-token' });
    writeProject(cwd, { baseURL: 'https://staging.example', bearerToken: 'project-token' });

    expect(unsafeBaseUrlRedirect(resolveConfig({}, cwd))).toBeUndefined();
  });

  it('allows it when --token named the credential for this run', () => {
    writeUser({ bearerToken: 'user-token' });
    writeProject(cwd, { baseURL: 'https://staging.example' });

    expect(unsafeBaseUrlRedirect(resolveConfig({ bearerToken: 'flag-token' }, cwd))).toBeUndefined();
  });

  it('allows it when there is no credential to leak', () => {
    writeProject(cwd, { baseURL: 'https://staging.example' });
    expect(unsafeBaseUrlRedirect(resolveConfig({}, cwd))).toBeUndefined();
  });

  it('allows a base URL the caller chose, even with a stored credential', () => {
    writeUser({ bearerToken: 'user-token' });
    writeProject(cwd, { baseURL: 'https://project.example' });

    process.env['ROARK_BASE_URL'] = 'https://environment.example';
    expect(unsafeBaseUrlRedirect(resolveConfig({}, cwd))).toBeUndefined();

    delete process.env['ROARK_BASE_URL'];
    expect(unsafeBaseUrlRedirect(resolveConfig({ baseURL: 'https://flag.example' }, cwd))).toBeUndefined();
  });

  it('ignores a project file that sets everything except baseURL', () => {
    writeUser({ bearerToken: 'user-token' });
    writeProject(cwd, { timeout: 100, maxRetries: 2 });

    expect(unsafeBaseUrlRedirect(resolveConfig({}, cwd))).toBeUndefined();
  });
});

describe('allowProjectBaseUrlFromEnvironment', () => {
  it('is false when unset, empty, 0 or false', () => {
    expect(allowProjectBaseUrlFromEnvironment()).toBe(false);
    for (const value of ['', '0', 'false', 'FALSE']) {
      process.env['ROARK_ALLOW_PROJECT_BASE_URL'] = value;
      expect(allowProjectBaseUrlFromEnvironment()).toBe(false);
    }
  });

  it('is true for anything else', () => {
    for (const value of ['1', 'true', 'yes']) {
      process.env['ROARK_ALLOW_PROJECT_BASE_URL'] = value;
      expect(allowProjectBaseUrlFromEnvironment()).toBe(true);
    }
  });
});

describe('writeUserConfig', () => {
  it('writes 0600, because the file holds a bearer token', () => {
    const path = writeUserConfig({ bearerToken: 'secret' });
    expect(statSync(path).mode & 0o777).toBe(0o600);
    expect(statSync(join(root, 'config', 'roark')).mode & 0o777).toBe(0o700);
  });

  it('round-trips through readUserConfig', () => {
    writeUserConfig({ bearerToken: 'secret', timeout: 42 });
    expect(readUserConfig()).toEqual({ bearerToken: 'secret', timeout: 42 });
  });

  it('is removed by clearUserConfig, which reports whether there was anything there', () => {
    expect(clearUserConfig()).toBe(false);
    writeUserConfig({ bearerToken: 'secret' });
    expect(clearUserConfig()).toBe(true);
    expect(readUserConfig()).toEqual({});
  });
});

describe('maskToken', () => {
  it('keeps four characters at each end', () => {
    expect(maskToken('roark-abcdefgh-1364')).toBe('roar...1364');
  });

  it('reveals nothing about a short token', () => {
    expect(maskToken('12345678')).toBe('****');
    expect(maskToken('')).toBe('****');
  });

  it('never contains the whole token', () => {
    const token = 'roark-super-secret-value';
    expect(maskToken(token)).not.toContain(token);
  });
});
