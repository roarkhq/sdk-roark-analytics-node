/**
 * `roark auth login | logout | status`
 *
 * The token is never accepted as a flag value: flags land in shell history and
 * in the process table, where a bearer token has no business being. It is read
 * from a prompt with echo off, or from stdin so CI can pipe it in.
 */

import { Command } from 'commander';
import { createInterface } from 'node:readline';

import { UsageError } from '../errors';
import { clearUserConfig, maskToken, readUserConfig, userConfigPath, writeUserConfig } from '../config';
import { paint, supportsColor, write } from '../output';
import { isInteractive } from '../confirm';

/** Reads a secret without echoing it, so it is not left on screen or in a scrollback. */
const promptSecret = async (prompt: string): Promise<string> => {
  const input = process.stdin;
  const output = process.stderr;
  const rl = createInterface({ input, output, terminal: true });

  const onData = (chunk: Buffer | string): void => {
    // Redraw the prompt without the typed characters.
    const text = chunk.toString();
    if (text.includes('\n') || text.includes('\r')) return;
    output.write(`[2K[200D${prompt}`);
  };

  output.write(prompt);
  input.on('data', onData);
  try {
    return await new Promise<string>((resolve) => {
      rl.question('', (answer) => resolve(answer));
    });
  } finally {
    input.off('data', onData);
    rl.close();
    output.write('\n');
  }
};

const readToken = async (): Promise<string> => {
  if (!isInteractive()) {
    const piped = await new Promise<string>((resolve, reject) => {
      let buffer = '';
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (chunk) => (buffer += chunk));
      process.stdin.on('end', () => resolve(buffer));
      process.stdin.on('error', reject);
    });
    const token = piped.trim();
    if (token.length === 0) {
      throw new UsageError('No token on stdin. Pipe one in, or run this in a terminal.');
    }
    return token;
  }

  const token = (await promptSecret('Bearer token: ')).trim();
  if (token.length === 0) throw new UsageError('No token entered.');
  return token;
};

export const registerAuthCommands = (root: Command, binaryName: string): void => {
  const auth = new Command('auth').description('Manage the stored credential').showHelpAfterError();
  auth.action(() => auth.outputHelp());

  auth
    .command('login')
    .description('Store a bearer token for future commands')
    .addHelpText(
      'after',
      [
        '',
        'The token is read from a hidden prompt, or from stdin when not a terminal:',
        '',
        `  ${binaryName} auth login`,
        `  echo "$ROARK_API_BEARER_TOKEN" | ${binaryName} auth login`,
      ].join('\n'),
    )
    .action(async () => {
      const token = await readToken();
      const path = writeUserConfig({ ...readUserConfig(), bearerToken: token });
      const color = supportsColor(process.stderr);
      write(`${paint('Saved', 'green', color)} ${maskToken(token)} to ${path}`, process.stderr);
    });

  auth
    .command('logout')
    .description('Delete the stored credential')
    .action(() => {
      const removed = clearUserConfig();
      write(
        removed ? `Removed ${userConfigPath()}` : `Nothing to remove at ${userConfigPath()}`,
        process.stderr,
      );
    });

  auth
    .command('status')
    .description('Show which credential would be used, and where it came from')
    .action(() => {
      const color = supportsColor(process.stderr);
      const fromEnv = process.env['ROARK_API_BEARER_TOKEN'];
      const stored = readUserConfig().bearerToken;

      if (fromEnv) {
        write(
          `${paint('Authenticated', 'green', color)} via ROARK_API_BEARER_TOKEN (${maskToken(fromEnv)})`,
          process.stderr,
        );
        if (stored) {
          write(
            paint(
              `A token is also stored in ${userConfigPath()}; the environment variable wins.`,
              'dim',
              color,
            ),
            process.stderr,
          );
        }
        return;
      }

      if (stored) {
        write(
          `${paint('Authenticated', 'green', color)} via ${userConfigPath()} (${maskToken(stored)})`,
          process.stderr,
        );
        return;
      }

      write(
        `${paint('Not authenticated.', 'yellow', color)} Run \`${binaryName} auth login\`.`,
        process.stderr,
      );
      process.exitCode = 3;
    });

  root.addCommand(auth);
};
