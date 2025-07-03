// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as API from './resources/index';
import { Call } from './resources/call';
import {
  Evaluation,
  EvaluationCreateJobParams,
  EvaluationCreateJobResponse,
  EvaluationGetJobResponse,
  EvaluationGetJobRunsParams,
  EvaluationGetJobRunsResponse,
} from './resources/evaluation';
import { Health, HealthGetResponse } from './resources/health';
import {
  IntegrationCreateRetellCallParams,
  IntegrationCreateRetellCallResponse,
  IntegrationCreateVapiCallParams,
  IntegrationCreateVapiCallResponse,
  Integrations,
} from './resources/integrations';

export interface ClientOptions {
  /**
   * JWT token for authentication
   */
  bearerToken?: string | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['ROARK_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;
}

/**
 * API Client for interfacing with the Roark API.
 */
export class Roark extends Core.APIClient {
  bearerToken: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Roark API.
   *
   * @param {string | undefined} [opts.bearerToken=process.env['ROARK_API_BEARER_TOKEN'] ?? undefined]
   * @param {string} [opts.baseURL=process.env['ROARK_BASE_URL'] ?? https://api.roark.ai] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('ROARK_BASE_URL'),
    bearerToken = Core.readEnv('ROARK_API_BEARER_TOKEN'),
    ...opts
  }: ClientOptions = {}) {
    if (bearerToken === undefined) {
      throw new Errors.RoarkError(
        "The ROARK_API_BEARER_TOKEN environment variable is missing or empty; either provide it, or instantiate the Roark client with an bearerToken option, like new Roark({ bearerToken: 'My Bearer Token' }).",
      );
    }

    const options: ClientOptions = {
      bearerToken,
      ...opts,
      baseURL: baseURL || `https://api.roark.ai`,
    };

    super({
      baseURL: options.baseURL!,
      baseURLOverridden: baseURL ? baseURL !== 'https://api.roark.ai' : false,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.bearerToken = bearerToken;
  }

  health: API.Health = new API.Health(this);
  evaluation: API.Evaluation = new API.Evaluation(this);
  call: API.Call = new API.Call(this);
  integrations: API.Integrations = new API.Integrations(this);

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== 'https://api.roark.ai';
  }

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: `Bearer ${this.bearerToken}` };
  }

  static Roark = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static RoarkError = Errors.RoarkError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

Roark.Health = Health;
Roark.Evaluation = Evaluation;
Roark.Call = Call;
Roark.Integrations = Integrations;
export declare namespace Roark {
  export type RequestOptions = Core.RequestOptions;

  export { Health as Health, type HealthGetResponse as HealthGetResponse };

  export {
    Evaluation as Evaluation,
    type EvaluationCreateJobResponse as EvaluationCreateJobResponse,
    type EvaluationGetJobResponse as EvaluationGetJobResponse,
    type EvaluationGetJobRunsResponse as EvaluationGetJobRunsResponse,
    type EvaluationCreateJobParams as EvaluationCreateJobParams,
    type EvaluationGetJobRunsParams as EvaluationGetJobRunsParams,
  };

  export { Call as Call };

  export {
    Integrations as Integrations,
    type IntegrationCreateRetellCallResponse as IntegrationCreateRetellCallResponse,
    type IntegrationCreateVapiCallResponse as IntegrationCreateVapiCallResponse,
    type IntegrationCreateRetellCallParams as IntegrationCreateRetellCallParams,
    type IntegrationCreateVapiCallParams as IntegrationCreateVapiCallParams,
  };
}

export { toFile, fileFromPath } from './uploads';
export {
  RoarkError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export default Roark;
