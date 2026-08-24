import { PassThrough } from 'node:stream';

import { confirm, isInteractive } from './confirm';
import { UsageError } from './errors';

const setTty = (stdin: boolean, stdout: boolean): void => {
  Object.defineProperty(process.stdin, 'isTTY', { value: stdin, configurable: true });
  Object.defineProperty(process.stdout, 'isTTY', { value: stdout, configurable: true });
};

let savedStdin: PropertyDescriptor | undefined;
let savedStdinTty: PropertyDescriptor | undefined;
let savedStdoutTty: PropertyDescriptor | undefined;
let stderr: jest.SpyInstance;

beforeEach(() => {
  savedStdin = Object.getOwnPropertyDescriptor(process, 'stdin');
  savedStdinTty = Object.getOwnPropertyDescriptor(process.stdin, 'isTTY');
  savedStdoutTty = Object.getOwnPropertyDescriptor(process.stdout, 'isTTY');
  stderr = jest.spyOn(process.stderr, 'write').mockReturnValue(true);
});

afterEach(() => {
  if (savedStdin) Object.defineProperty(process, 'stdin', savedStdin);
  if (savedStdinTty) Object.defineProperty(process.stdin, 'isTTY', savedStdinTty);
  else delete (process.stdin as { isTTY?: boolean }).isTTY;
  if (savedStdoutTty) Object.defineProperty(process.stdout, 'isTTY', savedStdoutTty);
  else delete (process.stdout as { isTTY?: boolean }).isTTY;
  stderr.mockRestore();
});

/** Replaces stdin with a stream that answers the prompt. */
const answerWith = (answer: string): void => {
  const stream = new PassThrough();
  Object.defineProperty(process, 'stdin', { value: stream, configurable: true });
  setTty(true, true);
  setImmediate(() => stream.write(`${answer}\n`));
};

describe('isInteractive', () => {
  it('needs both ends to be a terminal', () => {
    setTty(true, true);
    expect(isInteractive()).toBe(true);

    setTty(false, true);
    expect(isInteractive()).toBe(false);

    setTty(true, false);
    expect(isInteractive()).toBe(false);
  });
});

describe('confirm', () => {
  it('returns immediately for --yes, without touching stdin', async () => {
    setTty(false, false);
    await expect(confirm('Delete it?', { assumeYes: true, noInput: false })).resolves.toBeUndefined();
    expect(stderr).not.toHaveBeenCalled();
  });

  it('refuses rather than prompting when --no-input was passed', async () => {
    setTty(true, true);
    await expect(confirm('Delete it?', { assumeYes: false, noInput: true })).rejects.toThrow(UsageError);
  });

  it('refuses in a script, where a prompt would hang or eat piped data', async () => {
    setTty(false, false);
    const promise = confirm('Delete it?', { assumeYes: false, noInput: false });
    await expect(promise).rejects.toThrow(/Refusing to continue without --yes/);
  });

  it('names what is about to happen in the refusal', async () => {
    setTty(false, false);
    await expect(
      confirm('Permanently delete webhook-1?', { assumeYes: false, noInput: false }),
    ).rejects.toThrow(/Permanently delete webhook-1\?/);
  });

  it('accepts y and yes, in any case', async () => {
    for (const answer of ['y', 'Y', 'yes', 'YES', ' yes ']) {
      answerWith(answer);
      await expect(confirm('Delete it?', { assumeYes: false, noInput: false })).resolves.toBeUndefined();
    }
  });

  it('treats an empty answer as no, so the default is safe', async () => {
    answerWith('');
    await expect(confirm('Delete it?', { assumeYes: false, noInput: false })).rejects.toThrow('Cancelled.');
  });

  it('treats anything else as no', async () => {
    for (const answer of ['n', 'no', 'yep', 'sure']) {
      answerWith(answer);
      await expect(confirm('Delete it?', { assumeYes: false, noInput: false })).rejects.toThrow('Cancelled.');
    }
  });

  it('prompts on stderr, so stdout stays clean for output', async () => {
    answerWith('y');
    await confirm('Delete it?', { assumeYes: false, noInput: false });
    const written = (stderr.mock.calls as unknown[][]).map((call) => String(call[0])).join('');
    expect(written).toContain('[y/N]');
  });
});
