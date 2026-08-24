import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { assertBaseUrlIsTrusted, createProgram, resolveOutput, run } from './program';
import { resolveConfig, type CliConfig } from './config';
import { EXIT, UsageError } from './errors';
import type { CliCommand } from './types';

/**
 * These drive the real command tree against a stubbed global `fetch`, which is
 * what the SDK resolves at construction. A mocked SDK would prove the runtime
 * calls something; stubbing the transport proves what actually goes on the wire,
 * which is the point of the credential test below.
 */
const ENVIRONMENT_KEYS = [
  'XDG_CONFIG_HOME',
  'ROARK_API_BEARER_TOKEN',
  'ROARK_BASE_URL',
  'ROARK_ALLOW_PROJECT_BASE_URL',
  'NO_COLOR',
] as const;

const AGENT_LIST: CliCommand = {
  commandPath: ['agent', 'list'],
  clientProperty: 'agent',
  methodName: 'list',
  httpMethod: 'get',
  httpPath: '/v1/agent',
  summary: 'List agents',
  positionals: [],
  flags: [{ name: 'limit', path: ['limit'], location: 'query', required: false, valueKind: 'integer' }],
  hasParams: true,
  paramsAllOptional: true,
  bodyOpaque: false,
  bodyVariants: [],
  acceptsBody: false,
  requiresAuth: true,
};

const AGENT_UPDATE: CliCommand = {
  commandPath: ['agent', 'update'],
  clientProperty: 'agent',
  methodName: 'update',
  httpMethod: 'put',
  httpPath: '/v1/agent/{agentId}',
  summary: 'Update an agent',
  positionals: [{ name: 'agent-id', paramKey: 'agentId' }],
  flags: [{ name: 'name', path: ['name'], location: 'body', required: false, valueKind: 'string' }],
  hasParams: true,
  paramsAllOptional: false,
  bodyOpaque: false,
  bodyVariants: [],
  acceptsBody: true,
  requiresAuth: true,
};

const WEBHOOK_DELETE: CliCommand = {
  commandPath: ['webhook', 'delete'],
  clientProperty: 'webhook',
  methodName: 'delete',
  httpMethod: 'delete',
  httpPath: '/v1/webhook/{webhookId}',
  summary: 'Delete a webhook',
  positionals: [{ name: 'webhook-id', paramKey: 'webhookId' }],
  flags: [],
  hasParams: false,
  paramsAllOptional: true,
  bodyOpaque: false,
  bodyVariants: [],
  acceptsBody: false,
  requiresAuth: true,
};

const OPTIONS = {
  binaryName: 'roark',
  version: '0.0.0-test',
  description: 'test program',
  commands: [AGENT_LIST, AGENT_UPDATE, WEBHOOK_DELETE],
  groups: { agent: 'Manage agents', webhook: 'Manage webhooks' },
  completions: { bash: '# bash' },
};

let saved: Record<string, string | undefined>;
let root: string;
let requests: Request[];
let realFetch: typeof globalThis.fetch;
let respondWith: () => Response;
let silence: jest.SpyInstance[];

const writeUser = (config: CliConfig): void => {
  mkdirSync(join(root, 'config', 'roark'), { recursive: true });
  writeFileSync(join(root, 'config', 'roark', 'config.json'), JSON.stringify(config));
};

const writeProject = (directory: string, config: CliConfig): void => {
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, '.roark.json'), JSON.stringify(config));
};

const invoke = (...argv: string[]): Promise<number> => run(OPTIONS, ['node', 'roark', ...argv]);

beforeEach(() => {
  saved = Object.fromEntries(ENVIRONMENT_KEYS.map((key) => [key, process.env[key]]));
  for (const key of ENVIRONMENT_KEYS) delete process.env[key];

  root = mkdtempSync(join(tmpdir(), 'roark-program-'));
  process.env['XDG_CONFIG_HOME'] = join(root, 'config');
  // Colour codes would land in the assertions on stderr below.
  process.env['NO_COLOR'] = '1';

  requests = [];
  respondWith = () =>
    new Response(JSON.stringify({ data: [] }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });

  realFetch = globalThis.fetch;
  globalThis.fetch = (async (...args: Parameters<typeof globalThis.fetch>) => {
    requests.push(new Request(...args));
    return respondWith();
  }) as typeof globalThis.fetch;

  silence = [
    jest.spyOn(process.stdout, 'write').mockReturnValue(true),
    jest.spyOn(process.stderr, 'write').mockReturnValue(true),
  ];
  process.exitCode = undefined;
});

afterEach(() => {
  globalThis.fetch = realFetch;
  for (const spy of silence) spy.mockRestore();
  for (const key of ENVIRONMENT_KEYS) {
    const value = saved[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  process.exitCode = undefined;
});

const stderr = (): string => (silence[1]!.mock.calls as unknown[][]).map((call) => String(call[0])).join('');

describe('assertBaseUrlIsTrusted', () => {
  const cwdWithRedirect = (): string => {
    const cwd = join(root, 'repo', 'nested');
    mkdirSync(cwd, { recursive: true });
    writeUser({ bearerToken: 'stored-token' });
    writeProject(join(root, 'repo'), { baseURL: 'https://evil.example' });
    return cwd;
  };

  it('refuses to send a stored credential to a base URL a project file chose', () => {
    const resolved = resolveConfig({}, cwdWithRedirect());
    expect(() => assertBaseUrlIsTrusted({}, resolved)).toThrow(UsageError);
    expect(() => assertBaseUrlIsTrusted({}, resolved)).toThrow(/https:\/\/evil\.example/);
  });

  it('names the file and where the credential came from, so the message is actionable', () => {
    const resolved = resolveConfig({}, cwdWithRedirect());
    try {
      assertBaseUrlIsTrusted({}, resolved);
      throw new Error('expected a refusal');
    } catch (error) {
      const message = (error as Error).message;
      expect(message).toContain('.roark.json');
      expect(message).toContain('config.json');
      expect(message).toContain('--allow-project-base-url');
    }
  });

  it('proceeds when --allow-project-base-url was passed', () => {
    const resolved = resolveConfig({}, cwdWithRedirect());
    expect(() => assertBaseUrlIsTrusted({ allowProjectBaseUrl: true }, resolved)).not.toThrow();
  });

  it('proceeds when ROARK_ALLOW_PROJECT_BASE_URL is set', () => {
    const resolved = resolveConfig({}, cwdWithRedirect());
    process.env['ROARK_ALLOW_PROJECT_BASE_URL'] = '1';
    expect(() => assertBaseUrlIsTrusted({}, resolved)).not.toThrow();
  });

  it('says nothing about an ordinary run', () => {
    writeUser({ bearerToken: 'stored-token' });
    expect(() => assertBaseUrlIsTrusted({}, resolveConfig({}, root))).not.toThrow();
  });
});

describe('run: credential routing', () => {
  it('sends no request at all when a project file redirects the base URL', async () => {
    const cwd = join(root, 'repo', 'nested');
    mkdirSync(cwd, { recursive: true });
    writeUser({ bearerToken: 'stored-token' });
    writeProject(join(root, 'repo'), { baseURL: 'https://evil.example' });

    const spy = jest.spyOn(process, 'cwd').mockReturnValue(cwd);
    try {
      expect(await invoke('agent', 'list')).toBe(EXIT.usage);
    } finally {
      spy.mockRestore();
    }

    expect(requests).toHaveLength(0);
    expect(stderr()).toContain('Refusing to send your credential');
  });

  it('honours the redirect once the caller opts in', async () => {
    const cwd = join(root, 'repo', 'nested');
    mkdirSync(cwd, { recursive: true });
    writeUser({ bearerToken: 'stored-token' });
    writeProject(join(root, 'repo'), { baseURL: 'https://trusted.example' });

    const spy = jest.spyOn(process, 'cwd').mockReturnValue(cwd);
    try {
      expect(await invoke('agent', 'list', '--allow-project-base-url')).toBe(EXIT.ok);
    } finally {
      spy.mockRestore();
    }

    expect(requests[0]!.url).toContain('https://trusted.example');
  });

  it('attaches the credential as a bearer token', async () => {
    writeUser({ bearerToken: 'stored-token' });
    expect(await invoke('agent', 'list')).toBe(EXIT.ok);
    expect(requests[0]!.headers.get('authorization')).toBe('Bearer stored-token');
  });
});

describe('run: argv reaches the request', () => {
  beforeEach(() => writeUser({ bearerToken: 'stored-token', baseURL: 'https://api.example' }));

  it('maps a query flag onto the query string', async () => {
    expect(await invoke('agent', 'list', '--limit', '5')).toBe(EXIT.ok);
    expect(requests[0]!.url).toBe('https://api.example/v1/agent?limit=5');
    expect(requests[0]!.method).toBe('GET');
  });

  it('maps a positional onto the path and a flag onto the body', async () => {
    expect(await invoke('agent', 'update', 'agent-123', '--name', 'Renamed')).toBe(EXIT.ok);

    const request = requests[0]!;
    expect(request.url).toBe('https://api.example/v1/agent/agent-123');
    expect(request.method).toBe('PUT');
    expect(await request.json()).toEqual({ name: 'Renamed' });
  });

  it('takes a whole body from --data', async () => {
    expect(await invoke('agent', 'update', 'agent-123', '--data', '{"name":"From data"}')).toBe(EXIT.ok);
    expect(await requests[0]!.json()).toEqual({ name: 'From data' });
  });

  it('rejects a non-numeric value for an integer flag before any request', async () => {
    expect(await invoke('agent', 'list', '--limit', 'lots')).toBe(EXIT.usage);
    expect(requests).toHaveLength(0);
  });
});

describe('run: exit codes', () => {
  it('is 0 for --help and --version', async () => {
    expect(await invoke('--help')).toBe(EXIT.ok);
    expect(await invoke('--version')).toBe(EXIT.ok);
    expect(await invoke('agent', 'list', '--help')).toBe(EXIT.ok);
  });

  it('is 2 for an unknown command, an unknown flag and a missing argument', async () => {
    writeUser({ bearerToken: 'stored-token' });
    expect(await invoke('nonesuch')).toBe(EXIT.usage);
    expect(await invoke('agent', 'list', '--nonesuch')).toBe(EXIT.usage);
    expect(await invoke('agent', 'update')).toBe(EXIT.usage);
    expect(requests).toHaveLength(0);
  });

  it('is 2 from a subcommand, not 1: exitOverride has to be applied down the tree', async () => {
    writeUser({ bearerToken: 'stored-token' });
    expect(await invoke('agent', 'nonesuch')).toBe(EXIT.usage);
  });

  it('is 3 when there is no credential anywhere', async () => {
    expect(await invoke('agent', 'list')).toBe(EXIT.auth);
    expect(requests).toHaveLength(0);
    expect(stderr()).toContain('No credential found');
  });

  it('is 4 for a 404 and 1 for a 400', async () => {
    writeUser({ bearerToken: 'stored-token' });

    respondWith = () =>
      new Response(JSON.stringify({ message: 'nope' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      });
    expect(await invoke('agent', 'list')).toBe(EXIT.notFound);

    respondWith = () =>
      new Response(JSON.stringify({ message: 'bad' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    expect(await invoke('agent', 'list')).toBe(EXIT.apiError);
  });

  it('is 3 for a 401, with the hint that says how to fix it', async () => {
    writeUser({ bearerToken: 'stale-token' });
    respondWith = () =>
      new Response(JSON.stringify({ message: 'no' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });

    expect(await invoke('agent', 'list')).toBe(EXIT.auth);
    expect(stderr()).toContain('auth login');
  });

  it('is 2 when a destructive command cannot prompt, and sends nothing', async () => {
    writeUser({ bearerToken: 'stored-token' });
    expect(await invoke('webhook', 'delete', 'webhook-1', '--no-input')).toBe(EXIT.usage);
    expect(requests).toHaveLength(0);
    expect(stderr()).toContain('--yes');
  });

  it('deletes once --yes is given', async () => {
    writeUser({ bearerToken: 'stored-token' });
    expect(await invoke('webhook', 'delete', 'webhook-1', '--yes')).toBe(EXIT.ok);
    expect(requests[0]!.method).toBe('DELETE');
  });
});

describe('createProgram', () => {
  it('builds each group once, however many commands hang off it', () => {
    const agent = createProgram(OPTIONS).commands.filter((command) => command.name() === 'agent');
    expect(agent).toHaveLength(1);
    expect(agent[0]!.commands.map((command) => command.name()).sort()).toEqual(['list', 'update']);
  });

  it('registers the hand-written commands alongside the generated ones', () => {
    const names = createProgram(OPTIONS)
      .commands.map((command) => command.name())
      .sort();
    expect(names).toEqual(expect.arrayContaining(['api', 'auth', 'completion', 'config']));
  });

  it('puts the generated config subcommands and the settings ones under one command', () => {
    const withConfigResource = {
      ...OPTIONS,
      commands: [
        ...OPTIONS.commands,
        { ...AGENT_LIST, commandPath: ['config', 'diff'], summary: 'Diff a config bundle' },
      ],
    };

    const config = createProgram(withConfigResource).commands.filter(
      (command) => command.name() === 'config',
    );
    expect(config).toHaveLength(1);
    expect(config[0]!.commands.map((command) => command.name())).toEqual(
      expect.arrayContaining(['diff', 'get', 'set', 'list', 'unset', 'path']),
    );
  });
});

describe('resolveOutput', () => {
  it('reads --json as json regardless of --format', () => {
    expect(resolveOutput({ json: true, format: 'plain' }).format).toBe('json');
  });

  it('defaults to auto', () => {
    expect(resolveOutput({}).format).toBe('auto');
  });

  it('lets --no-color win over a colour-capable terminal', () => {
    expect(resolveOutput({ color: false }).color).toBe(false);
  });
});
