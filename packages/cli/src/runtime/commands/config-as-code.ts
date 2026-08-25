/**
 * `roark config diff [dir]` and `roark config apply [dir]` - config as code.
 *
 * These wrap the generated `config.diff` / `config.apply` SDK methods with the one client-side
 * step they need to be useful: building the bundle from a directory of YAML files. Point either
 * at a config directory and it reads `*.yaml`, inlines `file://` references, and submits the
 * `{ resources, prune }` bundle. `--data`/stdin still take a pre-built bundle for scripting.
 *
 * `apply` previews the diff and asks to confirm before writing (config-managed resources absent
 * from the bundle are deleted unless `--no-prune`), so a destructive apply is never a surprise.
 * These replace the raw generated `config diff`/`apply` (excluded in program.ts) so there's one
 * obvious way to run each.
 */

import { Command } from 'commander';
import type Roark from '@roarkanalytics/sdk';

import { confirm } from '../confirm';
import { UsageError } from '../errors';
import { readData, readStdin, stdinIsPiped } from '../input';
import { render, write, type OutputFormat } from '../output';
import { buildBundle, type ConfigBundle } from '../config-bundle';

const OP_MARK: Record<string, string> = { create: '+', update: '~', delete: '-', noop: ' ' };

/** One-line-per-change summary for a terminal; `apply` results also carry a status. */
const formatChanges = (data: {
  changes: Array<Record<string, unknown>>;
  summary: Record<string, number>;
}): string => {
  const lines = data.changes.map((change) => {
    const mark = OP_MARK[String(change['op'])] ?? '?';
    const status = change['status'] ? ` (${String(change['status'])})` : '';
    const error = change['error'] ? `  ${String(change['error'])}` : '';
    return `  ${mark} ${String(change['configKey'])}${status}${error}`;
  });
  const s = data.summary;
  const tally = [
    `${s['create'] ?? 0} to create`,
    `${s['update'] ?? 0} to update`,
    `${s['delete'] ?? 0} to delete`,
    ...(s['failed'] === undefined ? [] : [`${s['failed']} failed`]),
  ].join(', ');
  return [...lines, '', tally].join('\n');
};

const changeCount = (summary: Record<string, number>): number =>
  (summary['create'] ?? 0) + (summary['update'] ?? 0) + (summary['delete'] ?? 0);

/** Resolve the bundle: a directory (build it) or a pre-built bundle via --data / piped stdin. */
const resolveBundle = async (
  dir: string | undefined,
  options: Record<string, unknown>,
): Promise<ConfigBundle> => {
  const prune = options['prune'] === false ? false : undefined;

  if (dir !== undefined) {
    return buildBundle(dir, { ...(prune === undefined ? {} : { prune }) });
  }

  const explicit = options['data'] === undefined ? undefined : readData(options['data'] as string);
  const piped =
    explicit === undefined && stdinIsPiped() ?
      (() => {
        const raw = readStdin().trim();
        return raw.length === 0 ? undefined : (JSON.parse(raw) as unknown);
      })()
    : undefined;
  const body = explicit ?? piped;
  if (body === undefined || typeof body !== 'object') {
    throw new UsageError('provide a config directory (e.g. `./roark`), or a bundle via --data / stdin');
  }
  const bundle = body as ConfigBundle;
  return prune === undefined ? bundle : { ...bundle, prune };
};

const configGroup = (root: Command): Command => {
  const existing = root.commands.find((child) => child.name() === 'config');
  if (existing) return existing;
  const created = new Command('config').description('Config as code, and CLI settings').showHelpAfterError();
  created.action(() => created.outputHelp());
  root.addCommand(created);
  return created;
};

const withCommonOptions = (command: Command): Command =>
  command
    .option('--data <json>', 'pre-built bundle as JSON, or @file (@- for stdin); alternative to a directory')
    .option('--no-prune', 'do not delete config-managed resources absent from the bundle')
    .option('--base-url <url>', 'API base URL')
    .option('--token <token>', 'bearer token')
    .option('--timeout <ms>', 'request timeout in milliseconds')
    .option('--max-retries <count>', 'retries for retryable failures')
    .option('--format <format>', 'output format')
    .option('--json', 'shorthand for --format json')
    .option('--no-color', 'disable colour')
    .showHelpAfterError();

export const registerConfigAsCodeCommands = (
  root: Command,
  binaryName: string,
  clientFor: (options: never) => Roark,
  resolveOutput: (options: never) => { format: OutputFormat; color: boolean },
): void => {
  const config = configGroup(root);

  withCommonOptions(config.command('diff [dir]'))
    .description('Preview the changes a config directory (or bundle) would make. No writes.')
    .addHelpText('after', ['', 'Examples:', `  ${binaryName} config diff ./roark`].join('\n'))
    .action(async (dir: string | undefined, options: Record<string, unknown>) => {
      const bundle = await resolveBundle(dir, options);
      const client = clientFor(options as never);
      const result = await client.config.diff(bundle as never);
      const output = resolveOutput(options as never);
      write(
        output.format === 'json' || options['json'] === true ?
          render((result as { data: unknown }).data, output)
        : formatChanges((result as { data: never }).data),
      );
    });

  withCommonOptions(config.command('apply [dir]'))
    .description('Reconcile the project to a config directory (or bundle). Previews and confirms first.')
    .option('-y, --yes', 'skip the confirmation prompt')
    .option('--no-input', 'never prompt; fail instead')
    .addHelpText('after', ['', 'Examples:', `  ${binaryName} config apply ./roark`].join('\n'))
    .action(async (dir: string | undefined, options: Record<string, unknown>) => {
      const bundle = await resolveBundle(dir, options);
      const client = clientFor(options as never);
      const output = resolveOutput(options as never);
      const json = output.format === 'json' || options['json'] === true;

      // Preview then confirm, so a prune-driven delete is never a surprise.
      const preview = (await client.config.diff(bundle as never)) as unknown as {
        data: { changes: Array<Record<string, unknown>>; summary: Record<string, number> };
      };
      const pending = changeCount(preview.data.summary);
      if (pending === 0) {
        write('No changes; project already matches the config.', process.stderr);
        return;
      }
      if (!json) write(formatChanges(preview.data as never), process.stderr);
      await confirm(`Apply ${pending} change(s)?`, {
        assumeYes: options['yes'] === true,
        noInput: options['input'] === false,
      });

      const result = await client.config.apply(bundle as never);
      write(
        json ?
          render((result as { data: unknown }).data, output)
        : formatChanges((result as { data: never }).data),
      );
    });

  config.addHelpText(
    'after',
    [
      '',
      'Config as code: keep your Roark resources as YAML in git and sync them.',
      `  ${binaryName} config diff ./roark    # preview`,
      `  ${binaryName} config apply ./roark   # reconcile (asks to confirm)`,
    ].join('\n'),
  );
};
