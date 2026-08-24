import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PassThrough } from 'node:stream';

import { Command } from 'commander';

import { registerAuthCommands } from './auth';
import { userConfigPath, type CliConfig } from '../config';

let saved: Record<string, string | undefined>;
let savedStdin: PropertyDescriptor | undefined;
let savedStdinTty: PropertyDescriptor | undefined;
let savedStdoutTty: PropertyDescriptor | undefined;
let root: string;
let stderr: jest.SpyInstance;

const written = (): string => (stderr.mock.calls as unknown[][]).map((call) => String(call[0])).join('');

const writeUser = (config: CliConfig): void => {
  mkdirSync(join(root, 'config', 'roark'), { recursive: true });
  writeFileSync(join(root, 'config', 'roark', 'config.json'), JSON.stringify(config));
};

/** Not a terminal, so `auth login` takes the token from stdin the way CI does. */
const pipeToken = (token: string): void => {
  const stream = new PassThrough();
  Object.defineProperty(process, 'stdin', { value: stream, configurable: true });
  Object.defineProperty(process.stdin, 'isTTY', { value: false, configurable: true });
  Object.defineProperty(process.stdout, 'isTTY', { value: false, configurable: true });
  setImmediate(() => stream.end(token));
};

const invoke = async (...argv: string[]): Promise<void> => {
  const root_ = new Command();
  root_.exitOverride();
  registerAuthCommands(root_, 'roark');
  for (const child of root_.commands) child.exitOverride();
  await root_.parseAsync(['node', 'roark', ...argv]);
};

beforeEach(() => {
  saved = {
    XDG_CONFIG_HOME: process.env['XDG_CONFIG_HOME'],
    ROARK_API_BEARER_TOKEN: process.env['ROARK_API_BEARER_TOKEN'],
  };
  delete process.env['ROARK_API_BEARER_TOKEN'];

  root = mkdtempSync(join(tmpdir(), 'roark-auth-'));
  process.env['XDG_CONFIG_HOME'] = join(root, 'config');

  savedStdin = Object.getOwnPropertyDescriptor(process, 'stdin');
  savedStdinTty = Object.getOwnPropertyDescriptor(process.stdin, 'isTTY');
  savedStdoutTty = Object.getOwnPropertyDescriptor(process.stdout, 'isTTY');
  stderr = jest.spyOn(process.stderr, 'write').mockReturnValue(true);
  process.exitCode = undefined;
});

afterEach(() => {
  for (const [key, value] of Object.entries(saved)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  if (savedStdin) Object.defineProperty(process, 'stdin', savedStdin);
  if (savedStdinTty) Object.defineProperty(process.stdin, 'isTTY', savedStdinTty);
  if (savedStdoutTty) Object.defineProperty(process.stdout, 'isTTY', savedStdoutTty);
  stderr.mockRestore();
  process.exitCode = undefined;
});

describe('auth login', () => {
  it('stores a token piped on stdin', async () => {
    pipeToken('roark-secret-token-1364\n');
    await invoke('auth', 'login');

    expect(JSON.parse(readFileSync(userConfigPath(), 'utf8'))).toEqual({
      bearerToken: 'roark-secret-token-1364',
    });
  });

  it('reports the token masked, never in full', async () => {
    pipeToken('roark-secret-token-1364');
    await invoke('auth', 'login');

    expect(written()).toContain('roar...1364');
    expect(written()).not.toContain('roark-secret-token-1364');
  });

  it('keeps the other settings already in the file', async () => {
    writeUser({ baseURL: 'https://api.example', timeout: 42 });
    pipeToken('new-token-value');
    await invoke('auth', 'login');

    expect(JSON.parse(readFileSync(userConfigPath(), 'utf8'))).toEqual({
      baseURL: 'https://api.example',
      timeout: 42,
      bearerToken: 'new-token-value',
    });
  });

  it('refuses an empty stdin rather than storing nothing', async () => {
    pipeToken('   \n');
    await expect(invoke('auth', 'login')).rejects.toThrow(/No token on stdin/);
    expect(existsSync(userConfigPath())).toBe(false);
  });
});

describe('auth logout', () => {
  it('removes the file and says so', async () => {
    writeUser({ bearerToken: 'stored' });
    await invoke('auth', 'logout');

    expect(existsSync(userConfigPath())).toBe(false);
    expect(written()).toContain('Removed');
  });

  it('is a no-op when there was nothing stored', async () => {
    await invoke('auth', 'logout');
    expect(written()).toContain('Nothing to remove');
  });
});

describe('auth status', () => {
  it('names the stored credential and exits 0', async () => {
    writeUser({ bearerToken: 'roark-stored-token-abcd' });
    await invoke('auth', 'status');

    expect(written()).toContain('Authenticated');
    expect(written()).toContain('roar...abcd');
    expect(written()).not.toContain('roark-stored-token-abcd');
    expect(process.exitCode).toBeUndefined();
  });

  it('says the environment variable wins, and mentions the file it shadows', async () => {
    writeUser({ bearerToken: 'roark-stored-token-abcd' });
    process.env['ROARK_API_BEARER_TOKEN'] = 'roark-environment-token-wxyz';
    await invoke('auth', 'status');

    expect(written()).toContain('ROARK_API_BEARER_TOKEN');
    expect(written()).toContain('roar...wxyz');
    expect(written()).toContain('the environment variable wins');
  });

  it('exits 3 when there is no credential, so a script can branch on it', async () => {
    await invoke('auth', 'status');

    expect(written()).toContain('Not authenticated.');
    expect(process.exitCode).toBe(3);
  });
});
