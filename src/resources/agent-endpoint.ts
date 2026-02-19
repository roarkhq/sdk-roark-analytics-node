// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AgentEndpoint extends APIResource {
  /**
   * Creates a new agent endpoint for the authenticated project.
   */
  create(body: AgentEndpointCreateParams, options?: RequestOptions): APIPromise<AgentEndpointCreateResponse> {
    return this._client.post('/v1/agent/endpoint', { body, ...options });
  }

  /**
   * Updates an existing agent endpoint by its ID. Only environment and
   * outboundDialType can be modified.
   */
  update(
    endpointID: string,
    body: AgentEndpointUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentEndpointUpdateResponse> {
    return this._client.put(path`/v1/agent/endpoint/${endpointID}`, { body, ...options });
  }

  /**
   * Returns a paginated list of agent endpoints for the authenticated project.
   */
  list(
    query: AgentEndpointListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentEndpointListResponse> {
    return this._client.get('/v1/agent/endpoint', { query, ...options });
  }

  /**
   * Returns a specific agent endpoint by its ID.
   */
  getByID(endpointID: string, options?: RequestOptions): APIPromise<AgentEndpointGetByIDResponse> {
    return this._client.get(path`/v1/agent/endpoint/${endpointID}`, options);
  }
}

export interface AgentEndpointCreateResponse {
  /**
   * Detailed agent endpoint response
   */
  data: AgentEndpointCreateResponse.Data;
}

export namespace AgentEndpointCreateResponse {
  /**
   * Detailed agent endpoint response
   */
  export interface Data {
    /**
     * Agent endpoint ID
     */
    id: string;

    /**
     * Agent ID this endpoint belongs to
     */
    agentId: string;

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Agent endpoint direction (INCOMING, OUTGOING, INCOMING_AND_OUTGOING)
     */
    direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

    /**
     * Agent endpoint environment
     */
    environment: string;

    /**
     * ID of the linked HTTP request definition for outbound dialing
     */
    outboundDialHttpRequestDefinitionId: string | null;

    /**
     * Outbound dial type (NONE or HTTP_REQUEST)
     */
    outboundDialType: 'NONE' | 'HTTP_REQUEST';

    /**
     * Agent endpoint type (PHONE or WEBSOCKET)
     */
    type: 'PHONE' | 'WEBSOCKET';

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * Agent endpoint value (phone number or websocket URL)
     */
    value: string;
  }
}

export interface AgentEndpointUpdateResponse {
  /**
   * Detailed agent endpoint response
   */
  data: AgentEndpointUpdateResponse.Data;
}

export namespace AgentEndpointUpdateResponse {
  /**
   * Detailed agent endpoint response
   */
  export interface Data {
    /**
     * Agent endpoint ID
     */
    id: string;

    /**
     * Agent ID this endpoint belongs to
     */
    agentId: string;

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Agent endpoint direction (INCOMING, OUTGOING, INCOMING_AND_OUTGOING)
     */
    direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

    /**
     * Agent endpoint environment
     */
    environment: string;

    /**
     * ID of the linked HTTP request definition for outbound dialing
     */
    outboundDialHttpRequestDefinitionId: string | null;

    /**
     * Outbound dial type (NONE or HTTP_REQUEST)
     */
    outboundDialType: 'NONE' | 'HTTP_REQUEST';

    /**
     * Agent endpoint type (PHONE or WEBSOCKET)
     */
    type: 'PHONE' | 'WEBSOCKET';

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * Agent endpoint value (phone number or websocket URL)
     */
    value: string;
  }
}

export interface AgentEndpointListResponse {
  data: Array<AgentEndpointListResponse.Data>;

  pagination: AgentEndpointListResponse.Pagination;
}

export namespace AgentEndpointListResponse {
  /**
   * Detailed agent endpoint response
   */
  export interface Data {
    /**
     * Agent endpoint ID
     */
    id: string;

    /**
     * Agent ID this endpoint belongs to
     */
    agentId: string;

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Agent endpoint direction (INCOMING, OUTGOING, INCOMING_AND_OUTGOING)
     */
    direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

    /**
     * Agent endpoint environment
     */
    environment: string;

    /**
     * ID of the linked HTTP request definition for outbound dialing
     */
    outboundDialHttpRequestDefinitionId: string | null;

    /**
     * Outbound dial type (NONE or HTTP_REQUEST)
     */
    outboundDialType: 'NONE' | 'HTTP_REQUEST';

    /**
     * Agent endpoint type (PHONE or WEBSOCKET)
     */
    type: 'PHONE' | 'WEBSOCKET';

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * Agent endpoint value (phone number or websocket URL)
     */
    value: string;
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

export interface AgentEndpointGetByIDResponse {
  /**
   * Detailed agent endpoint response
   */
  data: AgentEndpointGetByIDResponse.Data;
}

export namespace AgentEndpointGetByIDResponse {
  /**
   * Detailed agent endpoint response
   */
  export interface Data {
    /**
     * Agent endpoint ID
     */
    id: string;

    /**
     * Agent ID this endpoint belongs to
     */
    agentId: string;

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Agent endpoint direction (INCOMING, OUTGOING, INCOMING_AND_OUTGOING)
     */
    direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

    /**
     * Agent endpoint environment
     */
    environment: string;

    /**
     * ID of the linked HTTP request definition for outbound dialing
     */
    outboundDialHttpRequestDefinitionId: string | null;

    /**
     * Outbound dial type (NONE or HTTP_REQUEST)
     */
    outboundDialType: 'NONE' | 'HTTP_REQUEST';

    /**
     * Agent endpoint type (PHONE or WEBSOCKET)
     */
    type: 'PHONE' | 'WEBSOCKET';

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * Agent endpoint value (phone number or websocket URL)
     */
    value: string;
  }
}

export interface AgentEndpointCreateParams {
  /**
   * Agent ID to associate this endpoint with
   */
  agentId: string;

  /**
   * Call direction: INCOMING, OUTGOING, or INCOMING_AND_OUTGOING
   */
  direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

  /**
   * Phone number in E.164 format (e.g., +12345678900)
   */
  value: string;

  /**
   * Environment name (default: production)
   */
  environment?: string;

  /**
   * ID of the HTTP request definition for outbound dialing (required when
   * outboundDialType is HTTP_REQUEST)
   */
  outboundDialHttpRequestDefinitionId?: string | null;

  /**
   * Outbound dial type: NONE or HTTP_REQUEST (default: NONE)
   */
  outboundDialType?: 'NONE' | 'HTTP_REQUEST';
}

export interface AgentEndpointUpdateParams {
  /**
   * Environment name
   */
  environment?: string;

  /**
   * ID of the HTTP request definition for outbound dialing
   */
  outboundDialHttpRequestDefinitionId?: string | null;

  /**
   * Outbound dial type: NONE or HTTP_REQUEST
   */
  outboundDialType?: 'NONE' | 'HTTP_REQUEST';
}

export interface AgentEndpointListParams {
  /**
   * Cursor for pagination - endpoint ID to start after
   */
  after?: string;

  /**
   * Filter by agent ID
   */
  agentId?: string;

  /**
   * Maximum number of endpoints to return (default: 20, max: 50)
   */
  limit?: number;

  /**
   * Search text to filter endpoints
   */
  searchText?: string;
}

export declare namespace AgentEndpoint {
  export {
    type AgentEndpointCreateResponse as AgentEndpointCreateResponse,
    type AgentEndpointUpdateResponse as AgentEndpointUpdateResponse,
    type AgentEndpointListResponse as AgentEndpointListResponse,
    type AgentEndpointGetByIDResponse as AgentEndpointGetByIDResponse,
    type AgentEndpointCreateParams as AgentEndpointCreateParams,
    type AgentEndpointUpdateParams as AgentEndpointUpdateParams,
    type AgentEndpointListParams as AgentEndpointListParams,
  };
}
