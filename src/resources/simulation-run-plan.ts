// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SimulationRunPlan extends APIResource {
  /**
   * Creates a new simulation run plan. Optionally triggers a job immediately if
   * autoRun is true.
   *
   * @example
   * ```ts
   * const simulationRunPlan =
   *   await client.simulationRunPlan.create({
   *     agentEndpoints: [
   *       { id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   *     ],
   *     direction: 'INBOUND',
   *     maxSimulationDurationSeconds: 300,
   *     metrics: [
   *       { id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   *     ],
   *     name: 'My Run Plan',
   *     personas: [
   *       { id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   *     ],
   *     scenarios: [
   *       { id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   *     ],
   *   });
   * ```
   */
  create(
    body: SimulationRunPlanCreateParams,
    options?: RequestOptions,
  ): APIPromise<SimulationRunPlanCreateResponse> {
    return this._client.post('/v1/simulation/plan', { body, ...options });
  }

  /**
   * Updates an existing simulation run plan by its ID.
   *
   * @example
   * ```ts
   * const simulationRunPlan =
   *   await client.simulationRunPlan.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  update(
    planID: string,
    body: SimulationRunPlanUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationRunPlanUpdateResponse> {
    return this._client.put(path`/v1/simulation/plan/${planID}`, { body, ...options });
  }

  /**
   * Returns a paginated list of simulation run plans. Optionally filter by search
   * text or agent ID.
   *
   * @example
   * ```ts
   * const simulationRunPlans =
   *   await client.simulationRunPlan.list();
   * ```
   */
  list(
    query: SimulationRunPlanListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationRunPlanListResponse> {
    return this._client.get('/v1/simulation/plan', { query, ...options });
  }

  /**
   * Soft-deletes a simulation run plan by its ID.
   *
   * @example
   * ```ts
   * const simulationRunPlan =
   *   await client.simulationRunPlan.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  delete(planID: string, options?: RequestOptions): APIPromise<SimulationRunPlanDeleteResponse> {
    return this._client.delete(path`/v1/simulation/plan/${planID}`, options);
  }

  /**
   * Returns a specific simulation run plan by its ID.
   *
   * @example
   * ```ts
   * const response = await client.simulationRunPlan.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  getByID(planID: string, options?: RequestOptions): APIPromise<SimulationRunPlanGetByIDResponse> {
    return this._client.get(path`/v1/simulation/plan/${planID}`, options);
  }
}

export interface SimulationRunPlanCreateResponse {
  /**
   * Response when creating a run plan, optionally including a triggered job
   */
  data: SimulationRunPlanCreateResponse.Data;
}

export namespace SimulationRunPlanCreateResponse {
  /**
   * Response when creating a run plan, optionally including a triggered job
   */
  export interface Data {
    /**
     * A simulation run plan defining the test matrix
     */
    runPlan: Data.RunPlan;

    /**
     * Response when triggering a simulation run plan
     */
    runPlanJob?: Data.RunPlanJob | null;
  }

  export namespace Data {
    /**
     * A simulation run plan defining the test matrix
     */
    export interface RunPlan {
      /**
       * Unique identifier of the run plan
       */
      id: string;

      /**
       * Agent endpoints included in this run plan
       */
      agentEndpoints: Array<RunPlan.AgentEndpoint>;

      /**
       * When the run plan was created
       */
      createdAt: string;

      /**
       * Direction of the simulation (INBOUND or OUTBOUND)
       */
      direction: 'INBOUND' | 'OUTBOUND';

      /**
       * Phrases that trigger end of call. Empty array means disabled.
       */
      endCallPhrases: Array<string>;

      /**
       * Semantic conditions that trigger end of call. The LLM evaluates the conversation
       * against these conditions. Empty array means disabled.
       */
      endCallReasons: Array<string>;

      /**
       * Deprecated: Use metrics instead. Evaluators included in this run plan.
       */
      evaluators: Array<RunPlan.Evaluator>;

      /**
       * Execution mode (PARALLEL or SEQUENTIAL)
       */
      executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

      /**
       * Number of iterations to run for each test case
       */
      iterationCount: number;

      /**
       * Maximum number of concurrent simulation jobs
       */
      maxConcurrentJobs: number;

      /**
       * Maximum duration in seconds for each simulation
       */
      maxSimulationDurationSeconds: number;

      /**
       * Metric definitions included in this run plan
       */
      metrics: Array<RunPlan.Metric>;

      /**
       * Name of the run plan
       */
      name: string;

      /**
       * Personas included in this run plan
       */
      personas: Array<RunPlan.Persona>;

      /**
       * Scenarios included in this run plan
       */
      scenarios: Array<RunPlan.Scenario>;

      /**
       * Timeout in seconds for silence detection
       */
      silenceTimeoutSeconds: number;

      /**
       * Total number of test cases generated from the plan configuration
       */
      testCaseCount: number;

      /**
       * When the run plan was last updated
       */
      updatedAt: string;

      /**
       * Description of the run plan
       */
      description?: string | null;
    }

    export namespace RunPlan {
      export interface AgentEndpoint {
        id: string;
      }

      export interface Evaluator {
        id: string;
      }

      export interface Metric {
        id: string;
      }

      export interface Persona {
        id: string;
      }

      export interface Scenario {
        id: string;
      }
    }

    /**
     * Response when triggering a simulation run plan
     */
    export interface RunPlanJob {
      /**
       * When the job was created
       */
      createdAt: string;

      /**
       * ID of the simulation run plan that was executed
       */
      simulationRunPlanId: string;

      /**
       * ID of the simulation run plan job that was created
       */
      simulationRunPlanJobId: string;

      /**
       * Initial status of the job
       */
      status:
        | 'PENDING'
        | 'QUEUED'
        | 'CREATING_SNAPSHOTS'
        | 'CREATING_SIMULATIONS'
        | 'RUNNING_SIMULATIONS'
        | 'COMPLETED'
        | 'FAILED'
        | 'TIMED_OUT'
        | 'CANCELLED'
        | 'CANCELLING'
        | 'ENDING_SIMULATIONS';
    }
  }
}

export interface SimulationRunPlanUpdateResponse {
  /**
   * A simulation run plan defining the test matrix
   */
  data: SimulationRunPlanUpdateResponse.Data;
}

export namespace SimulationRunPlanUpdateResponse {
  /**
   * A simulation run plan defining the test matrix
   */
  export interface Data {
    /**
     * Unique identifier of the run plan
     */
    id: string;

    /**
     * Agent endpoints included in this run plan
     */
    agentEndpoints: Array<Data.AgentEndpoint>;

    /**
     * When the run plan was created
     */
    createdAt: string;

    /**
     * Direction of the simulation (INBOUND or OUTBOUND)
     */
    direction: 'INBOUND' | 'OUTBOUND';

    /**
     * Phrases that trigger end of call. Empty array means disabled.
     */
    endCallPhrases: Array<string>;

    /**
     * Semantic conditions that trigger end of call. The LLM evaluates the conversation
     * against these conditions. Empty array means disabled.
     */
    endCallReasons: Array<string>;

    /**
     * Deprecated: Use metrics instead. Evaluators included in this run plan.
     */
    evaluators: Array<Data.Evaluator>;

    /**
     * Execution mode (PARALLEL or SEQUENTIAL)
     */
    executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

    /**
     * Number of iterations to run for each test case
     */
    iterationCount: number;

    /**
     * Maximum number of concurrent simulation jobs
     */
    maxConcurrentJobs: number;

    /**
     * Maximum duration in seconds for each simulation
     */
    maxSimulationDurationSeconds: number;

    /**
     * Metric definitions included in this run plan
     */
    metrics: Array<Data.Metric>;

    /**
     * Name of the run plan
     */
    name: string;

    /**
     * Personas included in this run plan
     */
    personas: Array<Data.Persona>;

    /**
     * Scenarios included in this run plan
     */
    scenarios: Array<Data.Scenario>;

    /**
     * Timeout in seconds for silence detection
     */
    silenceTimeoutSeconds: number;

    /**
     * Total number of test cases generated from the plan configuration
     */
    testCaseCount: number;

    /**
     * When the run plan was last updated
     */
    updatedAt: string;

    /**
     * Description of the run plan
     */
    description?: string | null;
  }

  export namespace Data {
    export interface AgentEndpoint {
      id: string;
    }

    export interface Evaluator {
      id: string;
    }

    export interface Metric {
      id: string;
    }

    export interface Persona {
      id: string;
    }

    export interface Scenario {
      id: string;
    }
  }
}

/**
 * Paginated list of simulation run plans
 */
export interface SimulationRunPlanListResponse {
  data: Array<SimulationRunPlanListResponse.Data>;

  pagination: SimulationRunPlanListResponse.Pagination;
}

export namespace SimulationRunPlanListResponse {
  /**
   * A simulation run plan defining the test matrix
   */
  export interface Data {
    /**
     * Unique identifier of the run plan
     */
    id: string;

    /**
     * Agent endpoints included in this run plan
     */
    agentEndpoints: Array<Data.AgentEndpoint>;

    /**
     * When the run plan was created
     */
    createdAt: string;

    /**
     * Direction of the simulation (INBOUND or OUTBOUND)
     */
    direction: 'INBOUND' | 'OUTBOUND';

    /**
     * Phrases that trigger end of call. Empty array means disabled.
     */
    endCallPhrases: Array<string>;

    /**
     * Semantic conditions that trigger end of call. The LLM evaluates the conversation
     * against these conditions. Empty array means disabled.
     */
    endCallReasons: Array<string>;

    /**
     * Deprecated: Use metrics instead. Evaluators included in this run plan.
     */
    evaluators: Array<Data.Evaluator>;

    /**
     * Execution mode (PARALLEL or SEQUENTIAL)
     */
    executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

    /**
     * Number of iterations to run for each test case
     */
    iterationCount: number;

    /**
     * Maximum number of concurrent simulation jobs
     */
    maxConcurrentJobs: number;

    /**
     * Maximum duration in seconds for each simulation
     */
    maxSimulationDurationSeconds: number;

    /**
     * Metric definitions included in this run plan
     */
    metrics: Array<Data.Metric>;

    /**
     * Name of the run plan
     */
    name: string;

    /**
     * Personas included in this run plan
     */
    personas: Array<Data.Persona>;

    /**
     * Scenarios included in this run plan
     */
    scenarios: Array<Data.Scenario>;

    /**
     * Timeout in seconds for silence detection
     */
    silenceTimeoutSeconds: number;

    /**
     * Total number of test cases generated from the plan configuration
     */
    testCaseCount: number;

    /**
     * When the run plan was last updated
     */
    updatedAt: string;

    /**
     * Description of the run plan
     */
    description?: string | null;
  }

  export namespace Data {
    export interface AgentEndpoint {
      id: string;
    }

    export interface Evaluator {
      id: string;
    }

    export interface Metric {
      id: string;
    }

    export interface Persona {
      id: string;
    }

    export interface Scenario {
      id: string;
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

export interface SimulationRunPlanDeleteResponse {
  data: SimulationRunPlanDeleteResponse.Data;
}

export namespace SimulationRunPlanDeleteResponse {
  export interface Data {
    /**
     * Whether the run plan was deleted
     */
    deleted: boolean;
  }
}

export interface SimulationRunPlanGetByIDResponse {
  /**
   * A simulation run plan defining the test matrix
   */
  data: SimulationRunPlanGetByIDResponse.Data;
}

export namespace SimulationRunPlanGetByIDResponse {
  /**
   * A simulation run plan defining the test matrix
   */
  export interface Data {
    /**
     * Unique identifier of the run plan
     */
    id: string;

    /**
     * Agent endpoints included in this run plan
     */
    agentEndpoints: Array<Data.AgentEndpoint>;

    /**
     * When the run plan was created
     */
    createdAt: string;

    /**
     * Direction of the simulation (INBOUND or OUTBOUND)
     */
    direction: 'INBOUND' | 'OUTBOUND';

    /**
     * Phrases that trigger end of call. Empty array means disabled.
     */
    endCallPhrases: Array<string>;

    /**
     * Semantic conditions that trigger end of call. The LLM evaluates the conversation
     * against these conditions. Empty array means disabled.
     */
    endCallReasons: Array<string>;

    /**
     * Deprecated: Use metrics instead. Evaluators included in this run plan.
     */
    evaluators: Array<Data.Evaluator>;

    /**
     * Execution mode (PARALLEL or SEQUENTIAL)
     */
    executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

    /**
     * Number of iterations to run for each test case
     */
    iterationCount: number;

    /**
     * Maximum number of concurrent simulation jobs
     */
    maxConcurrentJobs: number;

    /**
     * Maximum duration in seconds for each simulation
     */
    maxSimulationDurationSeconds: number;

    /**
     * Metric definitions included in this run plan
     */
    metrics: Array<Data.Metric>;

    /**
     * Name of the run plan
     */
    name: string;

    /**
     * Personas included in this run plan
     */
    personas: Array<Data.Persona>;

    /**
     * Scenarios included in this run plan
     */
    scenarios: Array<Data.Scenario>;

    /**
     * Timeout in seconds for silence detection
     */
    silenceTimeoutSeconds: number;

    /**
     * Total number of test cases generated from the plan configuration
     */
    testCaseCount: number;

    /**
     * When the run plan was last updated
     */
    updatedAt: string;

    /**
     * Description of the run plan
     */
    description?: string | null;
  }

  export namespace Data {
    export interface AgentEndpoint {
      id: string;
    }

    export interface Evaluator {
      id: string;
    }

    export interface Metric {
      id: string;
    }

    export interface Persona {
      id: string;
    }

    export interface Scenario {
      id: string;
    }
  }
}

export interface SimulationRunPlanCreateParams {
  /**
   * Agent endpoints to include in this run plan
   */
  agentEndpoints: Array<SimulationRunPlanCreateParams.AgentEndpoint>;

  /**
   * Direction of the simulation (INBOUND or OUTBOUND)
   */
  direction: 'INBOUND' | 'OUTBOUND';

  /**
   * Maximum duration in seconds for each simulation
   */
  maxSimulationDurationSeconds: number;

  /**
   * Metric definitions to include in this run plan
   */
  metrics: Array<SimulationRunPlanCreateParams.Metric>;

  /**
   * Name of the run plan
   */
  name: string;

  /**
   * Personas to include in this run plan
   */
  personas: Array<SimulationRunPlanCreateParams.Persona>;

  /**
   * Scenarios to include in this run plan. The same scenario ID can appear multiple
   * times with different variables.
   */
  scenarios: Array<SimulationRunPlanCreateParams.Scenario>;

  /**
   * Whether to automatically trigger a job after creating the run plan
   */
  autoRun?: boolean;

  /**
   * Description of the run plan
   */
  description?: string;

  /**
   * Phrases that trigger end of call. Empty array disables the feature.
   */
  endCallPhrases?: Array<string>;

  /**
   * Semantic conditions that trigger end of call. The LLM evaluates the conversation
   * against these conditions. Empty array disables the feature.
   */
  endCallReasons?: Array<string>;

  /**
   * Execution mode (PARALLEL or SEQUENTIAL)
   */
  executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

  /**
   * Number of iterations to run for each test case. Must be 1 for OUTBOUND
   * direction.
   */
  iterationCount?: number;

  /**
   * Maximum number of concurrent simulation jobs
   */
  maxConcurrentJobs?: number;

  /**
   * Timeout in seconds for silence detection
   */
  silenceTimeoutSeconds?: number;
}

export namespace SimulationRunPlanCreateParams {
  export interface AgentEndpoint {
    id: string;
  }

  export interface Metric {
    id: string;
  }

  export interface Persona {
    id: string;
  }

  export interface Scenario {
    /**
     * Scenario ID
     */
    id: string;

    /**
     * Template variables for this scenario instance. The same scenario can appear
     * multiple times with different variables.
     */
    variables?: { [key: string]: string };
  }
}

export interface SimulationRunPlanUpdateParams {
  /**
   * Agent endpoints to include in this run plan
   */
  agentEndpoints?: Array<SimulationRunPlanUpdateParams.AgentEndpoint>;

  /**
   * Description of the run plan
   */
  description?: string;

  /**
   * Direction of the simulation (INBOUND or OUTBOUND)
   */
  direction?: 'INBOUND' | 'OUTBOUND';

  /**
   * Phrases that trigger end of call. Empty array disables the feature.
   */
  endCallPhrases?: Array<string>;

  /**
   * Semantic conditions that trigger end of call. The LLM evaluates the conversation
   * against these conditions. Empty array disables the feature.
   */
  endCallReasons?: Array<string>;

  /**
   * Execution mode (PARALLEL or SEQUENTIAL)
   */
  executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

  /**
   * Number of iterations to run for each test case. Must be 1 for OUTBOUND
   * direction.
   */
  iterationCount?: number;

  /**
   * Maximum number of concurrent simulation jobs
   */
  maxConcurrentJobs?: number;

  /**
   * Maximum duration in seconds for each simulation
   */
  maxSimulationDurationSeconds?: number;

  /**
   * Metric definitions to include in this run plan
   */
  metrics?: Array<SimulationRunPlanUpdateParams.Metric>;

  /**
   * Name of the run plan
   */
  name?: string;

  /**
   * Personas to include in this run plan
   */
  personas?: Array<SimulationRunPlanUpdateParams.Persona>;

  /**
   * Scenarios to include in this run plan. The same scenario ID can appear multiple
   * times with different variables.
   */
  scenarios?: Array<SimulationRunPlanUpdateParams.Scenario>;

  /**
   * Timeout in seconds for silence detection
   */
  silenceTimeoutSeconds?: number;
}

export namespace SimulationRunPlanUpdateParams {
  export interface AgentEndpoint {
    id: string;
  }

  export interface Metric {
    id: string;
  }

  export interface Persona {
    id: string;
  }

  export interface Scenario {
    /**
     * Scenario ID
     */
    id: string;

    /**
     * Template variables for this scenario instance. The same scenario can appear
     * multiple times with different variables.
     */
    variables?: { [key: string]: string };
  }
}

export interface SimulationRunPlanListParams {
  /**
   * Cursor for pagination - use the nextCursor value from a previous response
   */
  after?: string;

  /**
   * Filter run plans by agent ID
   */
  agentId?: string;

  /**
   * Maximum number of run plans to return (default: 20, max: 50)
   */
  limit?: number;

  /**
   * Search text to filter run plans by name
   */
  searchText?: string;
}

export declare namespace SimulationRunPlan {
  export {
    type SimulationRunPlanCreateResponse as SimulationRunPlanCreateResponse,
    type SimulationRunPlanUpdateResponse as SimulationRunPlanUpdateResponse,
    type SimulationRunPlanListResponse as SimulationRunPlanListResponse,
    type SimulationRunPlanDeleteResponse as SimulationRunPlanDeleteResponse,
    type SimulationRunPlanGetByIDResponse as SimulationRunPlanGetByIDResponse,
    type SimulationRunPlanCreateParams as SimulationRunPlanCreateParams,
    type SimulationRunPlanUpdateParams as SimulationRunPlanUpdateParams,
    type SimulationRunPlanListParams as SimulationRunPlanListParams,
  };
}
