// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Simulation extends APIResource {
  /**
   * Find a simulation job by looking up the active lease for the given phone numbers
   */
  getJob(
    query: SimulationGetJobParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SimulationGetJobResponse> {
    return this._client.get('/v1/simulation/job', { query, ...options });
  }

  /**
   * Find a simulation job directly by its ID
   */
  getJobById(jobId: unknown, options?: Core.RequestOptions): Core.APIPromise<SimulationGetJobByIDResponse> {
    return this._client.get(`/v1/simulation/jobs/${jobId}`, options);
  }
}

export interface SimulationGetJobResponse {
  /**
   * Simulation job with related entities
   */
  data: SimulationGetJobResponse.Data;
}

export namespace SimulationGetJobResponse {
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

export interface SimulationGetJobParams {
  /**
   * Customer phone number in E.164 format
   */
  phoneNumber: unknown;

  /**
   * Roark-assigned phone number in E.164 format
   */
  roarkPhoneNumber: unknown;

  /**
   * ISO 8601 timestamp to check for active lease (defaults to current time)
   */
  timestamp?: unknown;
}

export declare namespace Simulation {
  export {
    type SimulationGetJobResponse as SimulationGetJobResponse,
    type SimulationGetJobByIDResponse as SimulationGetJobByIDResponse,
    type SimulationGetJobParams as SimulationGetJobParams,
  };
}
