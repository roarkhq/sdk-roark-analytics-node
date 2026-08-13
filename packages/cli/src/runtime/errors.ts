/**
 * Error rendering and exit codes.
 *
 * Exit codes are the only thing a script can branch on, so they distinguish the
 * cases a caller would actually handle differently: a bad invocation, a missing
 * credential, and a missing resource are not all "1".
 */

import {
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
  APIUserAbortError,
  AuthenticationError,
  NotFoundError,
  PermissionDeniedError,
} from '@roarkanalytics/sdk';

import { paint, write, type OutputFormat, render } from './output';

export const EXIT = {
  ok: 0,
  /** The request was made and the API rejected it. */
  apiError: 1,
  /** The command line was wrong: unknown flag, missing argument, bad value. */
  usage: 2,
  /** No credential, or the credential was refused. */
  auth: 3,
  /** The addressed resource does not exist. */
  notFound: 4,
  /** The request never completed: DNS, TLS, timeout, or an aborted run. */
  connection: 5,
} as const;

/** Thrown for anything wrong with the command line itself. */
export class UsageError extends Error {
  override readonly name = 'UsageError';
}

/**
 * No credential was found at all. Distinct from a rejected one, but a script
 * handles both the same way, so both exit 3.
 */
export class AuthRequiredError extends Error {
  override readonly name = 'AuthRequiredError';
}

export const exitCodeFor = (error: unknown): number => {
  if (error instanceof AuthRequiredError) return EXIT.auth;
  if (error instanceof UsageError) return EXIT.usage;
  if (error instanceof AuthenticationError || error instanceof PermissionDeniedError) {
    return EXIT.auth;
  }
  if (error instanceof NotFoundError) return EXIT.notFound;
  if (
    error instanceof APIConnectionError ||
    error instanceof APIConnectionTimeoutError ||
    error instanceof APIUserAbortError
  ) {
    return EXIT.connection;
  }
  if (error instanceof APIError) return EXIT.apiError;
  return EXIT.apiError;
};

interface ReportOptions {
  format: OutputFormat;
  color: boolean;
  /** Shown under an auth failure so the fix is one copyable line away. */
  binaryName: string;
}

/**
 * Errors go to stderr so that `roark ... > out.json` leaves `out.json` holding
 * only real output, and a failed run leaves it empty rather than half-written.
 */
export const reportError = (error: unknown, options: ReportOptions): void => {
  const stderr = process.stderr;
  const label = paint('error:', 'red', options.color);

  if (error instanceof UsageError || error instanceof AuthRequiredError) {
    write(`${label} ${error.message}`, stderr);
    return;
  }

  if (error instanceof APIError) {
    const status = error.status === undefined ? 'request failed' : `HTTP ${error.status}`;
    const body = error.error;
    const hasBody = body !== undefined && body !== null;

    // The SDK's `message` already embeds the raw response body, so printing both
    // shows the same JSON twice: once unformatted, once formatted.
    write(hasBody ? `${label} ${status}` : `${label} ${status}: ${error.message}`, stderr);

    if (hasBody) {
      write(render(body, { format: options.format, color: options.color, stream: stderr }), stderr);
    }

    if (error instanceof AuthenticationError) {
      write(
        paint(
          `\nRun \`${options.binaryName} auth login\` or set ROARK_API_BEARER_TOKEN.`,
          'dim',
          options.color,
        ),
        stderr,
      );
    }
    return;
  }

  if (error instanceof Error) {
    write(`${label} ${error.message}`, stderr);
    return;
  }

  write(`${label} ${String(error)}`, stderr);
};
