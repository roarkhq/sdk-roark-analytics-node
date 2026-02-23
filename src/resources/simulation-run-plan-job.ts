// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SimulationRunPlanJob extends APIResource {
  /**
   * Returns a paginated list of simulation run plan jobs. Filter by status, plan ID,
   * or label to find specific simulation batches.
   *
   * @example
   * ```ts
   * const simulationRunPlanJobs =
   *   await client.simulationRunPlanJob.list();
   * ```
   */
  list(
    query: SimulationRunPlanJobListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationRunPlanJobListResponse> {
    return this._client.get('/v1/simulation/plan/jobs', { query, ...options });
  }

  /**
   * Retrieve details of a simulation plan job including all associated simulation
   * jobs (calls)
   *
   * @example
   * ```ts
   * const response = await client.simulationRunPlanJob.getByID(
   *   '7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f',
   * );
   * ```
   */
  getByID(jobID: unknown, options?: RequestOptions): APIPromise<SimulationRunPlanJobGetByIDResponse> {
    return this._client.get(path`/v1/simulation/plan/job/${jobID}`, options);
  }

  /**
   * Create and execute a job for an existing simulation run plan. Optionally provide
   * runtime variables to override plan-defined variables.
   *
   * @example
   * ```ts
   * const response = await client.simulationRunPlanJob.start(
   *   '7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f',
   * );
   * ```
   */
  start(
    planID: unknown,
    body: SimulationRunPlanJobStartParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationRunPlanJobStartResponse> {
    return this._client.post(path`/v1/simulation/plan/${planID}/job`, { body, ...options });
  }
}

/**
 * Paginated list of simulation run plan jobs
 */
export interface SimulationRunPlanJobListResponse {
  data: Array<SimulationRunPlanJobListResponse.Data>;

  pagination: SimulationRunPlanJobListResponse.Pagination;
}

export namespace SimulationRunPlanJobListResponse {
  export interface Data {
    /**
     * When the job was created
     */
    createdAt: string;

    /**
     * ID of the simulation run plan
     */
    simulationRunPlanId: string;

    /**
     * ID of the simulation run plan job
     */
    simulationRunPlanJobId: string;

    /**
     * Job status
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
      | 'CANCELLING';

    /**
     * How the job was triggered (SCHEDULED, USER_TRIGGERED_FROM_UI,
     * TRIGGERED_FROM_API, or RE_RUN)
     */
    triggeredBy: 'SCHEDULED' | 'USER_TRIGGERED_FROM_UI' | 'RE_RUN' | 'TRIGGERED_FROM_API';

    /**
     * When the job ended
     */
    endedAt?: string | null;

    /**
     * When the job started
     */
    startedAt?: string | null;
  }

  export interface Pagination {
    /**
     * Whether there are more results available
     */
    hasMore: boolean;

    /**
     * Total number of matching plan jobs
     */
    total: number;

    /**
     * Cursor to use for fetching the next page
     */
    nextCursor?: string | null;
  }
}

export interface SimulationRunPlanJobGetByIDResponse {
  /**
   * Simulation run plan job with all associated simulation jobs
   */
  data: SimulationRunPlanJobGetByIDResponse.Data;
}

export namespace SimulationRunPlanJobGetByIDResponse {
  /**
   * Simulation run plan job with all associated simulation jobs
   */
  export interface Data {
    /**
     * When the job was created
     */
    createdAt: string;

    /**
     * List of simulation jobs (calls) in this run plan job
     */
    simulationJobs: Array<Data.SimulationJob>;

    /**
     * ID of the simulation run plan
     */
    simulationRunPlanId: string;

    /**
     * ID of the simulation run plan job
     */
    simulationRunPlanJobId: string;

    /**
     * Job status
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
      | 'CANCELLING';

    /**
     * When the job ended
     */
    endedAt?: string | null;

    /**
     * When the job started
     */
    startedAt?: string | null;
  }

  export namespace Data {
    export interface SimulationJob {
      /**
       * Agent endpoint used in a simulation
       */
      agentEndpoint: SimulationJob.AgentEndpoint;

      /**
       * When the simulation job was created
       */
      createdAt: string;

      persona: SimulationJob.Persona;

      /**
       * Processing status
       */
      processingStatus:
        | 'CONNECTING'
        | 'WAITING_FOR_OUTBOUND_CALL'
        | 'SIMULATING'
        | 'ANALYZING'
        | 'EVALUATING'
        | 'COMPLETED';

      /**
       * Scenario used in a simulation
       */
      scenario: SimulationJob.Scenario;

      /**
       * Simulation job ID
       */
      simulationJobId: string;

      /**
       * Job status
       */
      status:
        | 'PENDING'
        | 'QUEUED'
        | 'PROCESSING'
        | 'COMPLETED'
        | 'FAILED'
        | 'TIMED_OUT'
        | 'CANCELLED'
        | 'CANCELLING';

      /**
       * ID of the call created for this simulation job. Null if the call has not been
       * created yet.
       */
      callId?: string | null;

      /**
       * When the simulation job completed
       */
      completedAt?: string | null;

      /**
       * Phone number provisioned by Roark for this simulation job in E.164 format. Null
       * if the simulation job is queued and has not been assigned a phone number yet.
       */
      roarkPhoneNumber?: string | null;

      /**
       * When the simulation job started
       */
      startedAt?: string | null;
    }

    export namespace SimulationJob {
      /**
       * Agent endpoint used in a simulation
       */
      export interface AgentEndpoint {
        /**
         * Agent endpoint ID
         */
        id: string;

        /**
         * Agent endpoint name
         */
        name: string;

        /**
         * Agent endpoint phone number
         */
        phoneNumber: string | null;

        /**
         * Agent endpoint type
         */
        type: 'PHONE' | 'WEBSOCKET';
      }

      export interface Persona {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP';

        /**
         * Background noise setting
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
         * Base emotional state of the persona
         */
        baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE' | 'NEUTRAL';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL' | 'IT' | 'ID' | 'TH' | 'JA';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SLOW' | 'NORMAL' | 'FAST';

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }

      /**
       * Scenario used in a simulation
       */
      export interface Scenario {
        /**
         * Scenario ID
         */
        id: string;

        /**
         * Scenario description
         */
        description?: string | null;
      }
    }
  }
}

export interface SimulationRunPlanJobStartResponse {
  /**
   * Response when triggering a simulation run plan
   */
  data: SimulationRunPlanJobStartResponse.Data;
}

export namespace SimulationRunPlanJobStartResponse {
  /**
   * Response when triggering a simulation run plan
   */
  export interface Data {
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
      | 'CANCELLING';
  }
}

export interface SimulationRunPlanJobListParams {
  /**
   * Cursor for pagination - use the nextCursor value from a previous response
   */
  after?: string;

  /**
   * Filter by label ID attached to the plan job. Use this if you know the label ID.
   */
  labelId?: string;

  /**
   * Filter by label name attached to the plan job. More user-friendly alternative to
   * labelId. Case-insensitive.
   */
  labelName?: string;

  /**
   * Maximum number of plan jobs to return (default: 20, max: 50)
   */
  limit?: number;

  /**
   * Filter by simulation run plan ID
   */
  simulationRunPlanId?: string;

  /**
   * Filter by plan job status (PENDING, CREATING_SNAPSHOTS, CREATING_SIMULATIONS,
   * RUNNING_SIMULATIONS, COMPLETED, FAILED, TIMED_OUT, CANCELLED, CANCELLING)
   */
  status?:
    | 'PENDING'
    | 'QUEUED'
    | 'CREATING_SNAPSHOTS'
    | 'CREATING_SIMULATIONS'
    | 'RUNNING_SIMULATIONS'
    | 'COMPLETED'
    | 'FAILED'
    | 'TIMED_OUT'
    | 'CANCELLED'
    | 'CANCELLING';
}

export interface SimulationRunPlanJobStartParams {
  /**
   * Runtime variables that override plan-defined scenario variables. Accepts one of
   * two formats:
   *
   * Option 1 — Global (flat key-value object, applies to ALL scenarios): {
   * "orderNumber": "12345", "environment": "staging" }
   *
   * Option 2 — Per-scenario (array of objects with scenarioId + variables): [ {
   * "scenarioId": "550e8400-...", "variables": { "orderNumber": "12345" } }, {
   * "scenarioId": "7a3d2e1f-...", "variables": { "orderNumber": "67890" } } ]
   */
  variables?: { [key: string]: string } | Array<SimulationRunPlanJobStartParams.UnionMember1>;
}

export namespace SimulationRunPlanJobStartParams {
  export interface UnionMember1 {
    /**
     * ID of the scenario to apply variables to
     */
    scenarioId: string;

    /**
     * Key-value pairs for this scenario
     */
    variables: { [key: string]: string };
  }
}

export declare namespace SimulationRunPlanJob {
  export {
    type SimulationRunPlanJobListResponse as SimulationRunPlanJobListResponse,
    type SimulationRunPlanJobGetByIDResponse as SimulationRunPlanJobGetByIDResponse,
    type SimulationRunPlanJobStartResponse as SimulationRunPlanJobStartResponse,
    type SimulationRunPlanJobListParams as SimulationRunPlanJobListParams,
    type SimulationRunPlanJobStartParams as SimulationRunPlanJobStartParams,
  };
}
