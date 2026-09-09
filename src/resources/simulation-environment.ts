// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SimulationEnvironment extends APIResource {
  /**
   * Creates an environment for the project: a noise bed and the level it plays at.
   * Reference it by id when setting a customer flow variant's environment. Roark's
   * curated presets always play at the default level, so this is how a project gets
   * the same bed louder or quieter.
   *
   * @example
   * ```ts
   * const simulationEnvironment =
   *   await client.simulationEnvironment.create({
   *     backgroundNoise: 'OFFICE',
   *     name: 'Busy call centre',
   *   });
   * ```
   */
  create(
    body: SimulationEnvironmentCreateParams,
    options?: RequestOptions,
  ): APIPromise<SimulationEnvironmentCreateResponse> {
    return this._client.post('/v1/simulation/environment', { body, ...options });
  }

  /**
   * Updates one of the project's environments. Only the fields sent are changed.
   * Runs already built keep the snapshot they were built with. Roark-curated
   * environments cannot be edited (403).
   *
   * @example
   * ```ts
   * const simulationEnvironment =
   *   await client.simulationEnvironment.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  update(
    environmentID: string,
    body: SimulationEnvironmentUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationEnvironmentUpdateResponse> {
    return this._client.put(path`/v1/simulation/environment/${environmentID}`, { body, ...options });
  }

  /**
   * Returns a paginated list of environments: the project's own plus the
   * environments Roark curates and shares across every project. Reference one by id
   * when setting a customer flow variant's environment.
   *
   * @example
   * ```ts
   * const simulationEnvironments =
   *   await client.simulationEnvironment.list();
   * ```
   */
  list(
    query: SimulationEnvironmentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationEnvironmentListResponse> {
    return this._client.get('/v1/simulation/environment', { query, ...options });
  }

  /**
   * Soft-deletes one of the project's environments. It disappears from reads and
   * cannot be picked for new runs; runs already built keep their snapshot. Refused
   * (409) while a live customer flow variant still uses it: move those variants
   * first. Roark-curated environments cannot be deleted (403).
   *
   * @example
   * ```ts
   * const simulationEnvironment =
   *   await client.simulationEnvironment.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  delete(environmentID: string, options?: RequestOptions): APIPromise<SimulationEnvironmentDeleteResponse> {
    return this._client.delete(path`/v1/simulation/environment/${environmentID}`, options);
  }

  /**
   * Returns a single environment by its ID.
   *
   * @example
   * ```ts
   * const response = await client.simulationEnvironment.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  getByID(environmentID: string, options?: RequestOptions): APIPromise<SimulationEnvironmentGetByIDResponse> {
    return this._client.get(path`/v1/simulation/environment/${environmentID}`, options);
  }
}

export interface SimulationEnvironmentCreateResponse {
  /**
   * A simulation environment: the ambient conditions a customer flow variant runs
   * under. The list includes both your own and the ones Roark curates for every
   * project.
   */
  data: SimulationEnvironmentCreateResponse.Data;
}

export namespace SimulationEnvironmentCreateResponse {
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

    backgroundNoiseVolume: number;

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

export interface SimulationEnvironmentUpdateResponse {
  /**
   * A simulation environment: the ambient conditions a customer flow variant runs
   * under. The list includes both your own and the ones Roark curates for every
   * project.
   */
  data: SimulationEnvironmentUpdateResponse.Data;
}

export namespace SimulationEnvironmentUpdateResponse {
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

    backgroundNoiseVolume: number;

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

    backgroundNoiseVolume: number;

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

export interface SimulationEnvironmentDeleteResponse {
  data: SimulationEnvironmentDeleteResponse.Data;
}

export namespace SimulationEnvironmentDeleteResponse {
  export interface Data {
    /**
     * Unique identifier of the deleted environment
     */
    id: string;

    /**
     * Always true when the environment was deleted
     */
    deleted: true;
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

    backgroundNoiseVolume: number;

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

export interface SimulationEnvironmentCreateParams {
  /**
   * The noise bed played underneath the simulated caller. NONE plays nothing.
   */
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
   * Display name, shown wherever a flow variant references the environment
   */
  name: string;

  /**
   * How loud the bed plays, as a gain from 0 (silent) to 1 (as loud as the caller).
   * Defaults to 0.1, which sits well under the caller. Ignored on Vapi endpoints,
   * which have no level control.
   */
  backgroundNoiseVolume?: number;

  /**
   * Optional note on when to use this environment
   */
  description?: string | null;
}

export interface SimulationEnvironmentUpdateParams {
  /**
   * The noise bed played underneath the simulated caller. NONE plays nothing.
   */
  backgroundNoise?:
    | 'NONE'
    | 'AIRPORT'
    | 'CHILDREN_PLAYING'
    | 'CITY'
    | 'COFFEE_SHOP'
    | 'DRIVING'
    | 'OFFICE'
    | 'THUNDERSTORM';

  /**
   * How loud the bed plays, as a gain from 0 (silent) to 1 (as loud as the caller).
   * Defaults to 0.1, which sits well under the caller. Ignored on Vapi endpoints,
   * which have no level control.
   */
  backgroundNoiseVolume?: number;

  /**
   * Optional note on when to use this environment
   */
  description?: string | null;

  /**
   * Display name, shown wherever a flow variant references the environment
   */
  name?: string;
}

export interface SimulationEnvironmentListParams {
  after?: string;

  limit?: number;
}

export declare namespace SimulationEnvironment {
  export {
    type SimulationEnvironmentCreateResponse as SimulationEnvironmentCreateResponse,
    type SimulationEnvironmentUpdateResponse as SimulationEnvironmentUpdateResponse,
    type SimulationEnvironmentListResponse as SimulationEnvironmentListResponse,
    type SimulationEnvironmentDeleteResponse as SimulationEnvironmentDeleteResponse,
    type SimulationEnvironmentGetByIDResponse as SimulationEnvironmentGetByIDResponse,
    type SimulationEnvironmentCreateParams as SimulationEnvironmentCreateParams,
    type SimulationEnvironmentUpdateParams as SimulationEnvironmentUpdateParams,
    type SimulationEnvironmentListParams as SimulationEnvironmentListParams,
  };
}
