// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Agent extends APIResource {
  /**
   * Creates a new agent for the authenticated project.
   *
   * @example
   * ```ts
   * const agent = await client.agent.create({ name: 'x' });
   * ```
   */
  create(body: AgentCreateParams, options?: RequestOptions): APIPromise<AgentCreateResponse> {
    return this._client.post('/v1/agent', { body, ...options });
  }

  /**
   * Updates an existing agent by its ID.
   *
   * @example
   * ```ts
   * const agent = await client.agent.update('agentId');
   * ```
   */
  update(
    agentID: string,
    body: AgentUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentUpdateResponse> {
    return this._client.put(path`/v1/agent/${agentID}`, { body, ...options });
  }

  /**
   * Returns a paginated list of agents for the authenticated project.
   *
   * @example
   * ```ts
   * const agents = await client.agent.list();
   * ```
   */
  list(
    query: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentListResponse> {
    return this._client.get('/v1/agent', { query, ...options });
  }

  /**
   * Creates a new Roark-hosted agent from a one-line job description. Roark authors
   * the system prompt and hosts the config, so the agent is live and self-improvable
   * from creation.
   *
   * @example
   * ```ts
   * const response = await client.agent.build({
   *   jobDescription: 'x',
   *   name: 'x',
   * });
   * ```
   */
  build(body: AgentBuildParams, options?: RequestOptions): APIPromise<AgentBuildResponse> {
    return this._client.post('/v1/agent/build', { body, ...options });
  }

  /**
   * Returns a specific agent by its ID.
   *
   * @example
   * ```ts
   * const response = await client.agent.getByID('agentId');
   * ```
   */
  getByID(agentID: string, options?: RequestOptions): APIPromise<AgentGetByIDResponse> {
    return this._client.get(path`/v1/agent/${agentID}`, options);
  }
}

export interface AgentCreateResponse {
  data: AgentCreateResponse.Data;
}

export namespace AgentCreateResponse {
  export interface Data {
    /**
     * Unique identifier of the agent
     */
    id: string;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Custom identifier for the agent
     */
    customId: string | null;

    /**
     * Description of the agent
     */
    description: string | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }
}

export interface AgentUpdateResponse {
  data: AgentUpdateResponse.Data;
}

export namespace AgentUpdateResponse {
  export interface Data {
    /**
     * Unique identifier of the agent
     */
    id: string;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Custom identifier for the agent
     */
    customId: string | null;

    /**
     * Description of the agent
     */
    description: string | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }
}

export interface AgentListResponse {
  data: Array<AgentListResponse.Data>;

  pagination: AgentListResponse.Pagination;
}

export namespace AgentListResponse {
  export interface Data {
    /**
     * Unique identifier of the agent
     */
    id: string;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Custom identifier for the agent
     */
    customId: string | null;

    /**
     * Description of the agent
     */
    description: string | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
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

export interface AgentBuildResponse {
  data: AgentBuildResponse.Data;
}

export namespace AgentBuildResponse {
  export interface Data {
    /**
     * Unique identifier of the agent
     */
    id: string;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Custom identifier for the agent
     */
    customId: string | null;

    /**
     * Description of the agent
     */
    description: string | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }
}

export interface AgentGetByIDResponse {
  data: AgentGetByIDResponse.Data;
}

export namespace AgentGetByIDResponse {
  export interface Data {
    /**
     * Unique identifier of the agent
     */
    id: string;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Custom identifier for the agent
     */
    customId: string | null;

    /**
     * Description of the agent
     */
    description: string | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }
}

export interface AgentCreateParams {
  /**
   * Name of the agent
   */
  name: string;

  /**
   * Custom identifier for the agent
   */
  customId?: string | null;

  /**
   * Description of the agent
   */
  description?: string | null;
}

export interface AgentUpdateParams {
  /**
   * Description of the agent
   */
  description?: string | null;

  /**
   * Name of the agent
   */
  name?: string;
}

export interface AgentListParams {
  after?: string;

  limit?: number;

  searchText?: string;
}

export interface AgentBuildParams {
  /**
   * One-line description of what the agent should do. Roark authors the system
   * prompt from this.
   */
  jobDescription: string;

  /**
   * Name of the agent
   */
  name: string;

  /**
   * Optional voice label for the hosted agent
   */
  voice?: string | null;
}

export declare namespace Agent {
  export {
    type AgentCreateResponse as AgentCreateResponse,
    type AgentUpdateResponse as AgentUpdateResponse,
    type AgentListResponse as AgentListResponse,
    type AgentBuildResponse as AgentBuildResponse,
    type AgentGetByIDResponse as AgentGetByIDResponse,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
    type AgentBuildParams as AgentBuildParams,
  };
}
