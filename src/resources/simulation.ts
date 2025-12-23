// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Simulation extends APIResource {
  /**
   * Retrieve details of a simulation plan job including all associated simulation
   * jobs (calls)
   *
   * @example
   * ```ts
   * const response = await client.simulation.getRunPlanJob(
   *   '7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f',
   * );
   * ```
   */
  getRunPlanJob(
    jobId: unknown,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SimulationGetRunPlanJobResponse> {
    return this._client.get(`/v1/simulation/plan/job/${jobId}`, options);
  }

  /**
   * Get a individual simulation run directly by its ID. This is generally part of a
   * larger simulation run plan job.
   *
   * @example
   * ```ts
   * const response =
   *   await client.simulation.getSimulationJobById(
   *     '7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f',
   *   );
   * ```
   */
  getSimulationJobById(
    jobId: unknown,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SimulationGetSimulationJobByIDResponse> {
    return this._client.get(`/v1/simulation/job/${jobId}`, options);
  }

  /**
   * Find the matching simulation using the number used by the Roark simulation
   * agent.
   *
   * @example
   * ```ts
   * const response =
   *   await client.simulation.lookupSimulationJob({
   *     roarkPhoneNumber: {},
   *   });
   * ```
   */
  lookupSimulationJob(
    query: SimulationLookupSimulationJobParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SimulationLookupSimulationJobResponse> {
    return this._client.get('/v1/simulation/job/lookup', { query, ...options });
  }

  /**
   * Create and execute a job for an existing simulation run plan
   *
   * @example
   * ```ts
   * const response = await client.simulation.startRunPlanJob(
   *   '7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f',
   * );
   * ```
   */
  startRunPlanJob(
    planId: unknown,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SimulationStartRunPlanJobResponse> {
    return this._client.post(`/v1/simulation/plan/${planId}/job`, options);
  }
}

export interface SimulationGetRunPlanJobResponse {
  /**
   * Simulation run plan job with all associated simulation jobs
   */
  data: SimulationGetRunPlanJobResponse.Data;
}

export namespace SimulationGetRunPlanJobResponse {
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
    status: string;

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
      processingStatus: string;

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
      status: string;

      /**
       * When the simulation job completed
       */
      completedAt?: string | null;

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
        type: string;
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
          | 'TH';

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
        language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL' | 'IT' | 'ID' | 'TH';

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

export interface SimulationGetSimulationJobByIDResponse {
  /**
   * Simulation job with related entities
   */
  data: SimulationGetSimulationJobByIDResponse.Data;
}

export namespace SimulationGetSimulationJobByIDResponse {
  /**
   * Simulation job with related entities
   */
  export interface Data {
    /**
     * Agent endpoint used in a simulation
     */
    agentEndpoint: Data.AgentEndpoint;

    /**
     * When the job was created
     */
    createdAt: string;

    persona: Data.Persona;

    /**
     * Processing status
     */
    processingStatus: string;

    /**
     * Scenario used in a simulation
     */
    scenario: Data.Scenario;

    /**
     * Simulation job ID
     */
    simulationJobId: string;

    /**
     * Job status
     */
    status: string;

    /**
     * When the job completed
     */
    completedAt?: string | null;

    /**
     * When the job started
     */
    startedAt?: string | null;
  }

  export namespace Data {
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
      type: string;
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
        | 'TH';

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
      language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL' | 'IT' | 'ID' | 'TH';

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

export interface SimulationLookupSimulationJobResponse {
  /**
   * Simulation job with related entities
   */
  data: SimulationLookupSimulationJobResponse.Data;
}

export namespace SimulationLookupSimulationJobResponse {
  /**
   * Simulation job with related entities
   */
  export interface Data {
    /**
     * Agent endpoint used in a simulation
     */
    agentEndpoint: Data.AgentEndpoint;

    /**
     * When the job was created
     */
    createdAt: string;

    persona: Data.Persona;

    /**
     * Processing status
     */
    processingStatus: string;

    /**
     * Scenario used in a simulation
     */
    scenario: Data.Scenario;

    /**
     * Simulation job ID
     */
    simulationJobId: string;

    /**
     * Job status
     */
    status: string;

    /**
     * When the job completed
     */
    completedAt?: string | null;

    /**
     * When the job started
     */
    startedAt?: string | null;
  }

  export namespace Data {
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
      type: string;
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
        | 'TH';

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
      language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL' | 'IT' | 'ID' | 'TH';

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

export interface SimulationStartRunPlanJobResponse {
  /**
   * Response when triggering a simulation run plan
   */
  data: SimulationStartRunPlanJobResponse.Data;
}

export namespace SimulationStartRunPlanJobResponse {
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
    status: string;
  }
}

export interface SimulationLookupSimulationJobParams {
  /**
   * Phone number provisioned by Roark for the simulation job in E.164 format. In the
   * case of an inbound simulation, this is the number that calls your agent; in the
   * case of an outbound simulation, this is the number you call from your agent.
   */
  roarkPhoneNumber: unknown;

  /**
   * ISO 8601 timestamp of when the call was received. Alternatively, any time
   * between the start and end of the call is valid. Defaults to the current time,
   * which fetches any jobs that are currently ongoing.
   */
  callReceivedAt?: unknown;
}

export declare namespace Simulation {
  export {
    type SimulationGetRunPlanJobResponse as SimulationGetRunPlanJobResponse,
    type SimulationGetSimulationJobByIDResponse as SimulationGetSimulationJobByIDResponse,
    type SimulationLookupSimulationJobResponse as SimulationLookupSimulationJobResponse,
    type SimulationStartRunPlanJobResponse as SimulationStartRunPlanJobResponse,
    type SimulationLookupSimulationJobParams as SimulationLookupSimulationJobParams,
  };
}
