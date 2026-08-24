/**
 * Builds the whole command tree from the generated table.
 *
 * Nothing here names an endpoint. Every command, positional and flag comes from
 * `commands.ts`, so a new API operation reaches the CLI as a data change.
 */

import { Command, Option } from 'commander';
import Roark from '@roarkanalytics/sdk';

import { registerApiCommand } from './commands/api';
import { registerAuthCommands } from './commands/auth';
import { registerConfigCommands } from './commands/config';
import { registerCompletionCommand } from './commands/completion';
import { confirm } from './confirm';
import {
  allowProjectBaseUrlFromEnvironment,
  PROJECT_FILE,
  resolveConfig,
  unsafeBaseUrlRedirect,
  userConfigPath,
  type CliConfig,
  type ResolvedConfig,
} from './config';
import { AuthRequiredError, EXIT, exitCodeFor, reportError, UsageError } from './errors';
import { buildArgs, readData, readStdin, stdinIsPiped } from './input';
import { OUTPUT_FORMATS, paint, render, supportsColor, write, type OutputFormat } from './output';
import type { CliCommand, CliFlag } from './types';

export interface ProgramOptions {
  binaryName: string;
  version: string;
  description: string;
  commands: readonly CliCommand[];
  /** Help text for the command groups, keyed by space-joined path. */
  groups: Readonly<Record<string, string>>;
  completions: Readonly<Record<string, string>>;
}

/** Verbs whose effect a user cannot undo, so they get a confirmation prompt. */
const DESTRUCTIVE_VERBS = new Set(['delete']);

const isDestructive = (command: CliCommand): boolean =>
  DESTRUCTIVE_VERBS.has(command.commandPath.at(-1) ?? '');

interface GlobalOptions {
  baseUrl?: string;
  timeout?: string;
  maxRetries?: string;
  token?: string;
  format?: OutputFormat;
  json?: boolean;
  color?: boolean;
  yes?: boolean;
  input?: boolean;
  quiet?: boolean;
  data?: string;
  allowProjectBaseUrl?: boolean;
}

interface ExtraOptions {
  /** `--data`, only where the endpoint has a request body to fill. */
  body: boolean;
  /** `--yes` and `--no-input`, only where something is confirmed. */
  confirmation: boolean;
}

/**
 * Global flags are declared on every leaf as well as the root so they can be
 * written on either side of the verb. Commander does not inherit options down
 * the tree, and `roark call list --json` is what a user will type.
 *
 * The execution flags are added per command rather than everywhere: a `--data`
 * on a GET with no body, or a `--yes` on a command that never prompts, is help
 * text that describes something the command will not do.
 */
const addGlobalOptions = (command: Command, extra: ExtraOptions): Command => {
  command
    .option('--base-url <url>', 'API base URL')
    .option('--token <token>', 'bearer token (prefer ROARK_API_BEARER_TOKEN or `auth login`)')
    .option('--timeout <ms>', 'request timeout in milliseconds')
    .option('--max-retries <count>', 'retries for retryable failures')
    .addOption(new Option('--format <format>', 'output format').choices(OUTPUT_FORMATS).default('auto'))
    .option('--json', 'shorthand for --format json')
    .option('--no-color', 'disable colour')
    .option('-q, --quiet', 'suppress non-essential output')
    .option('--allow-project-base-url', `send your credential to a base URL set by a ${PROJECT_FILE}`);

  if (extra.body) {
    command.option('--data <json>', 'request body as JSON, or @file to read one (@- for stdin)');
  }

  if (extra.confirmation) {
    command
      .option('-y, --yes', 'skip confirmation prompts')
      .option('--no-input', 'never prompt; fail instead');
  }

  return command;
};

/**
 * Refuses the one combination that would post a secret to a host the caller did
 * not choose. Nothing is sent first: this throws before the client exists.
 */
export const assertBaseUrlIsTrusted = (options: GlobalOptions, resolved: ResolvedConfig): void => {
  if (options.allowProjectBaseUrl === true || allowProjectBaseUrlFromEnvironment()) return;

  const redirect = unsafeBaseUrlRedirect(resolved);
  if (redirect === undefined) return;

  const origin = redirect.credentialFrom === 'environment' ? 'ROARK_API_BEARER_TOKEN' : userConfigPath();

  throw new UsageError(
    [
      `Refusing to send your credential to ${redirect.baseURL}.`,
      '',
      `${redirect.projectFile} sets baseURL, and a ${PROJECT_FILE} is not necessarily yours: it`,
      `arrives with a clone. The credential that would be sent came from ${origin}.`,
      '',
      'Pass --allow-project-base-url if you trust that file, or --token to send a',
      'different credential.',
    ].join('\n'),
  );
};

const clientFor = (options: GlobalOptions, requiresAuth = true): Roark => {
  const overrides: CliConfig = {
    ...(options.token === undefined ? {} : { bearerToken: options.token }),
    ...(options.baseUrl === undefined ? {} : { baseURL: options.baseUrl }),
    ...(options.timeout === undefined ? {} : { timeout: Number(options.timeout) }),
    ...(options.maxRetries === undefined ? {} : { maxRetries: Number(options.maxRetries) }),
  };

  const resolved = resolveConfig(overrides);
  assertBaseUrlIsTrusted(options, resolved);
  const config = resolved.config;

  if (config.bearerToken === undefined && requiresAuth) {
    throw new AuthRequiredError(
      'No credential found. Run `roark auth login`, set ROARK_API_BEARER_TOKEN, or pass --token.',
    );
  }

  return new Roark({
    // The SDK constructor rejects an absent token, so a public endpoint is given
    // an empty one rather than being made to demand a credential it never sends.
    bearerToken: config.bearerToken ?? '',
    ...(config.baseURL === undefined ? {} : { baseURL: config.baseURL }),
    ...(config.timeout === undefined ? {} : { timeout: config.timeout }),
    ...(config.maxRetries === undefined ? {} : { maxRetries: config.maxRetries }),
  });
};

export const resolveOutput = (options: GlobalOptions): { format: OutputFormat; color: boolean } => ({
  format: options.json ? 'json' : options.format ?? 'auto',
  // `--no-color` sets color to false; otherwise defer to the environment.
  color: options.color === false ? false : supportsColor(),
});

const flagSpec = (flag: CliFlag): string => {
  if (flag.valueKind === 'boolean') return `--${flag.name}`;
  return `--${flag.name} <value>`;
};

const flagDescription = (flag: CliFlag): string => {
  const parts: string[] = [];
  if (flag.description) parts.push(flag.description.replace(/\s+/g, ' ').trim());
  if (flag.enumValues && flag.enumValues.length > 0) {
    parts.push(`(one of: ${flag.enumValues.join(', ')})`);
  }
  if (flag.repeatable) parts.push('(repeatable)');
  if (flag.required) parts.push('(required)');
  return parts.join(' ');
};

/** Explains a union body, which has no flags to document. */
const variantHelp = (command: CliCommand, binaryName: string): string => {
  if (!command.bodyOpaque) return '';
  const name = command.commandPath.join(' ');
  const lines = [
    '',
    'This endpoint takes one of several request shapes, so it is supplied as JSON:',
    '',
    `  ${binaryName} ${name} --data '{ ... }'`,
    `  ${binaryName} ${name} --data @request.json`,
    `  cat request.json | ${binaryName} ${name}`,
    '',
  ];
  if (command.bodyVariants.length > 0) {
    lines.push('Accepted shapes:');
    for (const variant of command.bodyVariants) {
      const required = variant.required.length > 0 ? variant.required.join(', ') : 'no required fields';
      lines.push(`  ${variant.name} - requires ${required}`);
    }
  }
  return lines.join('\n');
};

/** Finds or creates the parent command for a path, so groups are built once. */
const ensureGroup = (root: Command, path: string[], groups: Readonly<Record<string, string>>): Command => {
  let parent = root;
  const walked: string[] = [];

  for (const segment of path) {
    walked.push(segment);
    const existing = parent.commands.find((child) => child.name() === segment);
    if (existing) {
      parent = existing;
      continue;
    }
    const key = walked.join(' ');
    const group = new Command(segment)
      .description(Object.prototype.hasOwnProperty.call(groups, key) ? groups[key]! : `Commands for ${key}`)
      .showHelpAfterError();
    // A group with no action prints its own help rather than exiting silently.
    group.action(() => {
      group.outputHelp();
      process.exitCode = EXIT.usage;
    });
    parent.addCommand(group);
    parent = group;
  }

  return parent;
};

const addApiCommand = (root: Command, options: ProgramOptions, definition: CliCommand): void => {
  const parent = ensureGroup(root, definition.commandPath.slice(0, -1), options.groups);
  const name = definition.commandPath.at(-1)!;

  const command = new Command(name)
    .description(definition.summary ?? definition.description ?? '')
    .showHelpAfterError();

  if (definition.description && definition.description !== definition.summary) {
    command.addHelpText('after', `\n${definition.description.replace(/\s+/g, ' ').trim()}`);
  }
  command.addHelpText('after', variantHelp(definition, options.binaryName));
  command.addHelpText('after', `\n${definition.httpMethod.toUpperCase()} ${definition.httpPath}`);

  for (const positional of definition.positionals) {
    command.argument(`<${positional.name}>`, positional.description ?? '');
  }

  for (const flag of definition.flags) {
    const option = new Option(flagSpec(flag), flagDescription(flag));
    if (flag.repeatable) {
      option.argParser((value: string, previous: string[] | undefined) => [...(previous ?? []), value]);
    }
    command.addOption(option);
  }

  addGlobalOptions(command, {
    body: definition.acceptsBody,
    confirmation: isDestructive(definition),
  });

  command.action(async (...actionArgs: unknown[]) => {
    // Commander passes positionals, then the options object, then the Command.
    const positionals = actionArgs.slice(0, definition.positionals.length) as string[];
    const options_ = actionArgs[definition.positionals.length] as GlobalOptions & Record<string, unknown>;

    await runApiCommand(definition, positionals, options_, options);
  });

  parent.addCommand(command);
};

const runApiCommand = async (
  definition: CliCommand,
  positionals: string[],
  options: GlobalOptions & Record<string, unknown>,
  program: ProgramOptions,
): Promise<void> => {
  const output = resolveOutput(options);

  if (isDestructive(definition)) {
    await confirm(`Permanently delete ${positionals.join(' ') || definition.commandPath.join(' ')}?`, {
      assumeYes: options.yes === true,
      noInput: options.input === false,
    });
  }

  // stdin is only consulted when the command can actually take a body and no
  // explicit --data was given, so piping into a read command is never silently
  // swallowed.
  const explicitData = options.data === undefined ? undefined : readData(options.data);
  const piped =
    definition.acceptsBody && explicitData === undefined && stdinIsPiped() ?
      (() => {
        const raw = readStdin().trim();
        return raw.length === 0 ? undefined : (JSON.parse(raw) as unknown);
      })()
    : undefined;

  const args = buildArgs({
    command: definition,
    positionals,
    options,
    ...(explicitData === undefined ? {} : { data: explicitData }),
    ...(piped === undefined ? {} : { stdin: piped }),
  });

  const client = clientFor(options, definition.requiresAuth);
  const resource = (client as unknown as Record<string, Record<string, unknown>>)[definition.clientProperty];
  const method = resource?.[definition.methodName];
  if (typeof method !== 'function') {
    // Only reachable if the table and the installed SDK disagree, which means
    // the two packages were published out of step.
    throw new Error(
      `${program.binaryName}: ${definition.clientProperty}.${definition.methodName} is missing from @roarkanalytics/sdk`,
    );
  }

  const result: unknown = await (method as (...args: unknown[]) => Promise<unknown>).apply(resource, args);

  if (options.quiet === true) return;
  write(render(result, output));
};

export const createProgram = (options: ProgramOptions): Command => {
  const root = new Command()
    .name(options.binaryName)
    .description(options.description)
    .version(options.version, '-v, --version')
    .showHelpAfterError()
    .enablePositionalOptions();

  addGlobalOptions(root, { body: false, confirmation: false });

  for (const definition of options.commands) addApiCommand(root, options, definition);

  registerAuthCommands(root, options.binaryName);
  registerConfigCommands(root, options.binaryName);
  registerApiCommand(root, options.binaryName, clientFor, resolveOutput);
  registerCompletionCommand(root, options.binaryName, options.completions);

  root.addHelpText(
    'after',
    [
      '',
      'Environment:',
      '  ROARK_API_BEARER_TOKEN   bearer token used when --token is not given',
      '  ROARK_BASE_URL           API base URL',
      `  ROARK_ALLOW_PROJECT_BASE_URL   trust a base URL set by a ${PROJECT_FILE}`,
      '  NO_COLOR                 disable colour',
      '',
      `Run \`${options.binaryName} <command> --help\` for the flags of a single command.`,
    ].join('\n'),
  );

  return root;
};

/**
 * `exitOverride` is per command, not inherited. Without walking the tree, a
 * subcommand's parse error calls `process.exit` itself and never reaches the
 * handler below, so `roark call retrieve` exited 1 instead of 2.
 */
const overrideExitEverywhere = (command: Command): void => {
  command.exitOverride();
  for (const child of command.commands) overrideExitEverywhere(child);
};

export const run = async (options: ProgramOptions, argv: readonly string[]): Promise<number> => {
  const program = createProgram(options);
  overrideExitEverywhere(program);

  try {
    await program.parseAsync(argv as string[]);
    return process.exitCode === undefined ? EXIT.ok : Number(process.exitCode);
  } catch (error) {
    // Commander throws for --help and --version too; those are successful exits.
    const code = (error as { code?: string }).code;
    if (code === 'commander.helpDisplayed' || code === 'commander.help') return EXIT.ok;
    if (code === 'commander.version') return EXIT.ok;
    if (typeof code === 'string' && code.startsWith('commander.')) {
      const message = (error as Error).message;
      if (message) write(paint(`error: ${message}`, 'red', supportsColor(process.stderr)), process.stderr);
      return EXIT.usage;
    }

    reportError(error, { ...resolveOutput({}), binaryName: options.binaryName });
    return exitCodeFor(error);
  }
};
