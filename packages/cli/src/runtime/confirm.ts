/**
 * Confirmation for destructive commands.
 *
 * Prompting is only safe when there is a human to answer: in a script stdin is
 * not a TTY, and a prompt would either hang or silently consume piped data. So
 * a non-interactive run requires `--yes` up front rather than being waved
 * through, which is the direction that fails safe.
 */

import { createInterface } from 'node:readline';

import { UsageError } from './errors';

export const isInteractive = (): boolean => process.stdin.isTTY === true && process.stdout.isTTY === true;

export interface ConfirmOptions {
  /** `--yes`: the user has already agreed. */
  assumeYes: boolean;
  /** `--no-input`: never prompt, fail instead. */
  noInput: boolean;
}

export const confirm = async (prompt: string, options: ConfirmOptions): Promise<void> => {
  if (options.assumeYes) return;

  if (options.noInput || !isInteractive()) {
    throw new UsageError(`${prompt} Refusing to continue without --yes.`);
  }

  const rl = createInterface({ input: process.stdin, output: process.stderr });
  try {
    const answer = await new Promise<string>((resolveAnswer) => {
      rl.question(`${prompt} [y/N] `, resolveAnswer);
    });
    if (!/^y(es)?$/i.test(answer.trim())) throw new UsageError('Cancelled.');
  } finally {
    rl.close();
  }
};
