import { BINARY_NAME, COMMANDS, DESCRIPTION, GROUPS } from './commands';
import { COMPLETIONS } from './completions';
import { run as runProgram, createProgram } from './runtime/program';
import { version } from './version';

export { COMMANDS, GROUPS } from './commands';
export { COMPLETIONS } from './completions';
export { createProgram } from './runtime/program';
export type { CliCommand, CliFlag, CliPositional } from './runtime/types';

const programOptions = {
  binaryName: BINARY_NAME,
  version,
  description: DESCRIPTION,
  commands: COMMANDS,
  groups: GROUPS,
  completions: COMPLETIONS,
};

export const buildProgram = () => createProgram(programOptions);

export const run = async (argv: readonly string[] = process.argv): Promise<number> =>
  runProgram(programOptions, argv);
