/**
 * `roark config get | set | list | path`
 *
 * Only the non-secret settings are settable here. The token has its own command
 * because it needs a hidden prompt, and `config set bearer-token <value>` would
 * put it straight into shell history.
 */

import { Command } from 'commander';

import { UsageError } from '../errors';
import {
  loadConfig,
  maskToken,
  projectConfigPath,
  readUserConfig,
  userConfigPath,
  writeUserConfig,
  type CliConfig,
} from '../config';
import { render, supportsColor, write } from '../output';

/** Settable keys, as typed, mapped onto the config field they write. */
const KEYS: Record<string, keyof CliConfig> = {
  'base-url': 'baseURL',
  timeout: 'timeout',
  'max-retries': 'maxRetries',
};

const numericKeys = new Set<keyof CliConfig>(['timeout', 'maxRetries']);

const keyFor = (name: string): keyof CliConfig => {
  const key = KEYS[name];
  if (!key) {
    throw new UsageError(`Unknown config key '${name}'. Known keys: ${Object.keys(KEYS).join(', ')}`);
  }
  return key;
};

export const registerConfigCommands = (root: Command, binaryName: string): void => {
  const config = new Command('config')
    .description('Read and write CLI settings')
    .showHelpAfterError();
  config.action(() => config.outputHelp());

  config
    .command('list')
    .description('Show the effective settings and where each file lives')
    .option('--json', 'output as JSON')
    .action((options: { json?: boolean }) => {
      const effective = loadConfig();
      const shown = {
        ...effective,
        ...(effective.bearerToken === undefined ?
          {}
        : { bearerToken: maskToken(effective.bearerToken) }),
      };

      if (options.json === true) {
        write(render(shown, { format: 'json', color: supportsColor() }));
        return;
      }

      for (const [name, key] of Object.entries(KEYS)) {
        write(`${name} = ${shown[key] ?? '(unset)'}`);
      }
      write(`token = ${shown.bearerToken ?? '(unset)'}`);
      write('');
      write(`user config    ${userConfigPath()}`);
      write(`project config ${projectConfigPath() ?? '(none)'}`);
    });

  config
    .command('get')
    .description('Print one effective setting')
    .argument('<key>', `one of: ${Object.keys(KEYS).join(', ')}`)
    .action((name: string) => {
      const value = loadConfig()[keyFor(name)];
      if (value === undefined) process.exitCode = 1;
      else write(String(value));
    });

  config
    .command('set')
    .description('Write one setting to the user config file')
    .argument('<key>', `one of: ${Object.keys(KEYS).join(', ')}`)
    .argument('<value>')
    .action((name: string, value: string) => {
      const key = keyFor(name);
      let parsed: string | number = value;

      if (numericKeys.has(key)) {
        parsed = Number(value);
        if (!Number.isFinite(parsed)) throw new UsageError(`${name} expects a number, got '${value}'`);
      }

      const path = writeUserConfig({ ...readUserConfig(), [key]: parsed });
      write(`Set ${name} in ${path}`, process.stderr);
    });

  config
    .command('unset')
    .description('Remove one setting from the user config file')
    .argument('<key>', `one of: ${Object.keys(KEYS).join(', ')}`)
    .action((name: string) => {
      const key = keyFor(name);
      const current = readUserConfig();
      delete current[key];
      const path = writeUserConfig(current);
      write(`Unset ${name} in ${path}`, process.stderr);
    });

  config
    .command('path')
    .description('Print the config file paths')
    .action(() => {
      write(userConfigPath());
      const project = projectConfigPath();
      if (project) write(project);
    });

  config.addHelpText(
    'after',
    [
      '',
      'Precedence, highest first: flag, environment, project .roark.json, user config.',
      '',
      `  ${binaryName} config set base-url https://api.roark.ai`,
      `  ${binaryName} auth login    # the token is stored separately`,
    ].join('\n'),
  );

  root.addCommand(config);
};
