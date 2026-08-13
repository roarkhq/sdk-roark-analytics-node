/**
 * Output formatting and colour.
 *
 * The rule throughout is clig.dev's: a TTY gets something a human reads, a pipe
 * gets something a program parses. Nothing here decides that per command, so
 * `roark call list | jq` and `roark call list` differ only in presentation.
 */

export type OutputFormat = 'auto' | 'json' | 'jsonl' | 'plain';

export const OUTPUT_FORMATS: OutputFormat[] = ['auto', 'json', 'jsonl', 'plain'];

export const isTty = (stream: NodeJS.WriteStream = process.stdout): boolean => stream.isTTY === true;

/**
 * Colour is off unless we are certain it will be read by a terminal. `NO_COLOR`
 * is honoured with any value, per the no-color.org convention.
 */
export const supportsColor = (stream: NodeJS.WriteStream = process.stdout): boolean => {
  if (process.env['NO_COLOR'] !== undefined) return false;
  if (process.env['TERM'] === 'dumb') return false;
  return isTty(stream);
};

const CODES = {
  reset: '\u001b[0m',
  dim: '\u001b[2m',
  bold: '\u001b[1m',
  red: '\u001b[31m',
  green: '\u001b[32m',
  yellow: '\u001b[33m',
  blue: '\u001b[34m',
  cyan: '\u001b[36m',
} as const;

export type Style = keyof Omit<typeof CODES, 'reset'>;

export const paint = (text: string, style: Style, enabled: boolean): string =>
  enabled ? `${CODES[style]}${text}${CODES.reset}` : text;

/** JSON with the structure picked out by colour: keys, strings, numbers, literals. */
const colorizeJson = (json: string): string =>
  json.replace(
    /("(\\.|[^"\\])*"\s*:)|("(\\.|[^"\\])*")|(\b(?:true|false|null)\b)|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
    (match, key: string | undefined, _k2, str: string | undefined, _s2, literal: string | undefined) => {
      if (key !== undefined) return `${CODES.blue}${key}${CODES.reset}`;
      if (str !== undefined) return `${CODES.green}${str}${CODES.reset}`;
      if (literal !== undefined) return `${CODES.yellow}${literal}${CODES.reset}`;
      return `${CODES.cyan}${match}${CODES.reset}`;
    },
  );

/**
 * `plain` prints scalars bare so `$(roark ... --format plain)` is directly
 * usable in a shell; anything with structure still has to be JSON.
 */
const plain = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.map(plain).join('\n');
  return JSON.stringify(value);
};

/**
 * `auto` is JSON either way. What the TTY changes is presentation - indentation
 * and colour - not the format, so a command's output stays parseable no matter
 * where it runs and a script never has to pass a flag to get stable output.
 */
export const resolveFormat = (requested: OutputFormat): Exclude<OutputFormat, 'auto'> =>
  requested === 'auto' ? 'json' : requested;

export interface RenderOptions {
  format: OutputFormat;
  color: boolean;
  stream?: NodeJS.WriteStream;
}

export const render = (value: unknown, options: RenderOptions): string => {
  const format = resolveFormat(options.format);

  if (format === 'plain') return plain(value);

  if (format === 'jsonl') {
    const rows = Array.isArray(value) ? value : [value];
    return rows.map((row) => JSON.stringify(row)).join('\n');
  }

  // `json` is pretty-printed when a human will read it and compact when a
  // program will: indentation is noise to `jq` and structure to a person.
  const humanReadable = options.color || isTty(options.stream);
  const json = humanReadable ? JSON.stringify(value, null, 2) : JSON.stringify(value);
  return options.color ? colorizeJson(json) : json;
};

export const write = (text: string, stream: NodeJS.WriteStream = process.stdout): void => {
  if (text.length === 0) return;
  stream.write(text.endsWith('\n') ? text : `${text}\n`);
};
