// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Simulation extends APIResource {
  /**
   * Find a simulation job directly by its ID
   *
   * @example
   * ```ts
   * const response = await client.simulation.getJobById(
   *   '7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f',
   * );
   * ```
   */
  getJobById(jobId: unknown, options?: Core.RequestOptions): Core.APIPromise<SimulationGetJobByIDResponse> {
    return this._client.get(`/v1/simulation/job/${jobId}`, options);
  }

  /**
   * Find the matching simulation job using the number used by the Roark simulation
   * agent.
   *
   * @example
   * ```ts
   * const response = await client.simulation.lookupJob({
   *   roarkPhoneNumber: {},
   * });
   * ```
   */
  lookupJob(
    query: SimulationLookupJobParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SimulationLookupJobResponse> {
    return this._client.get('/v1/simulation/job/lookup', { query, ...options });
  }
}

export interface SimulationGetJobByIDResponse {
  /**
   * Simulation job with related entities
   */
  data: SimulationGetJobByIDResponse.Data;
}

export namespace SimulationGetJobByIDResponse {
  /**
   * Simulation job with related entities
   */
  export interface Data {
    /**
     * Agent endpoint used in the simulation
     */
    agentEndpoint: Data.AgentEndpoint;

    /**
     * When the job was created
     */
    createdAt: string;

    /**
     * Persona used in the simulation
     */
    persona: Data.Persona;

    /**
     * Processing status
     */
    processingStatus: string;

    /**
     * Scenario used in the simulation
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
     * Agent endpoint used in the simulation
     */
    export interface AgentEndpoint {
      /**
       * Agent endpoint ID
       */
      id: string;

      /**
       * Agent endpoint type
       */
      endpointType: string;

      /**
       * Agent endpoint name
       */
      name: string;

      /**
       * Agent endpoint phone number
       */
      phoneNumber: string | null;
    }

    /**
     * Persona used in the simulation
     */
    export interface Persona {
      /**
       * Persona ID
       */
      id: string;

      /**
       * Accent of the persona
       */
      accent: string;

      /**
       * Background noise setting
       */
      backgroundNoise: string;

      /**
       * Base emotion of the persona
       */
      baseEmotion: string;

      /**
       * How the persona confirms information
       */
      confirmationStyle: string;

      /**
       * Whether persona has speech disfluencies
       */
      disfluencies: boolean;

      /**
       * Gender of the persona
       */
      gender: string;

      /**
       * How clearly the persona expresses intent
       */
      intentClarity: string;

      /**
       * Language of the persona
       */
      language: string;

      /**
       * Reliability of persona memory
       */
      memoryReliability: string;

      /**
       * Persona name
       */
      name: string;

      /**
       * Speech clarity
       */
      speechClarity: string;

      /**
       * Speech pace
       */
      speechPace: string;
    }

    /**
     * Scenario used in the simulation
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

export interface SimulationLookupJobResponse {
  /**
   * Simulation job with related entities
   */
  data: SimulationLookupJobResponse.Data;
}

export namespace SimulationLookupJobResponse {
  /**
   * Simulation job with related entities
   */
  export interface Data {
    /**
     * Agent endpoint used in the simulation
     */
    agentEndpoint: Data.AgentEndpoint;

    /**
     * When the job was created
     */
    createdAt: string;

    /**
     * Persona used in the simulation
     */
    persona: Data.Persona;

    /**
     * Processing status
     */
    processingStatus: string;

    /**
     * Scenario used in the simulation
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
     * Agent endpoint used in the simulation
     */
    export interface AgentEndpoint {
      /**
       * Agent endpoint ID
       */
      id: string;

      /**
       * Agent endpoint type
       */
      endpointType: string;

      /**
       * Agent endpoint name
       */
      name: string;

      /**
       * Agent endpoint phone number
       */
      phoneNumber: string | null;
    }

    /**
     * Persona used in the simulation
     */
    export interface Persona {
      /**
       * Persona ID
       */
      id: string;

      /**
       * Accent of the persona
       */
      accent: string;

      /**
       * Background noise setting
       */
      backgroundNoise: string;

      /**
       * Base emotion of the persona
       */
      baseEmotion: string;

      /**
       * How the persona confirms information
       */
      confirmationStyle: string;

      /**
       * Whether persona has speech disfluencies
       */
      disfluencies: boolean;

      /**
       * Gender of the persona
       */
      gender: string;

      /**
       * How clearly the persona expresses intent
       */
      intentClarity: string;

      /**
       * Language of the persona
       */
      language: string;

      /**
       * Reliability of persona memory
       */
      memoryReliability: string;

      /**
       * Persona name
       */
      name: string;

      /**
       * Speech clarity
       */
      speechClarity: string;

      /**
       * Speech pace
       */
      speechPace: string;
    }

    /**
     * Scenario used in the simulation
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

export interface SimulationLookupJobParams {
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
    type SimulationGetJobByIDResponse as SimulationGetJobByIDResponse,
    type SimulationLookupJobResponse as SimulationLookupJobResponse,
    type SimulationLookupJobParams as SimulationLookupJobParams,
  };
}
