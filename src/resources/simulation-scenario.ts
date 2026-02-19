// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SimulationScenario extends APIResource {
  /**
   * Creates a new simulation scenario for the authenticated project.
   */
  create(
    body: SimulationScenarioCreateParams,
    options?: RequestOptions,
  ): APIPromise<SimulationScenarioCreateResponse> {
    return this._client.post('/v1/simulation/scenario', { body, ...options });
  }

  /**
   * Updates an existing simulation scenario by its ID.
   */
  update(
    scenarioID: string,
    body: SimulationScenarioUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SimulationScenarioUpdateResponse> {
    return this._client.put(path`/v1/simulation/scenario/${scenarioID}`, { body, ...options });
  }

  /**
   * Returns a paginated list of simulation scenarios for the authenticated project.
   */
  list(
    query: SimulationScenarioListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationScenarioListResponse> {
    return this._client.get('/v1/simulation/scenario', { query, ...options });
  }

  /**
   * Deletes a simulation scenario by its ID.
   */
  delete(scenarioID: string, options?: RequestOptions): APIPromise<SimulationScenarioDeleteResponse> {
    return this._client.delete(path`/v1/simulation/scenario/${scenarioID}`, options);
  }

  /**
   * Returns a specific simulation scenario by its ID.
   */
  getByID(scenarioID: string, options?: RequestOptions): APIPromise<SimulationScenarioGetByIDResponse> {
    return this._client.get(path`/v1/simulation/scenario/${scenarioID}`, options);
  }
}

export interface SimulationScenarioCreateResponse {
  data: SimulationScenarioCreateResponse.Data;
}

export namespace SimulationScenarioCreateResponse {
  export interface Data {
    /**
     * Unique identifier of the scenario
     */
    id: string;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Description of the scenario
     */
    description: string | null;

    /**
     * Name of the scenario (from the start node content)
     */
    name: string | null;

    /**
     * Ordered list of steps in the scenario (excludes the START node)
     */
    steps: Array<Data.Step>;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }

  export namespace Data {
    export interface Step {
      /**
       * Content/text of the step
       */
      content: string | null;

      /**
       * Unique identifier of the step node (use this for update/delete operations)
       */
      nodeId: string;

      /**
       * Type of step in the scenario
       */
      type:
        | 'START'
        | 'AGENT_TURN'
        | 'CUSTOMER_TURN'
        | 'CUSTOMER_FIRST_MESSAGE'
        | 'CUSTOMER_SILENCE'
        | 'VOICEMAIL';
    }
  }
}

export interface SimulationScenarioUpdateResponse {
  data: SimulationScenarioUpdateResponse.Data;
}

export namespace SimulationScenarioUpdateResponse {
  export interface Data {
    /**
     * Unique identifier of the scenario
     */
    id: string;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Description of the scenario
     */
    description: string | null;

    /**
     * Name of the scenario (from the start node content)
     */
    name: string | null;

    /**
     * Ordered list of steps in the scenario (excludes the START node)
     */
    steps: Array<Data.Step>;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }

  export namespace Data {
    export interface Step {
      /**
       * Content/text of the step
       */
      content: string | null;

      /**
       * Unique identifier of the step node (use this for update/delete operations)
       */
      nodeId: string;

      /**
       * Type of step in the scenario
       */
      type:
        | 'START'
        | 'AGENT_TURN'
        | 'CUSTOMER_TURN'
        | 'CUSTOMER_FIRST_MESSAGE'
        | 'CUSTOMER_SILENCE'
        | 'VOICEMAIL';
    }
  }
}

export interface SimulationScenarioListResponse {
  data: Array<SimulationScenarioListResponse.Data>;

  pagination: SimulationScenarioListResponse.Pagination;
}

export namespace SimulationScenarioListResponse {
  export interface Data {
    /**
     * Unique identifier of the scenario
     */
    id: string;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Description of the scenario
     */
    description: string | null;

    /**
     * Name of the scenario (from the start node content)
     */
    name: string | null;

    /**
     * Ordered list of steps in the scenario (excludes the START node)
     */
    steps: Array<Data.Step>;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }

  export namespace Data {
    export interface Step {
      /**
       * Content/text of the step
       */
      content: string | null;

      /**
       * Unique identifier of the step node (use this for update/delete operations)
       */
      nodeId: string;

      /**
       * Type of step in the scenario
       */
      type:
        | 'START'
        | 'AGENT_TURN'
        | 'CUSTOMER_TURN'
        | 'CUSTOMER_FIRST_MESSAGE'
        | 'CUSTOMER_SILENCE'
        | 'VOICEMAIL';
    }
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

export interface SimulationScenarioDeleteResponse {
  data: SimulationScenarioDeleteResponse.Data;
}

export namespace SimulationScenarioDeleteResponse {
  export interface Data {
    /**
     * Whether the scenario was deleted
     */
    deleted: boolean;
  }
}

export interface SimulationScenarioGetByIDResponse {
  data: SimulationScenarioGetByIDResponse.Data;
}

export namespace SimulationScenarioGetByIDResponse {
  export interface Data {
    /**
     * Unique identifier of the scenario
     */
    id: string;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Description of the scenario
     */
    description: string | null;

    /**
     * Name of the scenario (from the start node content)
     */
    name: string | null;

    /**
     * Ordered list of steps in the scenario (excludes the START node)
     */
    steps: Array<Data.Step>;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }

  export namespace Data {
    export interface Step {
      /**
       * Content/text of the step
       */
      content: string | null;

      /**
       * Unique identifier of the step node (use this for update/delete operations)
       */
      nodeId: string;

      /**
       * Type of step in the scenario
       */
      type:
        | 'START'
        | 'AGENT_TURN'
        | 'CUSTOMER_TURN'
        | 'CUSTOMER_FIRST_MESSAGE'
        | 'CUSTOMER_SILENCE'
        | 'VOICEMAIL';
    }
  }
}

export interface SimulationScenarioCreateParams {
  /**
   * Name of the scenario (used as the START node content)
   */
  name: string;

  /**
   * Ordered list of steps for the scenario (at least one step is required)
   */
  steps: Array<SimulationScenarioCreateParams.Step>;
}

export namespace SimulationScenarioCreateParams {
  /**
   * A step to include when creating a scenario
   */
  export interface Step {
    /**
     * The content/text of the step
     */
    content: string;

    /**
     * The type of this step
     */
    type: 'AGENT_TURN' | 'CUSTOMER_TURN' | 'CUSTOMER_FIRST_MESSAGE' | 'CUSTOMER_SILENCE' | 'VOICEMAIL';
  }
}

export interface SimulationScenarioUpdateParams {
  /**
   * List of step changes to apply to the scenario
   */
  stepChanges: Array<
    | SimulationScenarioUpdateParams.CreateStepChange
    | SimulationScenarioUpdateParams.UpdateStepChange
    | SimulationScenarioUpdateParams.DeleteStepChange
  >;

  /**
   * New name for the scenario (updates the START node content)
   */
  name?: string;
}

export namespace SimulationScenarioUpdateParams {
  /**
   * Create a new step in the scenario
   */
  export interface CreateStepChange {
    /**
     * Create a new step
     */
    action: 'create';

    /**
     * The content/text of the new step
     */
    content: string;

    /**
     * The type of the new step
     */
    type: 'AGENT_TURN' | 'CUSTOMER_TURN' | 'CUSTOMER_FIRST_MESSAGE' | 'CUSTOMER_SILENCE' | 'VOICEMAIL';
  }

  /**
   * Update an existing step in the scenario
   */
  export interface UpdateStepChange {
    /**
     * Update an existing step
     */
    action: 'update';

    /**
     * The ID of the step node to update
     */
    nodeId: string;

    /**
     * The new content/text of the step (optional)
     */
    content?: string;

    /**
     * The new type of the step (optional)
     */
    type?: 'AGENT_TURN' | 'CUSTOMER_TURN' | 'CUSTOMER_FIRST_MESSAGE' | 'CUSTOMER_SILENCE' | 'VOICEMAIL';
  }

  /**
   * Delete a step from the scenario
   */
  export interface DeleteStepChange {
    /**
     * Delete an existing step
     */
    action: 'delete';

    /**
     * The ID of the step node to delete
     */
    nodeId: string;
  }
}

export interface SimulationScenarioListParams {
  after?: string;

  limit?: number;
}

export declare namespace SimulationScenario {
  export {
    type SimulationScenarioCreateResponse as SimulationScenarioCreateResponse,
    type SimulationScenarioUpdateResponse as SimulationScenarioUpdateResponse,
    type SimulationScenarioListResponse as SimulationScenarioListResponse,
    type SimulationScenarioDeleteResponse as SimulationScenarioDeleteResponse,
    type SimulationScenarioGetByIDResponse as SimulationScenarioGetByIDResponse,
    type SimulationScenarioCreateParams as SimulationScenarioCreateParams,
    type SimulationScenarioUpdateParams as SimulationScenarioUpdateParams,
    type SimulationScenarioListParams as SimulationScenarioListParams,
  };
}
