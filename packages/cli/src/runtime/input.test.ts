import { buildArgs, coerceFlag, optionKey, setPath } from './input';
import { UsageError } from './errors';
import type { CliCommand, CliFlag } from './types';

const flag = (overrides: Partial<CliFlag> & Pick<CliFlag, 'name' | 'path'>): CliFlag => ({
  location: 'body',
  required: false,
  valueKind: 'string',
  ...overrides,
});

const command = (overrides: Partial<CliCommand>): CliCommand => ({
  commandPath: ['thing', 'create'],
  clientProperty: 'thing',
  methodName: 'create',
  httpMethod: 'post',
  httpPath: '/v1/thing',
  positionals: [],
  flags: [],
  hasParams: true,
  paramsAllOptional: false,
  bodyOpaque: false,
  bodyVariants: [],
  acceptsBody: true,
  requiresAuth: true,
  ...overrides,
});

describe('optionKey', () => {
  it('matches how Commander camel-cases a flag name', () => {
    expect(optionKey('outbound-dial-type')).toBe('outboundDialType');
    expect(optionKey('limit')).toBe('limit');
  });

  it('flattens a dotted leaf the same way Commander does', () => {
    expect(optionKey('persona.name')).toBe('personaName');
    expect(optionKey('persona.first-name')).toBe('personaFirstName');
  });
});

describe('setPath', () => {
  it('writes a nested wire path', () => {
    const target = {};
    setPath(target, ['metadata', 'source'], 'cli');
    expect(target).toEqual({ metadata: { source: 'cli' } });
  });

  it('does not clobber a sibling already written', () => {
    const target = { metadata: { source: 'cli' } };
    setPath(target, ['metadata', 'run'], '7');
    expect(target).toEqual({ metadata: { source: 'cli', run: '7' } });
  });

  it('replaces a scalar standing where an object needs to go', () => {
    const target = { metadata: 'oops' };
    setPath(target, ['metadata', 'source'], 'cli');
    expect(target).toEqual({ metadata: { source: 'cli' } });
  });
});

describe('coerceFlag', () => {
  it('parses numbers and rejects non-numbers', () => {
    expect(coerceFlag('5', flag({ name: 'limit', path: ['limit'], valueKind: 'integer' }))).toBe(5);
    expect(() => coerceFlag('abc', flag({ name: 'limit', path: ['limit'], valueKind: 'integer' }))).toThrow(
      UsageError,
    );
  });

  it('rejects a fractional value for an integer flag', () => {
    expect(() => coerceFlag('1.5', flag({ name: 'limit', path: ['limit'], valueKind: 'integer' }))).toThrow(
      /whole number/,
    );
  });

  it('splits a comma list, and still accepts JSON', () => {
    const tags = flag({ name: 'tag', path: ['tag'], valueKind: 'array' });
    expect(coerceFlag('a,b', tags)).toEqual(['a', 'b']);
    expect(coerceFlag('["a","b"]', tags)).toEqual(['a', 'b']);
  });

  it('rejects a value outside the enum before any request is made', () => {
    const status = flag({
      name: 'status',
      path: ['status'],
      enumValues: ['success', 'all'],
    });
    expect(coerceFlag('success', status)).toBe('success');
    expect(() => coerceFlag('nope', status)).toThrow(/one of success, all/);
  });

  it('checks every element of a repeated flag against the enum', () => {
    const status = flag({
      name: 'status',
      path: ['status'],
      valueKind: 'array',
      repeatable: true,
      enumValues: ['a', 'b'],
    });
    expect(coerceFlag(['a', 'b'], status)).toEqual(['a', 'b']);
    expect(() => coerceFlag(['a', 'z'], status)).toThrow(/one of a, b/);
  });
});

describe('buildArgs', () => {
  it('passes the only path parameter positionally', () => {
    const definition = command({
      commandPath: ['call', 'get'],
      positionals: [{ name: 'call-id', paramKey: 'callId' }],
      hasParams: false,
      paramsAllOptional: true,
      acceptsBody: false,
    });
    expect(buildArgs({ command: definition, positionals: ['abc'], options: {} })).toEqual(['abc']);
  });

  it('folds an earlier path parameter into the params object, as the SDK expects', () => {
    // customerFlowEdgeCase.update(edgeCaseID, { flowId, ...body })
    const definition = command({
      commandPath: ['customer-flow', 'edge-case', 'update'],
      positionals: [
        { name: 'flow-id', paramKey: 'flowId' },
        { name: 'edge-case-id', paramKey: 'edgeCaseId' },
      ],
      flags: [flag({ name: 'title', path: ['title'] })],
    });

    expect(
      buildArgs({
        command: definition,
        positionals: ['flow-1', 'edge-1'],
        options: { title: 'renamed' },
      }),
    ).toEqual(['edge-1', { flowId: 'flow-1', title: 'renamed' }]);
  });

  it('rejects the wrong number of positionals', () => {
    const definition = command({
      positionals: [{ name: 'call-id', paramKey: 'callId' }],
    });
    expect(() => buildArgs({ command: definition, positionals: [], options: {} })).toThrow(
      /expected 1 argument/,
    );
  });

  it('omits an all-optional params object when nothing was given', () => {
    const definition = command({
      commandPath: ['call', 'list'],
      flags: [flag({ name: 'limit', path: ['limit'], valueKind: 'integer' })],
      paramsAllOptional: true,
    });
    expect(buildArgs({ command: definition, positionals: [], options: {} })).toEqual([]);
    expect(buildArgs({ command: definition, positionals: [], options: { limit: '5' } })).toEqual([
      { limit: 5 },
    ]);
  });

  it('lets flags override a piped body, and --data override both', () => {
    const definition = command({
      flags: [flag({ name: 'title', path: ['title'] }), flag({ name: 'agent-id', path: ['agentId'] })],
    });

    const args = buildArgs({
      command: definition,
      positionals: [],
      options: { title: 'from-flag' },
      stdin: { title: 'from-stdin', agentId: 'a1', extra: true },
      data: { title: 'from-data' },
    });

    expect(args).toEqual([{ title: 'from-flag', agentId: 'a1', extra: true }]);
  });

  it('keeps a key the spec does not name when it arrives in the body', () => {
    const definition = command({ flags: [] });
    expect(buildArgs({ command: definition, positionals: [], options: {}, data: { unknown: 1 } })).toEqual([
      { unknown: 1 },
    ]);
  });

  it('rejects a body that is not a JSON object', () => {
    expect(() => buildArgs({ command: command({}), positionals: [], options: {}, data: [1, 2] })).toThrow(
      /must be a JSON object/,
    );
  });

  it('reports a missing required flag before making a request', () => {
    const definition = command({
      flags: [flag({ name: 'agent-id', path: ['agentId'], required: true })],
    });
    expect(() => buildArgs({ command: definition, positionals: [], options: {} })).toThrow(
      /--agent-id is required/,
    );
  });

  it('accepts a required flag supplied through the body instead', () => {
    const definition = command({
      flags: [flag({ name: 'agent-id', path: ['agentId'], required: true })],
    });
    expect(buildArgs({ command: definition, positionals: [], options: {}, data: { agentId: 'a1' } })).toEqual(
      [{ agentId: 'a1' }],
    );
  });

  it('writes a dotted leaf into its nested wire position', () => {
    const definition = command({
      flags: [flag({ name: 'persona.name', path: ['persona', 'name'] })],
    });
    expect(buildArgs({ command: definition, positionals: [], options: { personaName: 'Ada' } })).toEqual([
      { persona: { name: 'Ada' } },
    ]);
  });
});
