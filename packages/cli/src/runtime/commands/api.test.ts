import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { Command } from 'commander';
import type Roark from '@roarkanalytics/sdk';

import { UsageError } from '../errors';
import { isMethod, parseQuery, registerApiCommand } from './api';

describe('parseQuery', () => {
  it('is undefined when nothing was passed', () => {
    expect(parseQuery(undefined)).toBeUndefined();
    expect(parseQuery([])).toBeUndefined();
  });

  it('collects repeated key=value pairs', () => {
    expect(parseQuery(['limit=5', 'after=abc'])).toEqual({ limit: '5', after: 'abc' });
  });

  it('splits on the first = only, so a value may contain one', () => {
    expect(parseQuery(['filter=status=open'])).toEqual({ filter: 'status=open' });
  });

  it('accepts an empty value', () => {
    expect(parseQuery(['cursor='])).toEqual({ cursor: '' });
  });

  it('rejects a pair with no =', () => {
    expect(() => parseQuery(['limit'])).toThrow(UsageError);
  });
});

describe('isMethod', () => {
  it('accepts the five methods the API uses', () => {
    for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
      expect(isMethod(method)).toBe(true);
    }
  });

  it('rejects anything else', () => {
    expect(isMethod('head')).toBe(false);
    expect(isMethod('GET')).toBe(false);
  });
});

/** Records what the command asked the SDK to do, without making a request. */
const stubClient = () => {
  const calls: { method: string; path: string; options: unknown }[] = [];
  const record =
    (method: string) =>
    (path: string, options: unknown): Promise<unknown> => {
      calls.push({ method, path, options });
      return Promise.resolve({ ok: true });
    };

  return {
    calls,
    client: {
      get: record('get'),
      post: record('post'),
      put: record('put'),
      patch: record('patch'),
      delete: record('delete'),
    } as unknown as Roark,
  };
};

const run = async (argv: string[]) => {
  const stub = stubClient();
  const program = new Command();
  program.exitOverride();
  registerApiCommand(
    program,
    'roark',
    () => stub.client,
    () => ({ format: 'json' as const, color: false }),
  );
  for (const child of program.commands) child.exitOverride();

  // Commander expects argv[0] and argv[1] to be the runtime and the script.
  await program.parseAsync(['node', 'roark', ...argv]);
  return stub.calls;
};

describe('roark api', () => {
  const original = process.stdout.write.bind(process.stdout);
  beforeEach(() => {
    // The command prints its result; silence it so test output stays readable.
    process.stdout.write = (() => true) as typeof process.stdout.write;
  });
  afterEach(() => {
    process.stdout.write = original;
  });

  it('forwards the method and path to the client', async () => {
    const calls = await run(['api', 'get', '/v1/call']);
    expect(calls).toHaveLength(1);
    expect(calls[0]!.method).toBe('get');
    expect(calls[0]!.path).toBe('/v1/call');
  });

  it('lower-cases the method, so GET works too', async () => {
    const calls = await run(['api', 'GET', '/v1/call']);
    expect(calls[0]!.method).toBe('get');
  });

  it('passes query parameters through', async () => {
    const calls = await run(['api', 'get', '/v1/call', '--query', 'limit=5']);
    expect(calls[0]!.options).toEqual({ query: { limit: '5' } });
  });

  it('parses an inline JSON body', async () => {
    const calls = await run(['api', 'post', '/v1/webhook', '--data', '{"url":"https://x.test"}']);
    expect(calls[0]!.options).toEqual({ body: { url: 'https://x.test' } });
  });

  it('reads a body from @file', async () => {
    const file = join(mkdtempSync(join(tmpdir(), 'roark-cli-')), 'body.json');
    writeFileSync(file, '{"url":"https://file.test"}');
    const calls = await run(['api', 'post', '/v1/webhook', '--data', `@${file}`]);
    expect(calls[0]!.options).toEqual({ body: { url: 'https://file.test' } });
  });

  it('sends no body and no query when neither was given', async () => {
    const calls = await run(['api', 'get', '/health']);
    expect(calls[0]!.options).toEqual({});
  });

  it('rejects an unknown HTTP method before making a request', async () => {
    await expect(run(['api', 'fetch', '/v1/call'])).rejects.toThrow(/Unknown HTTP method/);
  });

  it('rejects a path that is not rooted, which would silently hit the wrong URL', async () => {
    await expect(run(['api', 'get', 'v1/call'])).rejects.toThrow(/must start with/);
  });

  it('rejects malformed JSON rather than sending it', async () => {
    await expect(run(['api', 'post', '/v1/webhook', '--data', '{oops'])).rejects.toThrow(/not valid JSON/);
  });
});
