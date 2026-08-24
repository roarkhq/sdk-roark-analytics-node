// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SimulationEnvironment extends APIResource {
  /**
   * Returns a paginated list of environments: the project's own plus the
   * environments Roark curates and shares across every project. Reference one by id
   * when setting a customer flow variant's environment.
   */
  list(
    query: SimulationEnvironmentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationEnvironmentListResponse> {
    return this._client.get('/v1/simulation/environment', { query, ...options });
  }

  /**
   * Returns a single environment by its ID.
   */
  getByID(environmentID: string, options?: RequestOptions): APIPromise<SimulationEnvironmentGetByIDResponse> {
    return this._client.get(path`/v1/simulation/environment/${environmentID}`, options);
  }
}

/**
 * Paginated list of environments: the project's own plus the shared Roark-curated
 * ones
 */
export interface SimulationEnvironmentListResponse {
  data: Array<SimulationEnvironmentListResponse.Data>;

  pagination: SimulationEnvironmentListResponse.Pagination;
}

export namespace SimulationEnvironmentListResponse {
  /**
   * A simulation environment: the ambient conditions a customer flow variant runs
   * under. The list includes both your own and the ones Roark curates for every
   * project.
   */
  export interface Data {
    id: string;

    backgroundNoise:
      | 'NONE'
      | 'AIRPORT'
      | 'CHILDREN_PLAYING'
      | 'CITY'
      | 'COFFEE_SHOP'
      | 'DRIVING'
      | 'OFFICE'
      | 'THUNDERSTORM';

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    description?: string | null;
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

export interface SimulationEnvironmentGetByIDResponse {
  /**
   * A simulation environment: the ambient conditions a customer flow variant runs
   * under. The list includes both your own and the ones Roark curates for every
   * project.
   */
  data: SimulationEnvironmentGetByIDResponse.Data;
}

export namespace SimulationEnvironmentGetByIDResponse {
  /**
   * A simulation environment: the ambient conditions a customer flow variant runs
   * under. The list includes both your own and the ones Roark curates for every
   * project.
   */
  export interface Data {
    id: string;

    backgroundNoise:
      | 'NONE'
      | 'AIRPORT'
      | 'CHILDREN_PLAYING'
      | 'CITY'
      | 'COFFEE_SHOP'
      | 'DRIVING'
      | 'OFFICE'
      | 'THUNDERSTORM';

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    description?: string | null;
  }
}

export interface SimulationEnvironmentListParams {
  after?: string;

  limit?: number;
}

export declare namespace SimulationEnvironment {
  export {
    type SimulationEnvironmentListResponse as SimulationEnvironmentListResponse,
    type SimulationEnvironmentGetByIDResponse as SimulationEnvironmentGetByIDResponse,
    type SimulationEnvironmentListParams as SimulationEnvironmentListParams,
  };
}
