/**
 * `roark api <method> <path>` - the escape hatch.
 *
 * The generated commands cover the endpoints `sdk.yml` exposes, which is
 * deliberately a curated subset. Without this, an endpoint that exists but is
 * not yet configured is unreachable from the CLI and the answer is "wait for a
 * release". Modelled on `gh api`.
 */

import { Command } from 'commander';
import type Roark from '@roarkanalytics/sdk';

import { UsageError } from '../errors';
import { readData, readStdin, stdinIsPiped } from '../input';
import { render, write, type OutputFormat } from '../output';

export const METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const;
type Method = (typeof METHODS)[number];

export const isMethod = (value: string): value is Method => METHODS.includes(value as Method);

/**
 * `--query k=v` repeated, so no shell quoting of a whole query string.
 *
 * Splits on the first `=` only: a value can legitimately contain one, as in
 * `--query filter=status=open`.
 */
export const parseQuery = (entries: string[] | undefined): Record<string, string> | undefined => {
  if (!entries || entries.length === 0) return undefined;
  const query: Record<string, string> = {};
  for (const entry of entries) {
    const index = entry.indexOf('=');
    if (index === -1) throw new UsageError(`--query expects key=value, got '${entry}'`);
    query[entry.slice(0, index)] = entry.slice(index + 1);
  }
  return query;
};

export const registerApiCommand = (
  root: Command,
  binaryName: string,
  clientFor: (options: never) => Roark,
  resolveOutput: (options: never) => { format: OutputFormat; color: boolean },
): void => {
  const command = new Command('api')
    .description('Call any API endpoint directly, including ones without a generated command')
    .argument('<method>', `HTTP method: ${METHODS.join(', ')}`)
    .argument('<path>', 'request path, e.g. /v1/call')
    .option('--data <json>', 'request body as JSON, or @file to read one (@- for stdin)')
    .option(
      '--query <key=value>',
      'query parameter; repeat for more than one',
      (value: string, previous: string[] | undefined) => [...(previous ?? []), value],
    )
    .option('--base-url <url>', 'API base URL')
    .option('--token <token>', 'bearer token')
    .option('--timeout <ms>', 'request timeout in milliseconds')
    .option('--max-retries <count>', 'retries for retryable failures')
    .option('--format <format>', 'output format')
    .option('--json', 'shorthand for --format json')
    .option('--no-color', 'disable colour')
    .addHelpText(
      'after',
      [
        '',
        'Examples:',
        `  ${binaryName} api get /v1/call --query limit=5`,
        `  ${binaryName} api post /v1/webhook --data '{"url":"https://example.com"}'`,
        `  cat body.json | ${binaryName} api post /v1/webhook`,
      ].join('\n'),
    )
    .showHelpAfterError();

  command.action(async (method: string, path: string, options: Record<string, unknown>) => {
    const verb = method.toLowerCase();
    if (!isMethod(verb)) {
      throw new UsageError(`Unknown HTTP method '${method}'. Expected one of ${METHODS.join(', ')}.`);
    }
    if (!path.startsWith('/')) throw new UsageError(`Path must start with '/', got '${path}'`);

    const explicit = options['data'] === undefined ? undefined : readData(options['data'] as string);
    const piped =
      explicit === undefined && stdinIsPiped() ?
        (() => {
          const raw = readStdin().trim();
          return raw.length === 0 ? undefined : (JSON.parse(raw) as unknown);
        })()
      : undefined;

    const body = explicit ?? piped;
    const query = parseQuery(options['query'] as string[] | undefined);

    const client = clientFor(options as never);
    const result: unknown = await client[verb](path, {
      ...(body === undefined ? {} : { body }),
      ...(query === undefined ? {} : { query }),
    });

    write(render(result, resolveOutput(options as never)));
  });

  root.addCommand(command);
};
