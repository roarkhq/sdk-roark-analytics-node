// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Webhook extends APIResource {
  /**
   * Creates a new webhook with event subscriptions. The signing secret is only
   * returned in this response.
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookCreateResponse> {
    return this._client.post('/v1/webhook', { body, ...options });
  }

  /**
   * Returns a paginated list of webhooks with their event subscriptions.
   */
  list(
    query: WebhookListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookListResponse> {
    return this._client.get('/v1/webhook', { query, ...options });
  }

  /**
   * Deletes a webhook and all its event subscriptions.
   */
  delete(webhookID: string, options?: RequestOptions): APIPromise<WebhookDeleteResponse> {
    return this._client.delete(path`/v1/webhook/${webhookID}`, options);
  }

  /**
   * Returns a specific webhook with its event subscriptions.
   */
  getByID(webhookID: string, options?: RequestOptions): APIPromise<WebhookGetByIDResponse> {
    return this._client.get(path`/v1/webhook/${webhookID}`, options);
  }
}

export interface WebhookCreateResponse {
  /**
   * Webhook response with signing secret (returned on creation)
   */
  data: WebhookCreateResponse.Data;
}

export namespace WebhookCreateResponse {
  /**
   * Webhook response with signing secret (returned on creation)
   */
  export interface Data {
    /**
     * Webhook ID
     */
    id: string;

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Webhook description
     */
    description: string | null;

    /**
     * Event types this webhook is subscribed to
     */
    events: Array<
      | 'CALL_ANALYSIS_COMPLETED'
      | 'CALL_ANALYSIS_FAILED'
      | 'CALL_EVALUATION_COMPLETED'
      | 'CALL_EVALUATION_FAILED'
      | 'SIMULATION_RUN_PLAN_JOB_STARTED'
      | 'SIMULATION_RUN_PLAN_JOB_COMPLETED'
      | 'SIMULATION_RUN_PLAN_JOB_FAILED'
      | 'SIMULATION_RUN_PLAN_JOB_CANCELLED'
      | 'SIMULATION_JOB_STARTED'
      | 'SIMULATION_JOB_COMPLETED'
      | 'SIMULATION_JOB_FAILED'
      | 'SIMULATION_JOB_CANCELLED'
    >;

    /**
     * Request headers
     */
    headers: { [key: string]: string };

    /**
     * Signing secret (only returned on creation)
     */
    signingSecret: string;

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * Webhook URL
     */
    url: string;
  }
}

export interface WebhookListResponse {
  data: Array<WebhookListResponse.Data>;

  pagination: WebhookListResponse.Pagination;
}

export namespace WebhookListResponse {
  /**
   * Webhook with its subscribed event types
   */
  export interface Data {
    /**
     * Webhook ID
     */
    id: string;

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Webhook description
     */
    description: string | null;

    /**
     * Event types this webhook is subscribed to
     */
    events: Array<
      | 'CALL_ANALYSIS_COMPLETED'
      | 'CALL_ANALYSIS_FAILED'
      | 'CALL_EVALUATION_COMPLETED'
      | 'CALL_EVALUATION_FAILED'
      | 'SIMULATION_RUN_PLAN_JOB_STARTED'
      | 'SIMULATION_RUN_PLAN_JOB_COMPLETED'
      | 'SIMULATION_RUN_PLAN_JOB_FAILED'
      | 'SIMULATION_RUN_PLAN_JOB_CANCELLED'
      | 'SIMULATION_JOB_STARTED'
      | 'SIMULATION_JOB_COMPLETED'
      | 'SIMULATION_JOB_FAILED'
      | 'SIMULATION_JOB_CANCELLED'
    >;

    /**
     * Request headers
     */
    headers: { [key: string]: string };

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * Webhook URL
     */
    url: string;
  }

  export interface Pagination {
    /**
     * Whether there are more items to fetch
     */
    hasMore: boolean;

    /**
     * Cursor for the next page of items
     */
    nextCursor: string | null;

    /**
     * Total number of items
     */
    total: number;
  }
}

export interface WebhookDeleteResponse {
  data: WebhookDeleteResponse.Data;
}

export namespace WebhookDeleteResponse {
  export interface Data {
    /**
     * Whether the deletion was successful
     */
    success: boolean;
  }
}

export interface WebhookGetByIDResponse {
  /**
   * Webhook with its subscribed event types
   */
  data: WebhookGetByIDResponse.Data;
}

export namespace WebhookGetByIDResponse {
  /**
   * Webhook with its subscribed event types
   */
  export interface Data {
    /**
     * Webhook ID
     */
    id: string;

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Webhook description
     */
    description: string | null;

    /**
     * Event types this webhook is subscribed to
     */
    events: Array<
      | 'CALL_ANALYSIS_COMPLETED'
      | 'CALL_ANALYSIS_FAILED'
      | 'CALL_EVALUATION_COMPLETED'
      | 'CALL_EVALUATION_FAILED'
      | 'SIMULATION_RUN_PLAN_JOB_STARTED'
      | 'SIMULATION_RUN_PLAN_JOB_COMPLETED'
      | 'SIMULATION_RUN_PLAN_JOB_FAILED'
      | 'SIMULATION_RUN_PLAN_JOB_CANCELLED'
      | 'SIMULATION_JOB_STARTED'
      | 'SIMULATION_JOB_COMPLETED'
      | 'SIMULATION_JOB_FAILED'
      | 'SIMULATION_JOB_CANCELLED'
    >;

    /**
     * Request headers
     */
    headers: { [key: string]: string };

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * Webhook URL
     */
    url: string;
  }
}

export interface WebhookCreateParams {
  /**
   * Event types to subscribe to (at least one required)
   */
  events: Array<
    | 'CALL_ANALYSIS_COMPLETED'
    | 'CALL_ANALYSIS_FAILED'
    | 'CALL_EVALUATION_COMPLETED'
    | 'CALL_EVALUATION_FAILED'
    | 'SIMULATION_RUN_PLAN_JOB_STARTED'
    | 'SIMULATION_RUN_PLAN_JOB_COMPLETED'
    | 'SIMULATION_RUN_PLAN_JOB_FAILED'
    | 'SIMULATION_RUN_PLAN_JOB_CANCELLED'
    | 'SIMULATION_JOB_STARTED'
    | 'SIMULATION_JOB_COMPLETED'
    | 'SIMULATION_JOB_FAILED'
    | 'SIMULATION_JOB_CANCELLED'
  >;

  /**
   * Webhook URL
   */
  url: string;

  /**
   * Webhook description
   */
  description?: string | null;

  /**
   * Request headers (e.g. authorization tokens)
   */
  headers?: { [key: string]: string };
}

export interface WebhookListParams {
  /**
   * Cursor for pagination - webhook ID to start after
   */
  after?: string;

  /**
   * Maximum number of webhooks to return (default: 20, max: 50)
   */
  limit?: number;
}

export declare namespace Webhook {
  export {
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookDeleteResponse as WebhookDeleteResponse,
    type WebhookGetByIDResponse as WebhookGetByIDResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookListParams as WebhookListParams,
  };
}
