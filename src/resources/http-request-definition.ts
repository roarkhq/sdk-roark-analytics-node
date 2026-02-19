// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class HTTPRequestDefinition extends APIResource {
  /**
   * Creates a new HTTP request definition. The signing secret is only returned in
   * this response and cannot be retrieved later.
   */
  create(
    body: HTTPRequestDefinitionCreateParams,
    options?: RequestOptions,
  ): APIPromise<HTTPRequestDefinitionCreateResponse> {
    return this._client.post('/v1/http-request-definition', { body, ...options });
  }

  /**
   * Updates an existing HTTP request definition.
   */
  update(
    definitionID: string,
    body: HTTPRequestDefinitionUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<HTTPRequestDefinitionUpdateResponse> {
    return this._client.put(path`/v1/http-request-definition/${definitionID}`, { body, ...options });
  }

  /**
   * Returns a paginated list of HTTP request definitions for the authenticated
   * project.
   */
  list(
    query: HTTPRequestDefinitionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<HTTPRequestDefinitionListResponse> {
    return this._client.get('/v1/http-request-definition', { query, ...options });
  }

  /**
   * Returns a specific HTTP request definition by its ID.
   */
  getByID(definitionID: string, options?: RequestOptions): APIPromise<HTTPRequestDefinitionGetByIDResponse> {
    return this._client.get(path`/v1/http-request-definition/${definitionID}`, options);
  }
}

export interface HTTPRequestDefinitionCreateResponse {
  /**
   * HTTP request definition with signing secret (returned on creation)
   */
  data: HTTPRequestDefinitionCreateResponse.Data;
}

export namespace HTTPRequestDefinitionCreateResponse {
  /**
   * HTTP request definition with signing secret (returned on creation)
   */
  export interface Data {
    /**
     * HTTP request definition ID
     */
    id: string;

    /**
     * Request body as a string
     */
    body: string | null;

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Description of the HTTP request definition
     */
    description: string | null;

    /**
     * Request headers as key-value pairs
     */
    headers: { [key: string]: string };

    /**
     * HTTP method: POST, PUT, PATCH, or GET
     */
    method: 'POST' | 'PUT' | 'PATCH' | 'GET';

    /**
     * Parsed body as a JSON object if valid JSON, otherwise the raw string
     */
    parsedBody: { [key: string]: unknown } | string | null;

    /**
     * Scope of the HTTP request definition
     */
    scope: 'AGENT_OUTBOUND_DIAL';

    /**
     * Signing secret (only returned on creation)
     */
    signingSecret: string;

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * URL for the HTTP request
     */
    url: string;
  }
}

export interface HTTPRequestDefinitionUpdateResponse {
  /**
   * HTTP request definition
   */
  data: HTTPRequestDefinitionUpdateResponse.Data;
}

export namespace HTTPRequestDefinitionUpdateResponse {
  /**
   * HTTP request definition
   */
  export interface Data {
    /**
     * HTTP request definition ID
     */
    id: string;

    /**
     * Request body as a string
     */
    body: string | null;

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Description of the HTTP request definition
     */
    description: string | null;

    /**
     * Request headers as key-value pairs
     */
    headers: { [key: string]: string };

    /**
     * HTTP method: POST, PUT, PATCH, or GET
     */
    method: 'POST' | 'PUT' | 'PATCH' | 'GET';

    /**
     * Parsed body as a JSON object if valid JSON, otherwise the raw string
     */
    parsedBody: { [key: string]: unknown } | string | null;

    /**
     * Scope of the HTTP request definition
     */
    scope: 'AGENT_OUTBOUND_DIAL';

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * URL for the HTTP request
     */
    url: string;
  }
}

export interface HTTPRequestDefinitionListResponse {
  data: Array<HTTPRequestDefinitionListResponse.Data>;

  pagination: HTTPRequestDefinitionListResponse.Pagination;
}

export namespace HTTPRequestDefinitionListResponse {
  /**
   * HTTP request definition
   */
  export interface Data {
    /**
     * HTTP request definition ID
     */
    id: string;

    /**
     * Request body as a string
     */
    body: string | null;

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Description of the HTTP request definition
     */
    description: string | null;

    /**
     * Request headers as key-value pairs
     */
    headers: { [key: string]: string };

    /**
     * HTTP method: POST, PUT, PATCH, or GET
     */
    method: 'POST' | 'PUT' | 'PATCH' | 'GET';

    /**
     * Parsed body as a JSON object if valid JSON, otherwise the raw string
     */
    parsedBody: { [key: string]: unknown } | string | null;

    /**
     * Scope of the HTTP request definition
     */
    scope: 'AGENT_OUTBOUND_DIAL';

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * URL for the HTTP request
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

export interface HTTPRequestDefinitionGetByIDResponse {
  /**
   * HTTP request definition
   */
  data: HTTPRequestDefinitionGetByIDResponse.Data;
}

export namespace HTTPRequestDefinitionGetByIDResponse {
  /**
   * HTTP request definition
   */
  export interface Data {
    /**
     * HTTP request definition ID
     */
    id: string;

    /**
     * Request body as a string
     */
    body: string | null;

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Description of the HTTP request definition
     */
    description: string | null;

    /**
     * Request headers as key-value pairs
     */
    headers: { [key: string]: string };

    /**
     * HTTP method: POST, PUT, PATCH, or GET
     */
    method: 'POST' | 'PUT' | 'PATCH' | 'GET';

    /**
     * Parsed body as a JSON object if valid JSON, otherwise the raw string
     */
    parsedBody: { [key: string]: unknown } | string | null;

    /**
     * Scope of the HTTP request definition
     */
    scope: 'AGENT_OUTBOUND_DIAL';

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * URL for the HTTP request
     */
    url: string;
  }
}

export interface HTTPRequestDefinitionCreateParams {
  /**
   * Scope: AGENT_OUTBOUND_DIAL
   */
  scope: 'AGENT_OUTBOUND_DIAL';

  /**
   * URL for the HTTP request
   */
  url: string;

  /**
   * Request body template. Accepts a JSON object or a string with placeholders like
   * {{phoneNumberToDial}}. Objects are serialized to JSON for storage.
   */
  body?: string | { [key: string]: unknown } | null;

  /**
   * Description of the HTTP request definition
   */
  description?: string | null;

  /**
   * Request headers as key-value pairs
   */
  headers?: { [key: string]: string };

  /**
   * HTTP method (default: POST)
   */
  method?: 'POST' | 'PUT' | 'PATCH' | 'GET';
}

export interface HTTPRequestDefinitionUpdateParams {
  /**
   * Request body template. Accepts a JSON object or a string with placeholders like
   * {{phoneNumberToDial}}. Objects are serialized to JSON for storage.
   */
  body?: string | { [key: string]: unknown } | null;

  /**
   * Description of the HTTP request definition
   */
  description?: string | null;

  /**
   * Request headers as key-value pairs
   */
  headers?: { [key: string]: string };

  /**
   * HTTP method: POST, PUT, PATCH, or GET
   */
  method?: 'POST' | 'PUT' | 'PATCH' | 'GET';

  /**
   * URL for the HTTP request
   */
  url?: string;
}

export interface HTTPRequestDefinitionListParams {
  /**
   * Cursor for pagination - definition ID to start after
   */
  after?: string;

  /**
   * Maximum number of definitions to return (default: 20, max: 50)
   */
  limit?: number;
}

export declare namespace HTTPRequestDefinition {
  export {
    type HTTPRequestDefinitionCreateResponse as HTTPRequestDefinitionCreateResponse,
    type HTTPRequestDefinitionUpdateResponse as HTTPRequestDefinitionUpdateResponse,
    type HTTPRequestDefinitionListResponse as HTTPRequestDefinitionListResponse,
    type HTTPRequestDefinitionGetByIDResponse as HTTPRequestDefinitionGetByIDResponse,
    type HTTPRequestDefinitionCreateParams as HTTPRequestDefinitionCreateParams,
    type HTTPRequestDefinitionUpdateParams as HTTPRequestDefinitionUpdateParams,
    type HTTPRequestDefinitionListParams as HTTPRequestDefinitionListParams,
  };
}
