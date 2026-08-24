/**
 * Turning a command line into SDK arguments.
 *
 * Three inputs can supply the request body, in increasing precedence: piped
 * stdin, `--data`, then individual flags. That ordering is what makes
 * `cat call.json | roark call create --agent-id other` a useful edit of a saved
 * payload rather than an ambiguous merge.
 */

import { fstatSync, readFileSync } from 'node:fs';

import { UsageError } from './errors';
import type { CliCommand, CliFlag, CliValueKind } from './types';

export type Params = Record<string, unknown>;

const parseJson = (raw: string, source: string): unknown => {
  try {
    return JSON.parse(raw);
  } catch (cause) {
    throw new UsageError(`${source} is not valid JSON: ${(cause as Error).message}`);
  }
};

/** `--data @payload.json` reads a file; anything else is the JSON itself. */
export const readData = (value: string): unknown => {
  if (value.startsWith('@')) {
    const path = value.slice(1);
    if (path === '-') return parseJson(readStdin(), 'stdin');
    try {
      return parseJson(readFileSync(path, 'utf8'), path);
    } catch (cause) {
      if (cause instanceof UsageError) throw cause;
      throw new UsageError(`Could not read ${path}: ${(cause as Error).message}`);
    }
  }
  return parseJson(value, '--data');
};

export const readStdin = (): string => {
  try {
    return readFileSync(0, 'utf8');
  } catch (cause) {
    throw new UsageError(`Could not read stdin: ${(cause as Error).message}`);
  }
};

/**
 * Only consume stdin when there is actually something to read from.
 *
 * "Not a TTY" is not the same question. A descriptor can be closed, or opened
 * non-blocking, or be `/dev/null`, and none of those are a TTY: reading them
 * either fails outright or returns nothing. Under a CI runner it is the first,
 * so `roark agent update <id> --name x` - a command with no pipe in sight -
 * failed with "Could not read stdin".
 *
 * A pipe (`echo … | roark`) is a FIFO and a redirect (`roark < body.json`) is a
 * regular file. Those two are what this is for, so those two are what it asks
 * about, and anything it cannot stat is not a pipe.
 */
export const stdinIsPiped = (fd = 0): boolean => {
  if (fd === 0 && process.stdin.isTTY === true) return false;
  try {
    const stats = fstatSync(fd);
    return stats.isFIFO() || stats.isFile();
  } catch {
    return false;
  }
};

const coerceScalar = (raw: string, kind: CliValueKind, flag: string): unknown => {
  switch (kind) {
    case 'integer':
    case 'number': {
      const parsed = Number(raw);
      if (!Number.isFinite(parsed)) throw new UsageError(`--${flag} expects a number, got '${raw}'`);
      if (kind === 'integer' && !Number.isInteger(parsed)) {
        throw new UsageError(`--${flag} expects a whole number, got '${raw}'`);
      }
      return parsed;
    }
    case 'boolean':
      if (raw === 'true' || raw === '') return true;
      if (raw === 'false') return false;
      throw new UsageError(`--${flag} expects true or false, got '${raw}'`);
    case 'object':
      return parseJson(raw, `--${flag}`);
    case 'array':
      // A single `--tag a,b` is a convenience over repeating the flag; JSON is
      // there for arrays of anything that is not a bare string.
      return raw.trimStart().startsWith('[') ? parseJson(raw, `--${flag}`) : raw.split(',');
    default:
      return raw;
  }
};

export const coerceFlag = (raw: string | string[] | boolean, flag: CliFlag): unknown => {
  if (typeof raw === 'boolean') return raw;

  if (Array.isArray(raw)) {
    const values = raw.map((entry) => coerceScalar(entry, 'string', flag.name));
    assertEnum(values, flag);
    return values;
  }

  const value = coerceScalar(raw, flag.valueKind, flag.name);
  assertEnum(Array.isArray(value) ? value : [value], flag);
  return value;
};

/**
 * Checked here rather than left to the API so a typo costs no round trip and the
 * message can list what was actually allowed.
 */
const assertEnum = (values: unknown[], flag: CliFlag): void => {
  if (!flag.enumValues || flag.enumValues.length === 0) return;
  for (const value of values) {
    if (typeof value !== 'string') continue;
    if (!flag.enumValues.includes(value)) {
      throw new UsageError(`--${flag.name} expects one of ${flag.enumValues.join(', ')}, got '${value}'`);
    }
  }
};

/** Writes `['metadata','source']` into `{ metadata: { source } }`. */
export const setPath = (target: Params, path: string[], value: unknown): void => {
  let cursor = target;
  for (let index = 0; index < path.length - 1; index += 1) {
    const key = path[index]!;
    const existing = cursor[key];
    if (typeof existing !== 'object' || existing === null || Array.isArray(existing)) {
      cursor[key] = {};
    }
    cursor = cursor[key] as Params;
  }
  cursor[path.at(-1)!] = value;
};

export interface BuildArgsInput {
  command: CliCommand;
  /** Positional values in the order the command declares them. */
  positionals: string[];
  /** Commander's parsed options, keyed by the flag's camelCase option name. */
  options: Record<string, unknown>;
  /** Already-parsed `--data` payload, if any. */
  data?: unknown;
  /** Already-read stdin payload, if any. */
  stdin?: unknown;
}

/** Commander stores `--outbound-dial-type` under `outboundDialType`. */
export const optionKey = (flagName: string): string =>
  flagName
    .split(/[.-]/)
    .map((part, index) => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('');

const asObject = (value: unknown, source: string): Params => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new UsageError(`${source} must be a JSON object`);
  }
  return { ...(value as Params) };
};

/**
 * Assembles the argument list for the SDK method.
 *
 * The SDK takes the *last* path parameter positionally and folds any earlier
 * ones into the params object under their wire names, so the CLI's uniform
 * "every path param is a positional" is undone here rather than pushed onto the
 * user. See `customerFlowEdgeCase.update(edgeCaseID, { flowId, ...body })`.
 */
export const buildArgs = (input: BuildArgsInput): unknown[] => {
  const { command, positionals, options } = input;

  if (positionals.length !== command.positionals.length) {
    const expected = command.positionals.map((entry) => `<${entry.name}>`).join(' ');
    throw new UsageError(`expected ${command.positionals.length} argument(s): ${expected}`);
  }

  const params: Params = {
    ...(input.stdin === undefined ? {} : asObject(input.stdin, 'stdin')),
    ...(input.data === undefined ? {} : asObject(input.data, '--data')),
  };

  // Path params other than the last one travel inside the params object.
  command.positionals.slice(0, -1).forEach((entry, index) => {
    params[entry.paramKey] = positionals[index];
  });

  for (const flag of command.flags) {
    const raw = options[optionKey(flag.name)];
    if (raw === undefined) continue;
    setPath(params, flag.path, coerceFlag(raw as string | string[] | boolean, flag));
  }

  for (const flag of command.flags) {
    if (!flag.required) continue;
    if (readPath(params, flag.path) === undefined) {
      throw new UsageError(`--${flag.name} is required`);
    }
  }

  const args: unknown[] = [];
  if (command.positionals.length > 0) args.push(positionals.at(-1));

  const hasParams = Object.keys(params).length > 0;
  if (command.hasParams && (hasParams || !command.paramsAllOptional)) args.push(params);
  else if (hasParams && !command.hasParams) {
    throw new UsageError(`${command.commandPath.join(' ')} takes no parameters`);
  }

  return args;
};

const readPath = (target: Params, path: string[]): unknown => {
  let cursor: unknown = target;
  for (const key of path) {
    if (typeof cursor !== 'object' || cursor === null) return undefined;
    cursor = (cursor as Params)[key];
  }
  return cursor;
};
