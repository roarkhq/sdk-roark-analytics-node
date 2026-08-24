import {
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
  APIUserAbortError,
  AuthenticationError,
  BadRequestError,
  InternalServerError,
  NotFoundError,
  PermissionDeniedError,
} from '@roarkanalytics/sdk';

import { AuthRequiredError, EXIT, exitCodeFor, reportError, UsageError } from './errors';

// Each subclass pins its own status as a literal type, so they are constructed
// one by one rather than through a generic helper.
const BODY = { message: 'nope' };
const unauthorized = (): APIError => new AuthenticationError(401, BODY, undefined, new Headers());
const forbidden = (): APIError => new PermissionDeniedError(403, BODY, undefined, new Headers());
const missing = (body: unknown = BODY): APIError =>
  new NotFoundError(404, body as Record<string, unknown>, undefined, new Headers());
const badRequest = (): APIError => new BadRequestError(400, BODY, undefined, new Headers());
const serverError = (): APIError => new InternalServerError(500, BODY, undefined, new Headers());

describe('exitCodeFor', () => {
  it('separates the cases a script would branch on', () => {
    expect(exitCodeFor(new UsageError('bad flag'))).toBe(EXIT.usage);
    expect(exitCodeFor(new AuthRequiredError('no token'))).toBe(EXIT.auth);
    expect(exitCodeFor(unauthorized())).toBe(EXIT.auth);
    expect(exitCodeFor(forbidden())).toBe(EXIT.auth);
    expect(exitCodeFor(missing())).toBe(EXIT.notFound);
    expect(exitCodeFor(badRequest())).toBe(EXIT.apiError);
    expect(exitCodeFor(serverError())).toBe(EXIT.apiError);
  });

  it('groups everything that never reached the API as a connection failure', () => {
    expect(exitCodeFor(new APIConnectionError({ message: 'dns' }))).toBe(EXIT.connection);
    expect(exitCodeFor(new APIConnectionTimeoutError())).toBe(EXIT.connection);
    expect(exitCodeFor(new APIUserAbortError())).toBe(EXIT.connection);
  });

  it('falls back to the API-error code for anything unrecognised', () => {
    expect(exitCodeFor(new Error('boom'))).toBe(EXIT.apiError);
    expect(exitCodeFor('a string')).toBe(EXIT.apiError);
    expect(exitCodeFor(undefined)).toBe(EXIT.apiError);
  });

  it('never returns 0, since it is only ever called on a failure', () => {
    const errors = [new UsageError('x'), new AuthRequiredError('x'), new Error('x'), null];
    for (const error of errors) expect(exitCodeFor(error)).not.toBe(EXIT.ok);
  });
});

describe('reportError', () => {
  const options = { format: 'json' as const, color: false, binaryName: 'roark' };
  let written: string;
  let spy: jest.SpyInstance;

  beforeEach(() => {
    written = '';
    spy = jest.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      written += String(chunk);
      return true;
    });
  });

  afterEach(() => spy.mockRestore());

  it('writes to stderr and never to stdout, so a redirect keeps clean output', () => {
    const stdout = jest.spyOn(process.stdout, 'write').mockReturnValue(true);
    try {
      reportError(new UsageError('bad flag'), options);
      expect(stdout).not.toHaveBeenCalled();
    } finally {
      stdout.mockRestore();
    }
    expect(written).toContain('error: bad flag');
  });

  it('prints an API error body once, formatted, rather than twice', () => {
    reportError(missing({ code: 'not_found' }), options);
    expect(written).toContain('error: HTTP 404');
    expect(written.match(/not_found/g)).toHaveLength(1);
  });

  it('falls back to the message when the response carried no body', () => {
    reportError(new NotFoundError(404, undefined, 'Call not found', new Headers()), options);
    expect(written).toContain('HTTP 404: ');
    expect(written).toContain('Call not found');
  });

  it('adds the recovery hint only for an authentication failure', () => {
    reportError(unauthorized(), options);
    expect(written).toContain('roark auth login');

    written = '';
    reportError(missing(), options);
    expect(written).not.toContain('auth login');
  });

  it('handles a plain Error and a thrown non-Error', () => {
    reportError(new Error('boom'), options);
    expect(written).toContain('error: boom');

    written = '';
    reportError('just a string', options);
    expect(written).toContain('error: just a string');
  });

  it('emits no escape codes when colour is off', () => {
    reportError(new UsageError('bad flag'), options);
    expect(written).not.toMatch(/\[/);
  });
});
