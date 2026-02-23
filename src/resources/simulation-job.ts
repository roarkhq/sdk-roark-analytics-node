// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SimulationJob extends APIResource {
  /**
   * Get a individual simulation run directly by its ID. This is generally part of a
   * larger simulation run plan job.
   *
   * @example
   * ```ts
   * const response = await client.simulationJob.getByID(
   *   '7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f',
   * );
   * ```
   */
  getByID(jobID: unknown, options?: RequestOptions): APIPromise<SimulationJobGetByIDResponse> {
    return this._client.get(path`/v1/simulation/job/${jobID}`, options);
  }

  /**
   * Find the matching simulation using the number used by the Roark simulation
   * agent.
   *
   * @example
   * ```ts
   * const response = await client.simulationJob.lookup({
   *   roarkPhoneNumber: {},
   * });
   * ```
   */
  lookup(
    query: SimulationJobLookupParams,
    options?: RequestOptions,
  ): APIPromise<SimulationJobLookupResponse> {
    return this._client.get('/v1/simulation/job/lookup', { query, ...options });
  }
}

export interface SimulationJobGetByIDResponse {
  /**
   * Simulation job with related entities
   */
  data: SimulationJobGetByIDResponse.Data;
}

export namespace SimulationJobGetByIDResponse {
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
     * ID of the call created for this simulation job. Null if the call has not been
     * created yet.
     */
    callId?: string | null;

    /**
     * When the job completed
     */
    completedAt?: string | null;

    /**
     * Phone number provisioned by Roark for this simulation job in E.164 format. Null
     * if the simulation job is queued and has not been assigned a phone number yet.
     */
    roarkPhoneNumber?: string | null;

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
       * Controls how quickly the persona responds to pauses in conversation (QUICK,
       * NORMAL, RELAXED)
       */
      responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

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

export interface SimulationJobLookupResponse {
  /**
   * Simulation job with related entities
   */
  data: SimulationJobLookupResponse.Data;
}

export namespace SimulationJobLookupResponse {
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
     * ID of the call created for this simulation job. Null if the call has not been
     * created yet.
     */
    callId?: string | null;

    /**
     * When the job completed
     */
    completedAt?: string | null;

    /**
     * Phone number provisioned by Roark for this simulation job in E.164 format. Null
     * if the simulation job is queued and has not been assigned a phone number yet.
     */
    roarkPhoneNumber?: string | null;

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
       * Controls how quickly the persona responds to pauses in conversation (QUICK,
       * NORMAL, RELAXED)
       */
      responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

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

export interface SimulationJobLookupParams {
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

export declare namespace SimulationJob {
  export {
    type SimulationJobGetByIDResponse as SimulationJobGetByIDResponse,
    type SimulationJobLookupResponse as SimulationJobLookupResponse,
    type SimulationJobLookupParams as SimulationJobLookupParams,
  };
}
