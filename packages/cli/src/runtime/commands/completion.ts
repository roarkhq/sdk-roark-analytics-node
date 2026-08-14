/**
 * `roark completion <shell>`
 *
 * The scripts are generated from the same command table the program is built
 * from, so they cannot describe a command that does not exist. Nothing is
 * assembled at runtime and nothing is read from the live Commander tree.
 */

import { Command } from 'commander';

import { UsageError } from '../errors';
import { write } from '../output';

const LOADING_INSTRUCTIONS: Record<string, (binaryName: string) => string> = {
  bash: (binary) => `  eval "$(${binary} completion bash)"   # or install into /etc/bash_completion.d`,
  zsh: (binary) => `  eval "$(${binary} completion zsh)"    # or write to a directory on $fpath`,
  fish: (binary) => `  ${binary} completion fish | source     # or write to ~/.config/fish/completions`,
  powershell: (binary) =>
    `  ${binary} completion powershell | Out-String | Invoke-Expression   # or add to $PROFILE`,
};

export const registerCompletionCommand = (
  root: Command,
  binaryName: string,
  completions: Readonly<Record<string, string>>,
): void => {
  const shells = Object.keys(completions);
  if (shells.length === 0) return;

  const help = shells
    .map((shell) => LOADING_INSTRUCTIONS[shell]?.(binaryName))
    .filter((line): line is string => line !== undefined);

  root.addCommand(
    new Command('completion')
      .description(`Print a shell completion script (${shells.join(', ')})`)
      .argument('<shell>', `one of: ${shells.join(', ')}`)
      .addHelpText(
        'after',
        help.length > 0 ? `\nAdd one of these to your shell startup file:\n${help.join('\n')}` : '',
      )
      .action((shell: string) => {
        // Own-property lookup only: `completions['constructor']` would otherwise
        // resolve to something that is not a completion script.
        const script =
          Object.prototype.hasOwnProperty.call(completions, shell) ? completions[shell] : undefined;
        if (script === undefined) {
          throw new UsageError(`Unsupported shell '${shell}'. Supported: ${shells.join(', ')}`);
        }
        write(script);
      })
      .showHelpAfterError(),
  );
};
