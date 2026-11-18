// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Simulation extends APIResource {
  /**
   * Answers the question a simulation resource generation is waiting on (status
   * NEEDS_INPUT). If nobody answers within 15 minutes, it goes ahead with its
   * default.
   *
   * @example
   * ```ts
   * const response =
   *   await client.simulation.answerResourceGeneration(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { text: 'x' },
   *   );
   * ```
   */
  answerResourceGeneration(
    generationID: string,
    body: SimulationAnswerResourceGenerationParams,
    options?: RequestOptions,
  ): APIPromise<SimulationAnswerResourceGenerationResponse> {
    return this._client.post(path`/v1/simulation/generations/resources/${generationID}/answer`, {
      body,
      ...options,
    });
  }

  /**
   * Stops a running simulation resource generation. Flows and metrics it already
   * created are kept; no run plan is made. Refused once the generation has finished.
   *
   * @example
   * ```ts
   * const response =
   *   await client.simulation.cancelResourceGeneration(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  cancelResourceGeneration(
    generationID: string,
    options?: RequestOptions,
  ): APIPromise<SimulationCancelResourceGenerationResponse> {
    return this._client.post(path`/v1/simulation/generations/resources/${generationID}/cancel`, options);
  }

  /**
   * Works out what to test for an existing agent, then creates the customer flows,
   * metrics and checks to simulate it, and a run plan that runs them. It does not
   * create or change the agent. It also reads the agent's recent production calls
   * and open issues. Run it again and it builds on what earlier generations made,
   * adding only what changed; when nothing has, it finishes straight away and says
   * so. Runs in the background: watch the `simulation.resource_generation.completed`
   * webhook, or poll `GET /v1/simulation/generations/resources/{generationId}`.
   * Takes one agent for now. Refused while another generation for the agent is
   * running. Needs the 'simulation:create' and 'metric:create' permissions.
   * Exploration also needs 'simulation:run', and is turned off for keys without it
   * unless explore.enabled is set.
   *
   * @example
   * ```ts
   * const response = await client.simulation.generateResources({
   *   agentIds: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
   * });
   * ```
   */
  generateResources(
    body: SimulationGenerateResourcesParams,
    options?: RequestOptions,
  ): APIPromise<SimulationGenerateResourcesResponse> {
    return this._client.post('/v1/simulation/generations/resources', { body, ...options });
  }

  /**
   * Returns one simulation resource generation, for example the one a webhook named.
   *
   * @example
   * ```ts
   * const response =
   *   await client.simulation.getResourceGeneration(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  getResourceGeneration(
    generationID: string,
    options?: RequestOptions,
  ): APIPromise<SimulationGetResourceGenerationResponse> {
    return this._client.get(path`/v1/simulation/generations/resources/${generationID}`, options);
  }

  /**
   * Tells a running simulation resource generation what to focus on or avoid, in
   * your own words. It reads it on its next turn and it outranks its own plan.
   * Refused once the generation has finished.
   *
   * @example
   * ```ts
   * const response =
   *   await client.simulation.guideResourceGeneration(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { text: 'x' },
   *   );
   * ```
   */
  guideResourceGeneration(
    generationID: string,
    body: SimulationGuideResourceGenerationParams,
    options?: RequestOptions,
  ): APIPromise<SimulationGuideResourceGenerationResponse> {
    return this._client.post(path`/v1/simulation/generations/resources/${generationID}/guidance`, {
      body,
      ...options,
    });
  }

  /**
   * Returns the project's simulation resource generations, newest first, optionally
   * only for some agents: each one's progress, the run plan it created, and every
   * flow, metric and check it added or left out, with the reason and the source it
   * came from.
   *
   * @example
   * ```ts
   * const response =
   *   await client.simulation.listResourceGenerations();
   * ```
   */
  listResourceGenerations(
    query: SimulationListResourceGenerationsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationListResourceGenerationsResponse> {
    return this._client.get('/v1/simulation/generations/resources', { query, ...options });
  }

  /**
   * The server half of the tool guard for code-first agents. When a guarded tool
   * fires during a Roark test call, send the invocation here instead of executing
   * it: Roark answers with a simulated backend response that is valid JSON, shaped
   * by the tool contract you pass, consistent with the test scenario, and consistent
   * with earlier mocked responses in the same call. Real callers are never affected:
   * the guard only diverts when the agent-config resolve response identified the
   * session as a Roark simulation, and this endpoint independently re-validates the
   * simulation before answering.
   *
   * Failure contract for your wrapper: `404` means the simulation id is unknown to
   * this project (treat the session as real). `409` means the simulation has already
   * ended (stale session state: do NOT execute the real tool; return your static
   * fallback). `5xx` means generation failed (return your static fallback).
   *
   * Identical retries (same tool, same arguments) within a few minutes return the
   * stored response, so double-fired handlers stay consistent.
   *
   * @example
   * ```ts
   * const response = await client.simulation.mockTool({
   *   simulationJobId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   toolName: 'book_appointment',
   * });
   * ```
   */
  mockTool(body: SimulationMockToolParams, options?: RequestOptions): APIPromise<SimulationMockToolResponse> {
    return this._client.post('/v1/simulation/tool-mock', { body, ...options });
  }

  /**
   * Starts a simulation and returns the run.
   *
   * Send `template` to run one of the built-in templates: it supplies the metrics
   * and checks, and for some templates the flows too, so the request only names the
   * agent and the direction. Send `plan` to describe a simulation yourself and run
   * it once. Send `planId` to run a plan you already have.
   *
   * `template` and `plan` both resolve to a run plan, returned as
   * `simulationRunPlanId`. Add `saveAsPlan` to keep it, or read it back to see
   * exactly what ran. A plan built from a template is a snapshot: retuning the
   * template later never changes what that plan runs, which is what makes a saved
   * one safe to pin in CI.
   *
   * @example
   * ```ts
   * const response = await client.simulation.run({
   *   plan: {
   *     agentEndpoints: [
   *       { id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   *     ],
   *     direction: 'INBOUND',
   *     maxSimulationDurationSeconds: 300,
   *   },
   * });
   * ```
   */
  run(body: SimulationRunParams, options?: RequestOptions): APIPromise<SimulationRunResponse> {
    return this._client.post('/v1/simulation/run', { body, ...options });
  }
}

export interface SimulationAnswerResourceGenerationResponse {
  /**
   * The simulation resources Roark generated for agents: the flows, metrics, checks
   * and run plan, and why
   */
  data: SimulationAnswerResourceGenerationResponse.Data;
}

export namespace SimulationAnswerResourceGenerationResponse {
  /**
   * The simulation resources Roark generated for agents: the flows, metrics, checks
   * and run plan, and why
   */
  export interface Data {
    /**
     * Simulation resource generation ID
     */
    id: string;

    /**
     * What the generation did and said, in order
     */
    activity: Array<Data.Activity>;

    /**
     * The agents the inputs were generated for
     */
    agentIds: Array<string>;

    capabilities: Array<
      | 'APPOINTMENT_BOOKING'
      | 'FAQ'
      | 'IDENTITY_VERIFICATION'
      | 'ACCOUNT_MANAGEMENT'
      | 'BILLING_AND_PAYMENTS'
      | 'ORDER_MANAGEMENT'
      | 'TROUBLESHOOTING'
      | 'CALL_ROUTING'
      | 'LEAD_QUALIFICATION'
      | 'COLLECTIONS'
      | 'OUTBOUND_CALLING'
    >;

    completedAt: string | null;

    createdAt: string;

    errorMessage: string | null;

    explore: Data.Explore;

    industry:
      | 'HEALTHCARE'
      | 'FINANCIAL_SERVICES'
      | 'INSURANCE'
      | 'DEBT_COLLECTION'
      | 'RETAIL'
      | 'TRAVEL_AND_HOSPITALITY'
      | 'TELECOMMUNICATIONS'
      | 'TECHNOLOGY'
      | 'PUBLIC_SECTOR'
      | 'UTILITIES'
      | 'LOGISTICS'
      | 'AUTOMOTIVE'
      | 'HOME_SERVICES'
      | 'RESTAURANTS'
      | 'EDUCATION'
      | 'OTHER'
      | null;

    items: Array<Data.Item>;

    /**
     * The checklist the generation works through
     */
    layers: Array<Data.Layer>;

    /**
     * The question the generation is waiting on, while NEEDS_INPUT
     */
    question: Data.Question | null;

    /**
     * The run plan to start once the generation completes
     */
    runPlanId: string | null;

    /**
     * PENDING, RUNNING, NEEDS_INPUT (waiting on a question; it goes ahead with the
     * default if nobody answers), COMPLETED, FAILED or CANCELLED
     */
    status: 'PENDING' | 'RUNNING' | 'NEEDS_INPUT' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

    /**
     * Test data the agent asked for that Roark did not have
     */
    testDataNeeded: Array<Data.TestDataNeeded>;
  }

  export namespace Data {
    /**
     * One thing the generation did or said, in order
     */
    export interface Activity {
      createdAt: string;

      /**
       * STATUS, REASONING, ACTION, GUIDANCE, QUESTION, ANSWER, EXPLORATION or ERROR
       */
      kind: 'STATUS' | 'REASONING' | 'ACTION' | 'GUIDANCE' | 'QUESTION' | 'ANSWER' | 'EXPLORATION' | 'ERROR';

      text: string;
    }

    export interface Explore {
      conversationsUsed: number;

      enabled: boolean;

      maxConversationMinutes: number;

      maxConversations: number;
    }

    /**
     * Something the generation created or chose to leave out, and why
     */
    export interface Item {
      id: string;

      /**
       * CREATED, or SKIPPED with the reason
       */
      action: 'CREATED' | 'SKIPPED';

      capability:
        | 'APPOINTMENT_BOOKING'
        | 'FAQ'
        | 'IDENTITY_VERIFICATION'
        | 'ACCOUNT_MANAGEMENT'
        | 'BILLING_AND_PAYMENTS'
        | 'ORDER_MANAGEMENT'
        | 'TROUBLESHOOTING'
        | 'CALL_ROUTING'
        | 'LEAD_QUALIFICATION'
        | 'COLLECTIONS'
        | 'OUTBOUND_CALLING'
        | null;

      /**
       * A flow, a metric, or a pass or fail check
       */
      kind: 'FLOW' | 'METRIC' | 'CHECK' | 'LAYER';

      label: string;

      /**
       * Why it exists: CORE (every agent), INDUSTRY, CAPABILITY, AGENT_CONTEXT (your
       * prompt or website), EXPLORATION or CUSTOMER_INSTRUCTIONS
       */
      layer:
        | 'CORE'
        | 'INDUSTRY'
        | 'CAPABILITY'
        | 'AGENT_CONTEXT'
        | 'EXPLORATION'
        | 'CUSTOMER_INSTRUCTIONS'
        | 'PRODUCTION_CALLS';

      /**
       * Exploration only: DISCOVERED on a call, or INFERRED from a path the agent
       * offered
       */
      origin: 'DISCOVERED' | 'INFERRED' | null;

      reason: string;

      /**
       * The flow or metric it created
       */
      resourceId: string | null;

      source: Item.Source;
    }

    export namespace Item {
      export interface Source {
        /**
         * The call it came from: an exploration call Roark placed, or one of the agent’s
         * production calls
         */
        callId: string | null;

        /**
         * Where in the call
         */
        offsetMs: number | null;

        /**
         * The words in the source that led to it
         */
        quote: string | null;

        type:
          | 'CATALOGUE'
          | 'PROMPT'
          | 'DESCRIPTION'
          | 'WEBSITE'
          | 'EXPLORATION_CALL'
          | 'INSTRUCTIONS'
          | 'PRODUCTION_CALL';

        /**
         * The page it came from, for website sources
         */
        url: string | null;
      }
    }

    /**
     * Where one part of testing the agent stands
     */
    export interface Layer {
      layer:
        | 'CORE'
        | 'INDUSTRY'
        | 'CAPABILITY'
        | 'AGENT_CONTEXT'
        | 'EXPLORATION'
        | 'CUSTOMER_INSTRUCTIONS'
        | 'PRODUCTION_CALLS';

      /**
       * COVERED: tests exist for it, or are added when the generation finishes. SKIPPED:
       * the generation could not test it and said why. OPEN: not covered yet; the
       * generation does not finish while a layer is open. NOT_APPLICABLE: nothing to
       * test it from.
       */
      status: 'COVERED' | 'SKIPPED' | 'OPEN' | 'NOT_APPLICABLE';

      summary: string;
    }

    /**
     * The question the generation is waiting on, while NEEDS_INPUT
     */
    export interface Question {
      defaultOption: string;

      options: Array<string>;

      question: string;
    }

    export interface TestDataNeeded {
      callId: string | null;

      label: string;

      reason: string;
    }
  }
}

export interface SimulationCancelResourceGenerationResponse {
  /**
   * The simulation resources Roark generated for agents: the flows, metrics, checks
   * and run plan, and why
   */
  data: SimulationCancelResourceGenerationResponse.Data;
}

export namespace SimulationCancelResourceGenerationResponse {
  /**
   * The simulation resources Roark generated for agents: the flows, metrics, checks
   * and run plan, and why
   */
  export interface Data {
    /**
     * Simulation resource generation ID
     */
    id: string;

    /**
     * What the generation did and said, in order
     */
    activity: Array<Data.Activity>;

    /**
     * The agents the inputs were generated for
     */
    agentIds: Array<string>;

    capabilities: Array<
      | 'APPOINTMENT_BOOKING'
      | 'FAQ'
      | 'IDENTITY_VERIFICATION'
      | 'ACCOUNT_MANAGEMENT'
      | 'BILLING_AND_PAYMENTS'
      | 'ORDER_MANAGEMENT'
      | 'TROUBLESHOOTING'
      | 'CALL_ROUTING'
      | 'LEAD_QUALIFICATION'
      | 'COLLECTIONS'
      | 'OUTBOUND_CALLING'
    >;

    completedAt: string | null;

    createdAt: string;

    errorMessage: string | null;

    explore: Data.Explore;

    industry:
      | 'HEALTHCARE'
      | 'FINANCIAL_SERVICES'
      | 'INSURANCE'
      | 'DEBT_COLLECTION'
      | 'RETAIL'
      | 'TRAVEL_AND_HOSPITALITY'
      | 'TELECOMMUNICATIONS'
      | 'TECHNOLOGY'
      | 'PUBLIC_SECTOR'
      | 'UTILITIES'
      | 'LOGISTICS'
      | 'AUTOMOTIVE'
      | 'HOME_SERVICES'
      | 'RESTAURANTS'
      | 'EDUCATION'
      | 'OTHER'
      | null;

    items: Array<Data.Item>;

    /**
     * The checklist the generation works through
     */
    layers: Array<Data.Layer>;

    /**
     * The question the generation is waiting on, while NEEDS_INPUT
     */
    question: Data.Question | null;

    /**
     * The run plan to start once the generation completes
     */
    runPlanId: string | null;

    /**
     * PENDING, RUNNING, NEEDS_INPUT (waiting on a question; it goes ahead with the
     * default if nobody answers), COMPLETED, FAILED or CANCELLED
     */
    status: 'PENDING' | 'RUNNING' | 'NEEDS_INPUT' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

    /**
     * Test data the agent asked for that Roark did not have
     */
    testDataNeeded: Array<Data.TestDataNeeded>;
  }

  export namespace Data {
    /**
     * One thing the generation did or said, in order
     */
    export interface Activity {
      createdAt: string;

      /**
       * STATUS, REASONING, ACTION, GUIDANCE, QUESTION, ANSWER, EXPLORATION or ERROR
       */
      kind: 'STATUS' | 'REASONING' | 'ACTION' | 'GUIDANCE' | 'QUESTION' | 'ANSWER' | 'EXPLORATION' | 'ERROR';

      text: string;
    }

    export interface Explore {
      conversationsUsed: number;

      enabled: boolean;

      maxConversationMinutes: number;

      maxConversations: number;
    }

    /**
     * Something the generation created or chose to leave out, and why
     */
    export interface Item {
      id: string;

      /**
       * CREATED, or SKIPPED with the reason
       */
      action: 'CREATED' | 'SKIPPED';

      capability:
        | 'APPOINTMENT_BOOKING'
        | 'FAQ'
        | 'IDENTITY_VERIFICATION'
        | 'ACCOUNT_MANAGEMENT'
        | 'BILLING_AND_PAYMENTS'
        | 'ORDER_MANAGEMENT'
        | 'TROUBLESHOOTING'
        | 'CALL_ROUTING'
        | 'LEAD_QUALIFICATION'
        | 'COLLECTIONS'
        | 'OUTBOUND_CALLING'
        | null;

      /**
       * A flow, a metric, or a pass or fail check
       */
      kind: 'FLOW' | 'METRIC' | 'CHECK' | 'LAYER';

      label: string;

      /**
       * Why it exists: CORE (every agent), INDUSTRY, CAPABILITY, AGENT_CONTEXT (your
       * prompt or website), EXPLORATION or CUSTOMER_INSTRUCTIONS
       */
      layer:
        | 'CORE'
        | 'INDUSTRY'
        | 'CAPABILITY'
        | 'AGENT_CONTEXT'
        | 'EXPLORATION'
        | 'CUSTOMER_INSTRUCTIONS'
        | 'PRODUCTION_CALLS';

      /**
       * Exploration only: DISCOVERED on a call, or INFERRED from a path the agent
       * offered
       */
      origin: 'DISCOVERED' | 'INFERRED' | null;

      reason: string;

      /**
       * The flow or metric it created
       */
      resourceId: string | null;

      source: Item.Source;
    }

    export namespace Item {
      export interface Source {
        /**
         * The call it came from: an exploration call Roark placed, or one of the agent’s
         * production calls
         */
        callId: string | null;

        /**
         * Where in the call
         */
        offsetMs: number | null;

        /**
         * The words in the source that led to it
         */
        quote: string | null;

        type:
          | 'CATALOGUE'
          | 'PROMPT'
          | 'DESCRIPTION'
          | 'WEBSITE'
          | 'EXPLORATION_CALL'
          | 'INSTRUCTIONS'
          | 'PRODUCTION_CALL';

        /**
         * The page it came from, for website sources
         */
        url: string | null;
      }
    }

    /**
     * Where one part of testing the agent stands
     */
    export interface Layer {
      layer:
        | 'CORE'
        | 'INDUSTRY'
        | 'CAPABILITY'
        | 'AGENT_CONTEXT'
        | 'EXPLORATION'
        | 'CUSTOMER_INSTRUCTIONS'
        | 'PRODUCTION_CALLS';

      /**
       * COVERED: tests exist for it, or are added when the generation finishes. SKIPPED:
       * the generation could not test it and said why. OPEN: not covered yet; the
       * generation does not finish while a layer is open. NOT_APPLICABLE: nothing to
       * test it from.
       */
      status: 'COVERED' | 'SKIPPED' | 'OPEN' | 'NOT_APPLICABLE';

      summary: string;
    }

    /**
     * The question the generation is waiting on, while NEEDS_INPUT
     */
    export interface Question {
      defaultOption: string;

      options: Array<string>;

      question: string;
    }

    export interface TestDataNeeded {
      callId: string | null;

      label: string;

      reason: string;
    }
  }
}

export interface SimulationGenerateResourcesResponse {
  /**
   * The simulation resources Roark generated for agents: the flows, metrics, checks
   * and run plan, and why
   */
  data: SimulationGenerateResourcesResponse.Data;
}

export namespace SimulationGenerateResourcesResponse {
  /**
   * The simulation resources Roark generated for agents: the flows, metrics, checks
   * and run plan, and why
   */
  export interface Data {
    /**
     * Simulation resource generation ID
     */
    id: string;

    /**
     * What the generation did and said, in order
     */
    activity: Array<Data.Activity>;

    /**
     * The agents the inputs were generated for
     */
    agentIds: Array<string>;

    capabilities: Array<
      | 'APPOINTMENT_BOOKING'
      | 'FAQ'
      | 'IDENTITY_VERIFICATION'
      | 'ACCOUNT_MANAGEMENT'
      | 'BILLING_AND_PAYMENTS'
      | 'ORDER_MANAGEMENT'
      | 'TROUBLESHOOTING'
      | 'CALL_ROUTING'
      | 'LEAD_QUALIFICATION'
      | 'COLLECTIONS'
      | 'OUTBOUND_CALLING'
    >;

    completedAt: string | null;

    createdAt: string;

    errorMessage: string | null;

    explore: Data.Explore;

    industry:
      | 'HEALTHCARE'
      | 'FINANCIAL_SERVICES'
      | 'INSURANCE'
      | 'DEBT_COLLECTION'
      | 'RETAIL'
      | 'TRAVEL_AND_HOSPITALITY'
      | 'TELECOMMUNICATIONS'
      | 'TECHNOLOGY'
      | 'PUBLIC_SECTOR'
      | 'UTILITIES'
      | 'LOGISTICS'
      | 'AUTOMOTIVE'
      | 'HOME_SERVICES'
      | 'RESTAURANTS'
      | 'EDUCATION'
      | 'OTHER'
      | null;

    items: Array<Data.Item>;

    /**
     * The checklist the generation works through
     */
    layers: Array<Data.Layer>;

    /**
     * The question the generation is waiting on, while NEEDS_INPUT
     */
    question: Data.Question | null;

    /**
     * The run plan to start once the generation completes
     */
    runPlanId: string | null;

    /**
     * PENDING, RUNNING, NEEDS_INPUT (waiting on a question; it goes ahead with the
     * default if nobody answers), COMPLETED, FAILED or CANCELLED
     */
    status: 'PENDING' | 'RUNNING' | 'NEEDS_INPUT' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

    /**
     * Test data the agent asked for that Roark did not have
     */
    testDataNeeded: Array<Data.TestDataNeeded>;
  }

  export namespace Data {
    /**
     * One thing the generation did or said, in order
     */
    export interface Activity {
      createdAt: string;

      /**
       * STATUS, REASONING, ACTION, GUIDANCE, QUESTION, ANSWER, EXPLORATION or ERROR
       */
      kind: 'STATUS' | 'REASONING' | 'ACTION' | 'GUIDANCE' | 'QUESTION' | 'ANSWER' | 'EXPLORATION' | 'ERROR';

      text: string;
    }

    export interface Explore {
      conversationsUsed: number;

      enabled: boolean;

      maxConversationMinutes: number;

      maxConversations: number;
    }

    /**
     * Something the generation created or chose to leave out, and why
     */
    export interface Item {
      id: string;

      /**
       * CREATED, or SKIPPED with the reason
       */
      action: 'CREATED' | 'SKIPPED';

      capability:
        | 'APPOINTMENT_BOOKING'
        | 'FAQ'
        | 'IDENTITY_VERIFICATION'
        | 'ACCOUNT_MANAGEMENT'
        | 'BILLING_AND_PAYMENTS'
        | 'ORDER_MANAGEMENT'
        | 'TROUBLESHOOTING'
        | 'CALL_ROUTING'
        | 'LEAD_QUALIFICATION'
        | 'COLLECTIONS'
        | 'OUTBOUND_CALLING'
        | null;

      /**
       * A flow, a metric, or a pass or fail check
       */
      kind: 'FLOW' | 'METRIC' | 'CHECK' | 'LAYER';

      label: string;

      /**
       * Why it exists: CORE (every agent), INDUSTRY, CAPABILITY, AGENT_CONTEXT (your
       * prompt or website), EXPLORATION or CUSTOMER_INSTRUCTIONS
       */
      layer:
        | 'CORE'
        | 'INDUSTRY'
        | 'CAPABILITY'
        | 'AGENT_CONTEXT'
        | 'EXPLORATION'
        | 'CUSTOMER_INSTRUCTIONS'
        | 'PRODUCTION_CALLS';

      /**
       * Exploration only: DISCOVERED on a call, or INFERRED from a path the agent
       * offered
       */
      origin: 'DISCOVERED' | 'INFERRED' | null;

      reason: string;

      /**
       * The flow or metric it created
       */
      resourceId: string | null;

      source: Item.Source;
    }

    export namespace Item {
      export interface Source {
        /**
         * The call it came from: an exploration call Roark placed, or one of the agent’s
         * production calls
         */
        callId: string | null;

        /**
         * Where in the call
         */
        offsetMs: number | null;

        /**
         * The words in the source that led to it
         */
        quote: string | null;

        type:
          | 'CATALOGUE'
          | 'PROMPT'
          | 'DESCRIPTION'
          | 'WEBSITE'
          | 'EXPLORATION_CALL'
          | 'INSTRUCTIONS'
          | 'PRODUCTION_CALL';

        /**
         * The page it came from, for website sources
         */
        url: string | null;
      }
    }

    /**
     * Where one part of testing the agent stands
     */
    export interface Layer {
      layer:
        | 'CORE'
        | 'INDUSTRY'
        | 'CAPABILITY'
        | 'AGENT_CONTEXT'
        | 'EXPLORATION'
        | 'CUSTOMER_INSTRUCTIONS'
        | 'PRODUCTION_CALLS';

      /**
       * COVERED: tests exist for it, or are added when the generation finishes. SKIPPED:
       * the generation could not test it and said why. OPEN: not covered yet; the
       * generation does not finish while a layer is open. NOT_APPLICABLE: nothing to
       * test it from.
       */
      status: 'COVERED' | 'SKIPPED' | 'OPEN' | 'NOT_APPLICABLE';

      summary: string;
    }

    /**
     * The question the generation is waiting on, while NEEDS_INPUT
     */
    export interface Question {
      defaultOption: string;

      options: Array<string>;

      question: string;
    }

    export interface TestDataNeeded {
      callId: string | null;

      label: string;

      reason: string;
    }
  }
}

export interface SimulationGetResourceGenerationResponse {
  /**
   * The simulation resources Roark generated for agents: the flows, metrics, checks
   * and run plan, and why
   */
  data: SimulationGetResourceGenerationResponse.Data;
}

export namespace SimulationGetResourceGenerationResponse {
  /**
   * The simulation resources Roark generated for agents: the flows, metrics, checks
   * and run plan, and why
   */
  export interface Data {
    /**
     * Simulation resource generation ID
     */
    id: string;

    /**
     * What the generation did and said, in order
     */
    activity: Array<Data.Activity>;

    /**
     * The agents the inputs were generated for
     */
    agentIds: Array<string>;

    capabilities: Array<
      | 'APPOINTMENT_BOOKING'
      | 'FAQ'
      | 'IDENTITY_VERIFICATION'
      | 'ACCOUNT_MANAGEMENT'
      | 'BILLING_AND_PAYMENTS'
      | 'ORDER_MANAGEMENT'
      | 'TROUBLESHOOTING'
      | 'CALL_ROUTING'
      | 'LEAD_QUALIFICATION'
      | 'COLLECTIONS'
      | 'OUTBOUND_CALLING'
    >;

    completedAt: string | null;

    createdAt: string;

    errorMessage: string | null;

    explore: Data.Explore;

    industry:
      | 'HEALTHCARE'
      | 'FINANCIAL_SERVICES'
      | 'INSURANCE'
      | 'DEBT_COLLECTION'
      | 'RETAIL'
      | 'TRAVEL_AND_HOSPITALITY'
      | 'TELECOMMUNICATIONS'
      | 'TECHNOLOGY'
      | 'PUBLIC_SECTOR'
      | 'UTILITIES'
      | 'LOGISTICS'
      | 'AUTOMOTIVE'
      | 'HOME_SERVICES'
      | 'RESTAURANTS'
      | 'EDUCATION'
      | 'OTHER'
      | null;

    items: Array<Data.Item>;

    /**
     * The checklist the generation works through
     */
    layers: Array<Data.Layer>;

    /**
     * The question the generation is waiting on, while NEEDS_INPUT
     */
    question: Data.Question | null;

    /**
     * The run plan to start once the generation completes
     */
    runPlanId: string | null;

    /**
     * PENDING, RUNNING, NEEDS_INPUT (waiting on a question; it goes ahead with the
     * default if nobody answers), COMPLETED, FAILED or CANCELLED
     */
    status: 'PENDING' | 'RUNNING' | 'NEEDS_INPUT' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

    /**
     * Test data the agent asked for that Roark did not have
     */
    testDataNeeded: Array<Data.TestDataNeeded>;
  }

  export namespace Data {
    /**
     * One thing the generation did or said, in order
     */
    export interface Activity {
      createdAt: string;

      /**
       * STATUS, REASONING, ACTION, GUIDANCE, QUESTION, ANSWER, EXPLORATION or ERROR
       */
      kind: 'STATUS' | 'REASONING' | 'ACTION' | 'GUIDANCE' | 'QUESTION' | 'ANSWER' | 'EXPLORATION' | 'ERROR';

      text: string;
    }

    export interface Explore {
      conversationsUsed: number;

      enabled: boolean;

      maxConversationMinutes: number;

      maxConversations: number;
    }

    /**
     * Something the generation created or chose to leave out, and why
     */
    export interface Item {
      id: string;

      /**
       * CREATED, or SKIPPED with the reason
       */
      action: 'CREATED' | 'SKIPPED';

      capability:
        | 'APPOINTMENT_BOOKING'
        | 'FAQ'
        | 'IDENTITY_VERIFICATION'
        | 'ACCOUNT_MANAGEMENT'
        | 'BILLING_AND_PAYMENTS'
        | 'ORDER_MANAGEMENT'
        | 'TROUBLESHOOTING'
        | 'CALL_ROUTING'
        | 'LEAD_QUALIFICATION'
        | 'COLLECTIONS'
        | 'OUTBOUND_CALLING'
        | null;

      /**
       * A flow, a metric, or a pass or fail check
       */
      kind: 'FLOW' | 'METRIC' | 'CHECK' | 'LAYER';

      label: string;

      /**
       * Why it exists: CORE (every agent), INDUSTRY, CAPABILITY, AGENT_CONTEXT (your
       * prompt or website), EXPLORATION or CUSTOMER_INSTRUCTIONS
       */
      layer:
        | 'CORE'
        | 'INDUSTRY'
        | 'CAPABILITY'
        | 'AGENT_CONTEXT'
        | 'EXPLORATION'
        | 'CUSTOMER_INSTRUCTIONS'
        | 'PRODUCTION_CALLS';

      /**
       * Exploration only: DISCOVERED on a call, or INFERRED from a path the agent
       * offered
       */
      origin: 'DISCOVERED' | 'INFERRED' | null;

      reason: string;

      /**
       * The flow or metric it created
       */
      resourceId: string | null;

      source: Item.Source;
    }

    export namespace Item {
      export interface Source {
        /**
         * The call it came from: an exploration call Roark placed, or one of the agent’s
         * production calls
         */
        callId: string | null;

        /**
         * Where in the call
         */
        offsetMs: number | null;

        /**
         * The words in the source that led to it
         */
        quote: string | null;

        type:
          | 'CATALOGUE'
          | 'PROMPT'
          | 'DESCRIPTION'
          | 'WEBSITE'
          | 'EXPLORATION_CALL'
          | 'INSTRUCTIONS'
          | 'PRODUCTION_CALL';

        /**
         * The page it came from, for website sources
         */
        url: string | null;
      }
    }

    /**
     * Where one part of testing the agent stands
     */
    export interface Layer {
      layer:
        | 'CORE'
        | 'INDUSTRY'
        | 'CAPABILITY'
        | 'AGENT_CONTEXT'
        | 'EXPLORATION'
        | 'CUSTOMER_INSTRUCTIONS'
        | 'PRODUCTION_CALLS';

      /**
       * COVERED: tests exist for it, or are added when the generation finishes. SKIPPED:
       * the generation could not test it and said why. OPEN: not covered yet; the
       * generation does not finish while a layer is open. NOT_APPLICABLE: nothing to
       * test it from.
       */
      status: 'COVERED' | 'SKIPPED' | 'OPEN' | 'NOT_APPLICABLE';

      summary: string;
    }

    /**
     * The question the generation is waiting on, while NEEDS_INPUT
     */
    export interface Question {
      defaultOption: string;

      options: Array<string>;

      question: string;
    }

    export interface TestDataNeeded {
      callId: string | null;

      label: string;

      reason: string;
    }
  }
}

export interface SimulationGuideResourceGenerationResponse {
  /**
   * The simulation resources Roark generated for agents: the flows, metrics, checks
   * and run plan, and why
   */
  data: SimulationGuideResourceGenerationResponse.Data;
}

export namespace SimulationGuideResourceGenerationResponse {
  /**
   * The simulation resources Roark generated for agents: the flows, metrics, checks
   * and run plan, and why
   */
  export interface Data {
    /**
     * Simulation resource generation ID
     */
    id: string;

    /**
     * What the generation did and said, in order
     */
    activity: Array<Data.Activity>;

    /**
     * The agents the inputs were generated for
     */
    agentIds: Array<string>;

    capabilities: Array<
      | 'APPOINTMENT_BOOKING'
      | 'FAQ'
      | 'IDENTITY_VERIFICATION'
      | 'ACCOUNT_MANAGEMENT'
      | 'BILLING_AND_PAYMENTS'
      | 'ORDER_MANAGEMENT'
      | 'TROUBLESHOOTING'
      | 'CALL_ROUTING'
      | 'LEAD_QUALIFICATION'
      | 'COLLECTIONS'
      | 'OUTBOUND_CALLING'
    >;

    completedAt: string | null;

    createdAt: string;

    errorMessage: string | null;

    explore: Data.Explore;

    industry:
      | 'HEALTHCARE'
      | 'FINANCIAL_SERVICES'
      | 'INSURANCE'
      | 'DEBT_COLLECTION'
      | 'RETAIL'
      | 'TRAVEL_AND_HOSPITALITY'
      | 'TELECOMMUNICATIONS'
      | 'TECHNOLOGY'
      | 'PUBLIC_SECTOR'
      | 'UTILITIES'
      | 'LOGISTICS'
      | 'AUTOMOTIVE'
      | 'HOME_SERVICES'
      | 'RESTAURANTS'
      | 'EDUCATION'
      | 'OTHER'
      | null;

    items: Array<Data.Item>;

    /**
     * The checklist the generation works through
     */
    layers: Array<Data.Layer>;

    /**
     * The question the generation is waiting on, while NEEDS_INPUT
     */
    question: Data.Question | null;

    /**
     * The run plan to start once the generation completes
     */
    runPlanId: string | null;

    /**
     * PENDING, RUNNING, NEEDS_INPUT (waiting on a question; it goes ahead with the
     * default if nobody answers), COMPLETED, FAILED or CANCELLED
     */
    status: 'PENDING' | 'RUNNING' | 'NEEDS_INPUT' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

    /**
     * Test data the agent asked for that Roark did not have
     */
    testDataNeeded: Array<Data.TestDataNeeded>;
  }

  export namespace Data {
    /**
     * One thing the generation did or said, in order
     */
    export interface Activity {
      createdAt: string;

      /**
       * STATUS, REASONING, ACTION, GUIDANCE, QUESTION, ANSWER, EXPLORATION or ERROR
       */
      kind: 'STATUS' | 'REASONING' | 'ACTION' | 'GUIDANCE' | 'QUESTION' | 'ANSWER' | 'EXPLORATION' | 'ERROR';

      text: string;
    }

    export interface Explore {
      conversationsUsed: number;

      enabled: boolean;

      maxConversationMinutes: number;

      maxConversations: number;
    }

    /**
     * Something the generation created or chose to leave out, and why
     */
    export interface Item {
      id: string;

      /**
       * CREATED, or SKIPPED with the reason
       */
      action: 'CREATED' | 'SKIPPED';

      capability:
        | 'APPOINTMENT_BOOKING'
        | 'FAQ'
        | 'IDENTITY_VERIFICATION'
        | 'ACCOUNT_MANAGEMENT'
        | 'BILLING_AND_PAYMENTS'
        | 'ORDER_MANAGEMENT'
        | 'TROUBLESHOOTING'
        | 'CALL_ROUTING'
        | 'LEAD_QUALIFICATION'
        | 'COLLECTIONS'
        | 'OUTBOUND_CALLING'
        | null;

      /**
       * A flow, a metric, or a pass or fail check
       */
      kind: 'FLOW' | 'METRIC' | 'CHECK' | 'LAYER';

      label: string;

      /**
       * Why it exists: CORE (every agent), INDUSTRY, CAPABILITY, AGENT_CONTEXT (your
       * prompt or website), EXPLORATION or CUSTOMER_INSTRUCTIONS
       */
      layer:
        | 'CORE'
        | 'INDUSTRY'
        | 'CAPABILITY'
        | 'AGENT_CONTEXT'
        | 'EXPLORATION'
        | 'CUSTOMER_INSTRUCTIONS'
        | 'PRODUCTION_CALLS';

      /**
       * Exploration only: DISCOVERED on a call, or INFERRED from a path the agent
       * offered
       */
      origin: 'DISCOVERED' | 'INFERRED' | null;

      reason: string;

      /**
       * The flow or metric it created
       */
      resourceId: string | null;

      source: Item.Source;
    }

    export namespace Item {
      export interface Source {
        /**
         * The call it came from: an exploration call Roark placed, or one of the agent’s
         * production calls
         */
        callId: string | null;

        /**
         * Where in the call
         */
        offsetMs: number | null;

        /**
         * The words in the source that led to it
         */
        quote: string | null;

        type:
          | 'CATALOGUE'
          | 'PROMPT'
          | 'DESCRIPTION'
          | 'WEBSITE'
          | 'EXPLORATION_CALL'
          | 'INSTRUCTIONS'
          | 'PRODUCTION_CALL';

        /**
         * The page it came from, for website sources
         */
        url: string | null;
      }
    }

    /**
     * Where one part of testing the agent stands
     */
    export interface Layer {
      layer:
        | 'CORE'
        | 'INDUSTRY'
        | 'CAPABILITY'
        | 'AGENT_CONTEXT'
        | 'EXPLORATION'
        | 'CUSTOMER_INSTRUCTIONS'
        | 'PRODUCTION_CALLS';

      /**
       * COVERED: tests exist for it, or are added when the generation finishes. SKIPPED:
       * the generation could not test it and said why. OPEN: not covered yet; the
       * generation does not finish while a layer is open. NOT_APPLICABLE: nothing to
       * test it from.
       */
      status: 'COVERED' | 'SKIPPED' | 'OPEN' | 'NOT_APPLICABLE';

      summary: string;
    }

    /**
     * The question the generation is waiting on, while NEEDS_INPUT
     */
    export interface Question {
      defaultOption: string;

      options: Array<string>;

      question: string;
    }

    export interface TestDataNeeded {
      callId: string | null;

      label: string;

      reason: string;
    }
  }
}

export interface SimulationListResourceGenerationsResponse {
  data: Array<SimulationListResourceGenerationsResponse.Data>;
}

export namespace SimulationListResourceGenerationsResponse {
  /**
   * The simulation resources Roark generated for agents: the flows, metrics, checks
   * and run plan, and why
   */
  export interface Data {
    /**
     * Simulation resource generation ID
     */
    id: string;

    /**
     * What the generation did and said, in order
     */
    activity: Array<Data.Activity>;

    /**
     * The agents the inputs were generated for
     */
    agentIds: Array<string>;

    capabilities: Array<
      | 'APPOINTMENT_BOOKING'
      | 'FAQ'
      | 'IDENTITY_VERIFICATION'
      | 'ACCOUNT_MANAGEMENT'
      | 'BILLING_AND_PAYMENTS'
      | 'ORDER_MANAGEMENT'
      | 'TROUBLESHOOTING'
      | 'CALL_ROUTING'
      | 'LEAD_QUALIFICATION'
      | 'COLLECTIONS'
      | 'OUTBOUND_CALLING'
    >;

    completedAt: string | null;

    createdAt: string;

    errorMessage: string | null;

    explore: Data.Explore;

    industry:
      | 'HEALTHCARE'
      | 'FINANCIAL_SERVICES'
      | 'INSURANCE'
      | 'DEBT_COLLECTION'
      | 'RETAIL'
      | 'TRAVEL_AND_HOSPITALITY'
      | 'TELECOMMUNICATIONS'
      | 'TECHNOLOGY'
      | 'PUBLIC_SECTOR'
      | 'UTILITIES'
      | 'LOGISTICS'
      | 'AUTOMOTIVE'
      | 'HOME_SERVICES'
      | 'RESTAURANTS'
      | 'EDUCATION'
      | 'OTHER'
      | null;

    items: Array<Data.Item>;

    /**
     * The checklist the generation works through
     */
    layers: Array<Data.Layer>;

    /**
     * The question the generation is waiting on, while NEEDS_INPUT
     */
    question: Data.Question | null;

    /**
     * The run plan to start once the generation completes
     */
    runPlanId: string | null;

    /**
     * PENDING, RUNNING, NEEDS_INPUT (waiting on a question; it goes ahead with the
     * default if nobody answers), COMPLETED, FAILED or CANCELLED
     */
    status: 'PENDING' | 'RUNNING' | 'NEEDS_INPUT' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

    /**
     * Test data the agent asked for that Roark did not have
     */
    testDataNeeded: Array<Data.TestDataNeeded>;
  }

  export namespace Data {
    /**
     * One thing the generation did or said, in order
     */
    export interface Activity {
      createdAt: string;

      /**
       * STATUS, REASONING, ACTION, GUIDANCE, QUESTION, ANSWER, EXPLORATION or ERROR
       */
      kind: 'STATUS' | 'REASONING' | 'ACTION' | 'GUIDANCE' | 'QUESTION' | 'ANSWER' | 'EXPLORATION' | 'ERROR';

      text: string;
    }

    export interface Explore {
      conversationsUsed: number;

      enabled: boolean;

      maxConversationMinutes: number;

      maxConversations: number;
    }

    /**
     * Something the generation created or chose to leave out, and why
     */
    export interface Item {
      id: string;

      /**
       * CREATED, or SKIPPED with the reason
       */
      action: 'CREATED' | 'SKIPPED';

      capability:
        | 'APPOINTMENT_BOOKING'
        | 'FAQ'
        | 'IDENTITY_VERIFICATION'
        | 'ACCOUNT_MANAGEMENT'
        | 'BILLING_AND_PAYMENTS'
        | 'ORDER_MANAGEMENT'
        | 'TROUBLESHOOTING'
        | 'CALL_ROUTING'
        | 'LEAD_QUALIFICATION'
        | 'COLLECTIONS'
        | 'OUTBOUND_CALLING'
        | null;

      /**
       * A flow, a metric, or a pass or fail check
       */
      kind: 'FLOW' | 'METRIC' | 'CHECK' | 'LAYER';

      label: string;

      /**
       * Why it exists: CORE (every agent), INDUSTRY, CAPABILITY, AGENT_CONTEXT (your
       * prompt or website), EXPLORATION or CUSTOMER_INSTRUCTIONS
       */
      layer:
        | 'CORE'
        | 'INDUSTRY'
        | 'CAPABILITY'
        | 'AGENT_CONTEXT'
        | 'EXPLORATION'
        | 'CUSTOMER_INSTRUCTIONS'
        | 'PRODUCTION_CALLS';

      /**
       * Exploration only: DISCOVERED on a call, or INFERRED from a path the agent
       * offered
       */
      origin: 'DISCOVERED' | 'INFERRED' | null;

      reason: string;

      /**
       * The flow or metric it created
       */
      resourceId: string | null;

      source: Item.Source;
    }

    export namespace Item {
      export interface Source {
        /**
         * The call it came from: an exploration call Roark placed, or one of the agent’s
         * production calls
         */
        callId: string | null;

        /**
         * Where in the call
         */
        offsetMs: number | null;

        /**
         * The words in the source that led to it
         */
        quote: string | null;

        type:
          | 'CATALOGUE'
          | 'PROMPT'
          | 'DESCRIPTION'
          | 'WEBSITE'
          | 'EXPLORATION_CALL'
          | 'INSTRUCTIONS'
          | 'PRODUCTION_CALL';

        /**
         * The page it came from, for website sources
         */
        url: string | null;
      }
    }

    /**
     * Where one part of testing the agent stands
     */
    export interface Layer {
      layer:
        | 'CORE'
        | 'INDUSTRY'
        | 'CAPABILITY'
        | 'AGENT_CONTEXT'
        | 'EXPLORATION'
        | 'CUSTOMER_INSTRUCTIONS'
        | 'PRODUCTION_CALLS';

      /**
       * COVERED: tests exist for it, or are added when the generation finishes. SKIPPED:
       * the generation could not test it and said why. OPEN: not covered yet; the
       * generation does not finish while a layer is open. NOT_APPLICABLE: nothing to
       * test it from.
       */
      status: 'COVERED' | 'SKIPPED' | 'OPEN' | 'NOT_APPLICABLE';

      summary: string;
    }

    /**
     * The question the generation is waiting on, while NEEDS_INPUT
     */
    export interface Question {
      defaultOption: string;

      options: Array<string>;

      question: string;
    }

    export interface TestDataNeeded {
      callId: string | null;

      label: string;

      reason: string;
    }
  }
}

export interface SimulationMockToolResponse {
  /**
   * A simulated backend response for a guarded tool during a Roark test call. The
   * real tool was not, and must not be, executed.
   */
  data: SimulationMockToolResponse.Data;
}

export namespace SimulationMockToolResponse {
  /**
   * A simulated backend response for a guarded tool during a Roark test call. The
   * real tool was not, and must not be, executed.
   */
  export interface Data {
    /**
     * True when this exact invocation (same tool, same arguments) was answered moments
     * ago and the stored response was returned, e.g. on a retry.
     */
    reused: boolean;

    simulationJobId: string;

    /**
     * GENERATED = the scenario-aware model answered; FIXTURE = a pinned deterministic
     * response you configured answered.
     */
    source: 'GENERATED' | 'FIXTURE';

    toolName: string;

    /**
     * The simulated tool response: valid JSON, shaped by the tool contract, consistent
     * with the test scenario and with earlier mocked responses in the same call.
     * Return this from your tool instead of executing it.
     */
    result?: unknown;
  }
}

export interface SimulationRunResponse {
  /**
   * A started simulation run.
   */
  data: SimulationRunResponse.Data;
}

export namespace SimulationRunResponse {
  /**
   * A started simulation run.
   */
  export interface Data {
    /**
     * When the run was created, ISO 8601.
     */
    createdAt: string;

    /**
     * Whether that plan is listed by GET /v1/simulation/plan. False for an unsaved
     * run, whose plan is hidden.
     */
    savedAsPlan: boolean;

    /**
     * How many simulated calls this run places.
     */
    simulationJobCount: number;

    /**
     * The run plan behind this run, present whether or not it was saved. Pass it back
     * as `planId` to run the same configuration again.
     */
    simulationRunPlanId: string;

    /**
     * The run. Poll it with `GET /v1/simulation/plan/job/{jobId}`.
     */
    simulationRunPlanJobId: string;

    /**
     * Initial status. PENDING normally, or QUEUED when the plan runs sequentially and
     * another job of its is still active.
     */
    status:
      | 'PENDING'
      | 'QUEUED'
      | 'CREATING_SNAPSHOTS'
      | 'CREATING_SIMULATIONS'
      | 'PREPARING_CAPACITY'
      | 'RUNNING_SIMULATIONS'
      | 'COMPLETED'
      | 'FAILED'
      | 'TIMED_OUT'
      | 'CANCELLED'
      | 'CANCELLING'
      | 'ENDING_SIMULATIONS';
  }
}

export interface SimulationAnswerResourceGenerationParams {
  /**
   * What you want the generation to know
   */
  text: string;
}

export interface SimulationGenerateResourcesParams {
  /**
   * The agents to generate simulation resources for. One agent per generation for
   * now.
   */
  agentIds: Array<string>;

  /**
   * The endpoint the run plan calls. Defaults to the agent's newest endpoint.
   */
  agentEndpointId?: string;

  /**
   * The capabilities to test. Omit to let Roark work them out from the agent.
   */
  capabilities?: Array<
    | 'APPOINTMENT_BOOKING'
    | 'FAQ'
    | 'IDENTITY_VERIFICATION'
    | 'ACCOUNT_MANAGEMENT'
    | 'BILLING_AND_PAYMENTS'
    | 'ORDER_MANAGEMENT'
    | 'TROUBLESHOOTING'
    | 'CALL_ROUTING'
    | 'LEAD_QUALIFICATION'
    | 'COLLECTIONS'
    | 'OUTBOUND_CALLING'
  >;

  /**
   * Exploration settings
   */
  explore?: SimulationGenerateResourcesParams.Explore;

  /**
   * The industry the agent serves.
   */
  industry?:
    | 'HEALTHCARE'
    | 'FINANCIAL_SERVICES'
    | 'INSURANCE'
    | 'DEBT_COLLECTION'
    | 'RETAIL'
    | 'TRAVEL_AND_HOSPITALITY'
    | 'TELECOMMUNICATIONS'
    | 'TECHNOLOGY'
    | 'PUBLIC_SECTOR'
    | 'UTILITIES'
    | 'LOGISTICS'
    | 'AUTOMOTIVE'
    | 'HOME_SERVICES'
    | 'RESTAURANTS'
    | 'EDUCATION'
    | 'OTHER';

  /**
   * What you want tested, in your own words. Each scenario you describe becomes a
   * flow.
   */
  testingInstructions?: string;

  /**
   * A page Roark reads to learn about the business.
   */
  websiteUrl?: string;
}

export namespace SimulationGenerateResourcesParams {
  /**
   * Exploration settings
   */
  export interface Explore {
    /**
     * Whether Roark calls the agent to discover what it does before finishing the
     * generation. Exploration calls are billed.
     */
    enabled?: boolean;

    /**
     * The longest a single exploration call may last, in minutes.
     */
    maxConversationMinutes?: number;

    /**
     * The most exploration calls Roark places.
     */
    maxConversations?: number;
  }
}

export interface SimulationGuideResourceGenerationParams {
  /**
   * What you want the generation to know
   */
  text: string;
}

export interface SimulationListResourceGenerationsParams {
  /**
   * Only generations for these agents, comma-separated, at most 100. Omit for every
   * agent.
   */
  agentIds?: string;

  /**
   * How many to return, newest first. Default 20, max 50.
   */
  limit?: number;
}

export interface SimulationMockToolParams {
  /**
   * The simulation this session belongs to, from the agent-config resolve response
   * (`simulationJobId`). Roark re-validates it against the live simulation before
   * answering.
   */
  simulationJobId: string;

  /**
   * The tool the agent invoked.
   */
  toolName: string;

  /**
   * The arguments the agent called the tool with, verbatim.
   */
  arguments?: { [key: string]: unknown };

  /**
   * Your session or room identifier, echoed back in logs for correlation.
   */
  sessionId?: string;

  /**
   * The tool's contract: its description and, ideally, its parameter and return
   * shape. The more contract you pass, the more faithful the simulated response.
   */
  toolDescription?: string;
}

export type SimulationRunParams =
  | SimulationRunParams.RunSimulationFromConfig
  | SimulationRunParams.RunSimulationFromPlanID
  | SimulationRunParams.RunSimulationFromConfigKey
  | SimulationRunParams.RunSimulationFromTemplate;

export declare namespace SimulationRunParams {
  export interface RunSimulationFromConfig {
    /**
     * The simulation to run: what to call, who calls it, and what to measure.
     */
    plan: RunSimulationFromConfig.Plan;

    /**
     * Keeps this configuration as a run plan, listed by GET /v1/simulation/plan and
     * re-runnable with `planId`. Requires `plan.name`, since a plan you meant to keep
     * should not be filed under a generated one.
     *
     * Omitted or false gives a one-off. The run still needs a plan to execute, so one
     * is created either way, but it is hidden: it carries this run and nothing else.
     */
    saveAsPlan?: boolean;

    /**
     * Values for the {{variables}} the run resolves, overriding whatever the plan has
     * pinned.
     *
     * An object applies them to the whole run:
     *
     * { "orderNumber": "12345", "tier": "gold" }
     *
     * An array applies them per flow, or to just its happy path or one of its edge
     * cases, when a single set will not do. Each entry carries what it applies to:
     *
     * [ { "flowId": "550e8400-...", "variables": { "orderNumber": "12345" } }, {
     * "flowId": "550e8400-...", "happyPath": true, "variables": { "orderNumber":
     * "55555" } }, { "flowId": "550e8400-...", "edgeCaseId": "7a3d2e1f-...",
     * "variables": { "orderNumber": "67890" } } ]
     *
     * An entry that narrows to neither covers everything that flow resolves. A flow
     * this plan does not attach, or an edge case that does not belong to the flow, is
     * rejected rather than ignored.
     *
     * A plan built on scenarios rather than customer flows targets them the same way,
     * with `scenarioId` in place of `flowId`. That form is deprecated alongside
     * scenarios themselves, and still accepted so runs against those plans keep
     * working.
     */
    variables?:
      | { [key: string]: string }
      | Array<RunSimulationFromConfig.UnionMember1>
      | Array<RunSimulationFromConfig.UnionMember2>;
  }

  export namespace RunSimulationFromConfig {
    /**
     * The simulation to run: what to call, who calls it, and what to measure.
     */
    export interface Plan {
      /**
       * Agent endpoints to include in this run plan
       */
      agentEndpoints: Array<Plan.AgentEndpoint>;

      /**
       * Direction of the simulation (INBOUND or OUTBOUND)
       */
      direction: 'INBOUND' | 'OUTBOUND';

      /**
       * Maximum duration in seconds for each simulation
       */
      maxSimulationDurationSeconds: number;

      /**
       * The most simulations a run starts per second (0.01-10), fractional allowed: 0.2
       * starts one every 5 seconds. Omitted or `null` starts them as fast as
       * `maxConcurrentJobs` allows. The concurrency limit still applies on top, so a run
       * holds the rate only while calls last under `maxConcurrentJobs` /
       * `callsPerSecond` seconds. A run reports the rate it achieved as
       * `dialRate.achievedCallsPerSecond`. A rate above the project's concurrency limit
       * / 30 is refused with 400: that limit could only hold it with calls under 30
       * seconds.
       */
      callsPerSecond?: number | null;

      /**
       * The reference value of `comparisonProperty`, for example `NONE` for
       * `BACKGROUND_NOISE` or `NORMAL` for `SPEECH_PACE`: shown first in the results.
       * Must be a value that property can take. Whether a value did significantly worse
       * does not depend on it: that is decided against every other value combined (see
       * `sweepAttribution`).
       *
       * Stored rather than assumed, so the report can say "compared against US accent"
       * instead of implying Roark decided which value is normal. Omit it and the
       * property's own norm is used, as the dashboard prefills it, or none when your
       * `comparisonValues` leave the norm out. `GENDER` has no norm, so choose the one
       * you are testing against.
       */
      comparisonBaseline?: string | null;

      /**
       * The property this run plan investigates: the one thing its arms differ by.
       *
       * Set it and the run report compares the arms on that property, so a run answers
       * "what did background noise cost" rather than just "what did each arm score".
       * Every value is a field already recorded on each call, so the report can label an
       * arm `CRYING_BABY` rather than repeating a flow variant's title.
       *
       * Omit it and the report still compares when it can: it detects which property
       * varies across the arms. Setting it is what tells the written summary what you
       * were trying to find out, which detection cannot infer.
       */
      comparisonProperty?:
        | 'ACCENT'
        | 'AGE'
        | 'BACKGROUND_NOISE'
        | 'BACKGROUND_NOISE_VOLUME'
        | 'BASE_EMOTION'
        | 'CONFIRMATION_STYLE'
        | 'GENDER'
        | 'INTENT_CLARITY'
        | 'LANGUAGE'
        | 'INTERRUPTION'
        | 'LINE_QUALITY'
        | 'MEMORY_RELIABILITY'
        | 'RESPONSE_TIMING'
        | 'SPEECH_CLARITY'
        | 'SPEECH_PACE'
        | null;

      /**
       * The arms to run, for a plan that sweeps `comparisonProperty`. This is what the
       * plan costs: the flow is attached once per arm, so ten arms is ten times the
       * calls of one.
       *
       * Attach each flow once, as you would without a comparison: the plan builds the
       * arms, running the happy path or edge cases you selected under every arm. Built
       * arms need at least 5 calls per arm (`iterationCount` times the test cases per
       * arm), or the plan is refused with `400`. Flows that all carry `overrides` on
       * `comparisonProperty` already are the arms and are kept as you wrote them; a mix
       * of flows with and without one is refused.
       *
       * Each entry is one arm. A bare value runs it plain: `"CITY"`. An object runs the
       * value with something pinned on that arm only, such as a noise level per bed:
       * `{ "value": "OFFICE", "backgroundNoiseVolume": 0.6 }` plays OFFICE at 60% while
       * the other beds keep the default. List a value more than once with different pins
       * to run it as several arms: DRIVING at 0.7 and DRIVING at 1 are two arms,
       * reported as `Driving (70% noise)` and `Driving (100% noise)`, and `"DRIVING"`
       * beside them keeps the plain arm too. The sweep still varies one property; what
       * an arm pins is part of "everything else" for that arm only, so the report still
       * compares the arms on `comparisonProperty`.
       *
       * Omit it to run every value the property has, plain, which for `ACCENT` is more
       * than twenty. A `comparisonBaseline` outside the values listed is rejected,
       * because it would anchor every difference to an arm the run never made. A value
       * the property cannot take, a pin the sweep cannot account for, or the same arm
       * listed twice is rejected with `400`.
       *
       * Not stored as a field: the arms are the values. Reading the plan back returns
       * them as its flow attachments, each with its pins as `overrides`.
       */
      comparisonValues?: Array<string | Plan.ComparisonArm>;

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
       * Merge the customer's own recording of the real call into each simulation, so
       * metrics can be scored against the live leg as well as the simulated one. This is
       * the API equivalent of the dashboard's live-enrichment toggle.
       *
       * With this on, the run provisions a phone number and holds each call open for up
       * to 15 minutes waiting for a matching call to be posted to POST /v1/call. A call
       * matches on the provisioned number (`roarkPhoneNumber` on the job) with a start
       * time inside the simulation window. If nothing arrives, the simulation still
       * completes and any `LIVE`-sourced metric produces no value.
       *
       * Required by any metric whose `requiresLiveConversation` is true: without it that
       * metric is silently skipped.
       */
      enrichWithLiveConversation?: boolean;

      /**
       * Execution mode (PARALLEL or SEQUENTIAL)
       */
      executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

      /**
       * Customer flows to include in this run plan. The same flow can appear more than
       * once with a different persona override, different variables, or different
       * `overrides`: attaching it once per value of one property is how you compare that
       * property without a template.
       */
      flows?: Array<Plan.Flow>;

      /**
       * Let the run add metrics by itself off the attached flows, on top of the
       * `metrics` named here.
       *
       * Two attach this way today: Agent Expectations wherever an attached flow has
       * agent expectations written on it, and Keypad Entry wherever one has steps where
       * the agent is expected to press keys. Both grade something authored on the flow
       * that nothing else measures, which is why it is on by default.
       *
       * Set false when the `metrics` list is meant to be exhaustive: a plan testing only
       * whether the caller can complete the flow may not want the agent graded on its
       * expectations as well. False also pins the plan against any automatic metric
       * Roark adds later.
       */
      includeAutomaticMetrics?: boolean;

      /**
       * Also collect each attached flow's own metrics, on top of the `metrics` named
       * here.
       *
       * Default true, which is what you want when you brought your own flows and their
       * graders. Set false for a run whose metric list is meant to be exhaustive: a
       * template like Load Testing or Voicemail deliberately grades a narrow set, and
       * inheriting every flow metric on top multiplies analysis cost across the volume
       * without adding signal.
       *
       * GET /v1/simulation/template returns the value each template expects.
       */
      includeFlowMetrics?: boolean;

      /**
       * Number of iterations to run for each test case (1-10000)
       */
      iterationCount?: number;

      /**
       * Maximum number of concurrent simulation jobs
       */
      maxConcurrentJobs?: number;

      /**
       * How many more times to run a test case when the agent under test never responds:
       * it never speaks on a call or never replies in a chat (0-10). 0 turns retries
       * off. Failed checks and failures on Roark’s side are never retried.
       *
       * Each retry is a separate attempt, billed like any other, so a plan retrying N
       * times can place up to N + 1 calls per test case. Every silent attempt stays on
       * the run with its own call; the run settles once each test case has a final
       * attempt, and the agent never spoke verdict is judged on each test case’s last
       * attempt.
       */
      maxNoResponseRetries?: number;

      /**
       * Metric definitions to include in this run plan. Reference each by `id` (UUID) or
       * `slug`.
       *
       * Optional when the attached `flows` carry the grading: metrics a flow declares
       * itself (with `includeFlowMetrics`), or the Agent Expectations and Keypad Entry
       * metrics a run adds for flows with expectations or expected keypad entries (with
       * `includeAutomaticMetrics`). A plan with nothing to grade is rejected with a 400.
       */
      metrics?: Array<Plan.Metric>;

      /**
       * What to call this. Generated from the date when omitted, and required with
       * `saveAsPlan`.
       */
      name?: string;

      /**
       * Seconds a retry waits before it dials (30-600). Only used when
       * `maxNoResponseRetries` is above 0.
       */
      noResponseRetryBackoffSeconds?: number;

      /**
       * Personas to include in this run plan. Required with `scenarios`; ignored with
       * `flows`, where each variant carries its own persona.
       */
      personas?: Array<Plan.Persona>;

      /**
       * Seconds over which the rate climbs linearly from 0 to `callsPerSecond` (0-3600).
       * Omitted, `null` or 0 starts at the full rate. Only used with `callsPerSecond`.
       */
      rampUpSeconds?: number | null;

      /**
       * @deprecated Deprecated: use `flows` instead. Scenarios to include in this run
       * plan. The same scenario ID can appear multiple times with different variables.
       */
      scenarios?: Array<Plan.Scenario>;

      /**
       * Timeout in seconds for silence detection
       */
      silenceTimeoutSeconds?: number;
    }

    export namespace Plan {
      export interface AgentEndpoint {
        id: string;
      }

      /**
       * One arm of a sweep: the swept value it runs, and what it pins besides that
       * value. The OFFICE arm of a BACKGROUND_NOISE sweep playing at 60% while the other
       * beds keep their level is `{ "value": "OFFICE", "backgroundNoiseVolume": 0.6 }`.
       * The report compares the arms on the swept property only, so each sweep may pin
       * just what its experiment calls for: a BACKGROUND_NOISE sweep may pin
       * `backgroundNoiseVolume`, and no other sweep pins anything yet. A pin the sweep
       * cannot account for is rejected with `400`.
       */
      export interface ComparisonArm {
        /**
         * The swept value this arm runs, a value of `comparisonProperty`.
         */
        value: string;

        /**
         * The noise level this arm plays at, 0 to 1. The environment default is 0.1. Only
         * a `BACKGROUND_NOISE` sweep may pin it.
         */
        backgroundNoiseVolume?: number;
      }

      /**
       * One customer flow attached to a run plan, and which of its ways of running you
       * cover.
       *
       * Attaching the same flow more than once with different overrides is how you fan
       * it out across personas or values.
       */
      export interface Flow {
        /**
         * The customer flow to run.
         */
        id?: string;

        /**
         * `"ALL"` runs every edge case the flow has when the run starts, so one added
         * later is covered. An array runs only the ones you name, each able to carry its
         * own persona override and values.
         */
        edgeCases?: 'ALL' | Array<Flow.UnionMember1>;

        /**
         * Run the flow's happy path. Resolved when the run starts, so it follows the flow.
         */
        happyPath?: boolean;

        /**
         * Persona and environment properties to change for this attachment only, without
         * editing the persona or the environment themselves. Each entry patches the
         * per-run snapshot this attachment records, so the flow runs as a caller with that
         * accent, or over that background noise, and everything else stays as authored.
         *
         * This is how you attach the same flow twice and vary one thing between them,
         * which is what a sweep template builds for you. One value per property; a
         * property named twice is rejected.
         */
        overrides?: Array<Flow.Override>;

        /**
         * Runs everything this attachment resolves as that persona instead of its own.
         */
        personaOverrideId?: string | null;

        /**
         * The Roark-curated flow to run, by its stable slug. Use instead of `id` for a run
         * you keep in version control: a curated flow’s id differs between deployments,
         * its slug does not. Your own flows have no slug and are named by `id`.
         */
        slug?: string;

        /**
         * Values for everything it resolves.
         */
        variables?: { [key: string]: string };
      }

      export namespace Flow {
        export interface UnionMember1 {
          /**
           * The edge case to run.
           */
          id?: string;

          /**
           * Run this one as that persona instead of its own.
           */
          personaOverrideId?: string | null;

          /**
           * The edge case to run, by its stable slug, matched within this flow. Use instead
           * of `id` for a run you keep in version control: a curated edge case’s id differs
           * between deployments and changes outright if it is renamed. Your own edge cases
           * have no slug and are named by `id`.
           */
          slug?: string;

          /**
           * Values for this one only.
           */
          variables?: { [key: string]: string };
        }

        /**
         * One persona or environment property, changed for this flow attachment only.
         */
        export interface Override {
          property:
            | 'ACCENT'
            | 'AGE'
            | 'BACKGROUND_NOISE'
            | 'BACKGROUND_NOISE_VOLUME'
            | 'BASE_EMOTION'
            | 'CONFIRMATION_STYLE'
            | 'GENDER'
            | 'INTENT_CLARITY'
            | 'LANGUAGE'
            | 'INTERRUPTION'
            | 'LINE_QUALITY'
            | 'MEMORY_RELIABILITY'
            | 'RESPONSE_TIMING'
            | 'SPEECH_CLARITY'
            | 'SPEECH_PACE';

          value: string;
        }
      }

      export interface Metric {
        /**
         * Metric definition UUID. Provide either this or `slug`, not both.
         */
        id?: string;

        /**
         * Which side of an enriched run this metric is scored on. Only meaningful with
         * `enrichWithLiveConversation: true`, where a run has both a simulated
         * conversation and the customer's own live recording of it.
         *
         * Defaults to `SIMULATED`. Use `LIVE` for a metric that must be measured against
         * the real recording (audio quality, provider latency) rather than the simulated
         * leg. `null` means the same as omitting it, so a plan read back from GET can be
         * sent straight to PUT.
         */
        conversationSource?: 'SIMULATED' | 'LIVE' | null;

        /**
         * Alias of `slug` accepted for backwards compatibility. Use `slug` for new
         * integrations.
         */
        metricId?: string;

        /**
         * THE BAR, and the only thing that decides pass/fail. The share of the run's
         * simulations that must pass this check, 0-100.
         *
         * Applied to this check alone and never pooled: silence duration at 40 and word
         * count at 80 means the run fails unless 40% of sims clear silence AND 80% clear
         * word count. Omit or `null` for the 80% default.
         */
        minPassRate?: number | null;

        /**
         * Stable metric slug (e.g. `customer_satisfaction`). Provide either this or `id`,
         * not both.
         */
        slug?: string;
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

    export interface UnionMember1 {
      /**
       * A customer flow this plan runs.
       */
      flowId: string;

      /**
       * The values to apply.
       */
      variables: { [key: string]: string };

      /**
       * Narrow to one edge case of that flow.
       */
      edgeCaseId?: string;

      /**
       * Narrow to the flow's happy path.
       */
      happyPath?: true;
    }

    export interface UnionMember2 {
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

  export interface RunSimulationFromPlanID {
    /**
     * The run plan to run, saved or hidden. Rename or unhide it with
     * `PUT /v1/simulation/plan/{planId}`.
     */
    planId: string;

    /**
     * Values for the {{variables}} the run resolves, overriding whatever the plan has
     * pinned.
     *
     * An object applies them to the whole run:
     *
     * { "orderNumber": "12345", "tier": "gold" }
     *
     * An array applies them per flow, or to just its happy path or one of its edge
     * cases, when a single set will not do. Each entry carries what it applies to:
     *
     * [ { "flowId": "550e8400-...", "variables": { "orderNumber": "12345" } }, {
     * "flowId": "550e8400-...", "happyPath": true, "variables": { "orderNumber":
     * "55555" } }, { "flowId": "550e8400-...", "edgeCaseId": "7a3d2e1f-...",
     * "variables": { "orderNumber": "67890" } } ]
     *
     * An entry that narrows to neither covers everything that flow resolves. A flow
     * this plan does not attach, or an edge case that does not belong to the flow, is
     * rejected rather than ignored.
     *
     * A plan built on scenarios rather than customer flows targets them the same way,
     * with `scenarioId` in place of `flowId`. That form is deprecated alongside
     * scenarios themselves, and still accepted so runs against those plans keep
     * working.
     */
    variables?:
      | { [key: string]: string }
      | Array<RunSimulationFromPlanID.UnionMember1>
      | Array<RunSimulationFromPlanID.UnionMember2>;
  }

  export namespace RunSimulationFromPlanID {
    export interface UnionMember1 {
      /**
       * A customer flow this plan runs.
       */
      flowId: string;

      /**
       * The values to apply.
       */
      variables: { [key: string]: string };

      /**
       * Narrow to one edge case of that flow.
       */
      edgeCaseId?: string;

      /**
       * Narrow to the flow's happy path.
       */
      happyPath?: true;
    }

    export interface UnionMember2 {
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

  export interface RunSimulationFromConfigKey {
    /**
     * The config key of a plan to run, as applied from config as code
     * (`simulationPlan/<name>`). Runs a config-managed plan by name, with no id
     * lookup. Unique per project.
     */
    planConfigKey: string;

    /**
     * Values for the {{variables}} the run resolves, overriding whatever the plan has
     * pinned.
     *
     * An object applies them to the whole run:
     *
     * { "orderNumber": "12345", "tier": "gold" }
     *
     * An array applies them per flow, or to just its happy path or one of its edge
     * cases, when a single set will not do. Each entry carries what it applies to:
     *
     * [ { "flowId": "550e8400-...", "variables": { "orderNumber": "12345" } }, {
     * "flowId": "550e8400-...", "happyPath": true, "variables": { "orderNumber":
     * "55555" } }, { "flowId": "550e8400-...", "edgeCaseId": "7a3d2e1f-...",
     * "variables": { "orderNumber": "67890" } } ]
     *
     * An entry that narrows to neither covers everything that flow resolves. A flow
     * this plan does not attach, or an edge case that does not belong to the flow, is
     * rejected rather than ignored.
     *
     * A plan built on scenarios rather than customer flows targets them the same way,
     * with `scenarioId` in place of `flowId`. That form is deprecated alongside
     * scenarios themselves, and still accepted so runs against those plans keep
     * working.
     */
    variables?:
      | { [key: string]: string }
      | Array<RunSimulationFromConfigKey.UnionMember1>
      | Array<RunSimulationFromConfigKey.UnionMember2>;
  }

  export namespace RunSimulationFromConfigKey {
    export interface UnionMember1 {
      /**
       * A customer flow this plan runs.
       */
      flowId: string;

      /**
       * The values to apply.
       */
      variables: { [key: string]: string };

      /**
       * Narrow to one edge case of that flow.
       */
      edgeCaseId?: string;

      /**
       * Narrow to the flow's happy path.
       */
      happyPath?: true;
    }

    export interface UnionMember2 {
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

  export interface RunSimulationFromTemplate {
    /**
     * The agent endpoints to call. No template can know these.
     */
    agentEndpoints: Array<RunSimulationFromTemplate.AgentEndpoint>;

    /**
     * Direction of the simulation (INBOUND or OUTBOUND)
     */
    direction: 'INBOUND' | 'OUTBOUND';

    /**
     * The template to run, as listed by GET /v1/simulation/template.
     */
    template: string;

    /**
     * Metrics to collect on top of the template's own, referenced by `id` or `slug`
     * like a plan's `metrics`. The template's metrics and checks always run; naming
     * one of them here again keeps it once, with the success criteria you set on it.
     */
    additionalMetrics?: Array<RunSimulationFromTemplate.AdditionalMetric>;

    /**
     * The most simulations a run starts per second (0.01-10), fractional allowed: 0.2
     * starts one every 5 seconds. Omitted or `null` starts them as fast as
     * `maxConcurrentJobs` allows. The concurrency limit still applies on top, so a run
     * holds the rate only while calls last under `maxConcurrentJobs` /
     * `callsPerSecond` seconds. A run reports the rate it achieved as
     * `dialRate.achievedCallsPerSecond`. A rate above the project's concurrency limit
     * / 30 is refused with 400: that limit could only hold it with calls under 30
     * seconds.
     */
    callsPerSecond?: number | null;

    /**
     * The sweep's reference value, shown first in the results. Defaults to the
     * template's own baseline, as returned by GET /v1/simulation/template. Whether a
     * value did significantly worse does not depend on it: that is decided against
     * every other value combined.
     *
     * Send it with `comparisonValues` and it must be one of them, or the request is
     * rejected: anchoring every difference to an arm the run never made would measure
     * it against nothing. Leave it out and the template's own baseline is used, and
     * quietly dropped if your narrowing excluded it, since that one you did not
     * choose.
     */
    comparisonBaseline?: string | null;

    /**
     * The arms of the sweep to run, for a template that sweeps one (GET
     * /v1/simulation/template returns `sweep.property` for those that do). This is
     * what the run costs: the flow is called once per arm, so ten arms is ten times
     * the calls of one.
     *
     * Omit it to run every value the property has, plain, which for `accent-handling`
     * is more than twenty. Send a subset to narrow it, for example the three accents
     * you actually serve. An object entry pins something on that arm only, such as a
     * noise level per bed on `background-noise-robustness`:
     * `{ "value": "OFFICE", "backgroundNoiseVolume": 0.6 }` plays OFFICE at 60% while
     * the other beds keep the default. See `POST /v1/simulation/plan`.
     */
    comparisonValues?: Array<string | RunSimulationFromTemplate.ComparisonArm>;

    /**
     * Phrases that trigger end of call. Empty array disables the feature.
     */
    endCallPhrases?: Array<string>;

    /**
     * Semantic conditions that trigger end of call. The LLM evaluates the conversation
     * against these conditions. Defaults to the template's `defaultEndCallReasons`, as
     * returned by GET /v1/simulation/template. Pass an empty array to run with none.
     */
    endCallReasons?: Array<string>;

    /**
     * Merge the customer's own recording of the real call into each simulation, so
     * metrics can be scored against the live leg as well as the simulated one. This is
     * the API equivalent of the dashboard's live-enrichment toggle.
     *
     * With this on, the run provisions a phone number and holds each call open for up
     * to 15 minutes waiting for a matching call to be posted to POST /v1/call. A call
     * matches on the provisioned number (`roarkPhoneNumber` on the job) with a start
     * time inside the simulation window. If nothing arrives, the simulation still
     * completes and any `LIVE`-sourced metric produces no value.
     *
     * Required by any metric whose `requiresLiveConversation` is true: without it that
     * metric is silently skipped.
     */
    enrichWithLiveConversation?: boolean;

    /**
     * For `question-answer-check`: the environment the calls run in.
     */
    environmentId?: string;

    /**
     * Execution mode (PARALLEL or SEQUENTIAL)
     */
    executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

    /**
     * The flows to run, in the same shape a run plan takes them.
     *
     * Required when the template lists no flows of its own: it presets what to
     * measure, and this says what to measure it on. Optional when it does, where these
     * REPLACE the ones it would have run, so you can narrow a suite to the cases you
     * care about. Either way, GET /v1/simulation/template lists the flows and variant
     * ids each template covers.
     *
     * On a template that sweeps a property, every value runs exactly what you select
     * here: the happy path, the edge cases you name, or `edgeCases: "ALL"`. Each
     * selected case is a call per value per iteration, so naming three edge cases
     * triples the run.
     */
    flows?: Array<RunSimulationFromTemplate.Flow>;

    /**
     * Runs per test case (1-10000). Defaults to 1, or to 6 for a template that sweeps
     * a property. A sweep needs at least 5 calls per value (test cases per value times
     * iterations) to compare its values, and a lower count is refused with 400.
     */
    iterationCount?: number;

    /**
     * Maximum number of concurrent simulation jobs
     */
    maxConcurrentJobs?: number;

    /**
     * How many more times to run a test case when the agent under test never responds:
     * it never speaks on a call or never replies in a chat (0-10). 0 turns retries
     * off. Failed checks and failures on Roark’s side are never retried.
     *
     * Each retry is a separate attempt, billed like any other, so a plan retrying N
     * times can place up to N + 1 calls per test case. Every silent attempt stays on
     * the run with its own call; the run settles once each test case has a final
     * attempt, and the agent never spoke verdict is judged on each test case’s last
     * attempt.
     */
    maxNoResponseRetries?: number;

    /**
     * Defaults to the template's `defaultMaxSimulationDurationSeconds`, as returned by
     * GET /v1/simulation/template.
     */
    maxSimulationDurationSeconds?: number;

    /**
     * What to call this. Defaults to the template's name and the date, and required
     * with `saveAsPlan`.
     */
    name?: string;

    /**
     * Seconds a retry waits before it dials (30-600). Only used when
     * `maxNoResponseRetries` is above 0.
     */
    noResponseRetryBackoffSeconds?: number;

    /**
     * For `question-answer-check`: the persona that asks the questions.
     */
    personaId?: string;

    /**
     * For the `question-answer-check` template: the questions to ask and the answer
     * expected for each. Every question runs as its own graded call.
     */
    questions?: Array<RunSimulationFromTemplate.Question>;

    /**
     * Seconds over which the rate climbs linearly from 0 to `callsPerSecond` (0-3600).
     * Omitted, `null` or 0 starts at the full rate. Only used with `callsPerSecond`.
     */
    rampUpSeconds?: number | null;

    /**
     * Keeps the resolved configuration as a run plan, listed by GET
     * /v1/simulation/plan and re-runnable with `planId`. Requires `name`.
     */
    saveAsPlan?: boolean;

    /**
     * Timeout in seconds for silence detection
     */
    silenceTimeoutSeconds?: number;

    /**
     * Values for the {{variables}} the run resolves. An object applies them
     * everywhere; an array targets a flow, its happy path, or one of its edge cases
     * with `flowId`.
     *
     * The scenario-scoped form the other variants accept is not valid here: a template
     * run is always flow-based, so there would be no scenario for it to reach.
     */
    variables?: { [key: string]: string } | Array<RunSimulationFromTemplate.UnionMember1>;
  }

  export namespace RunSimulationFromTemplate {
    export interface AgentEndpoint {
      id: string;
    }

    export interface AdditionalMetric {
      /**
       * Metric definition UUID. Provide either this or `slug`, not both.
       */
      id?: string;

      /**
       * Which side of an enriched run this metric is scored on. Only meaningful with
       * `enrichWithLiveConversation: true`, where a run has both a simulated
       * conversation and the customer's own live recording of it.
       *
       * Defaults to `SIMULATED`. Use `LIVE` for a metric that must be measured against
       * the real recording (audio quality, provider latency) rather than the simulated
       * leg. `null` means the same as omitting it, so a plan read back from GET can be
       * sent straight to PUT.
       */
      conversationSource?: 'SIMULATED' | 'LIVE' | null;

      /**
       * Alias of `slug` accepted for backwards compatibility. Use `slug` for new
       * integrations.
       */
      metricId?: string;

      /**
       * THE BAR, and the only thing that decides pass/fail. The share of the run's
       * simulations that must pass this check, 0-100.
       *
       * Applied to this check alone and never pooled: silence duration at 40 and word
       * count at 80 means the run fails unless 40% of sims clear silence AND 80% clear
       * word count. Omit or `null` for the 80% default.
       */
      minPassRate?: number | null;

      /**
       * Stable metric slug (e.g. `customer_satisfaction`). Provide either this or `id`,
       * not both.
       */
      slug?: string;
    }

    /**
     * One arm of a sweep: the swept value it runs, and what it pins besides that
     * value. The OFFICE arm of a BACKGROUND_NOISE sweep playing at 60% while the other
     * beds keep their level is `{ "value": "OFFICE", "backgroundNoiseVolume": 0.6 }`.
     * The report compares the arms on the swept property only, so each sweep may pin
     * just what its experiment calls for: a BACKGROUND_NOISE sweep may pin
     * `backgroundNoiseVolume`, and no other sweep pins anything yet. A pin the sweep
     * cannot account for is rejected with `400`.
     */
    export interface ComparisonArm {
      /**
       * The swept value this arm runs, a value of `comparisonProperty`.
       */
      value: string;

      /**
       * The noise level this arm plays at, 0 to 1. The environment default is 0.1. Only
       * a `BACKGROUND_NOISE` sweep may pin it.
       */
      backgroundNoiseVolume?: number;
    }

    /**
     * One customer flow attached to a run plan, and which of its ways of running you
     * cover.
     *
     * Attaching the same flow more than once with different overrides is how you fan
     * it out across personas or values.
     */
    export interface Flow {
      /**
       * The customer flow to run.
       */
      id?: string;

      /**
       * `"ALL"` runs every edge case the flow has when the run starts, so one added
       * later is covered. An array runs only the ones you name, each able to carry its
       * own persona override and values.
       */
      edgeCases?: 'ALL' | Array<Flow.UnionMember1>;

      /**
       * Run the flow's happy path. Resolved when the run starts, so it follows the flow.
       */
      happyPath?: boolean;

      /**
       * Persona and environment properties to change for this attachment only, without
       * editing the persona or the environment themselves. Each entry patches the
       * per-run snapshot this attachment records, so the flow runs as a caller with that
       * accent, or over that background noise, and everything else stays as authored.
       *
       * This is how you attach the same flow twice and vary one thing between them,
       * which is what a sweep template builds for you. One value per property; a
       * property named twice is rejected.
       */
      overrides?: Array<Flow.Override>;

      /**
       * Runs everything this attachment resolves as that persona instead of its own.
       */
      personaOverrideId?: string | null;

      /**
       * The Roark-curated flow to run, by its stable slug. Use instead of `id` for a run
       * you keep in version control: a curated flow’s id differs between deployments,
       * its slug does not. Your own flows have no slug and are named by `id`.
       */
      slug?: string;

      /**
       * Values for everything it resolves.
       */
      variables?: { [key: string]: string };
    }

    export namespace Flow {
      export interface UnionMember1 {
        /**
         * The edge case to run.
         */
        id?: string;

        /**
         * Run this one as that persona instead of its own.
         */
        personaOverrideId?: string | null;

        /**
         * The edge case to run, by its stable slug, matched within this flow. Use instead
         * of `id` for a run you keep in version control: a curated edge case’s id differs
         * between deployments and changes outright if it is renamed. Your own edge cases
         * have no slug and are named by `id`.
         */
        slug?: string;

        /**
         * Values for this one only.
         */
        variables?: { [key: string]: string };
      }

      /**
       * One persona or environment property, changed for this flow attachment only.
       */
      export interface Override {
        property:
          | 'ACCENT'
          | 'AGE'
          | 'BACKGROUND_NOISE'
          | 'BACKGROUND_NOISE_VOLUME'
          | 'BASE_EMOTION'
          | 'CONFIRMATION_STYLE'
          | 'GENDER'
          | 'INTENT_CLARITY'
          | 'LANGUAGE'
          | 'INTERRUPTION'
          | 'LINE_QUALITY'
          | 'MEMORY_RELIABILITY'
          | 'RESPONSE_TIMING'
          | 'SPEECH_CLARITY'
          | 'SPEECH_PACE';

        value: string;
      }
    }

    export interface Question {
      /**
       * The question the caller asks the agent.
       */
      ask: string;

      /**
       * The answer the agent must give, judged against the transcript.
       */
      expect: string;
    }

    export interface UnionMember1 {
      /**
       * A customer flow this plan runs.
       */
      flowId: string;

      /**
       * The values to apply.
       */
      variables: { [key: string]: string };

      /**
       * Narrow to one edge case of that flow.
       */
      edgeCaseId?: string;

      /**
       * Narrow to the flow's happy path.
       */
      happyPath?: true;
    }
  }
}

export declare namespace Simulation {
  export {
    type SimulationAnswerResourceGenerationResponse as SimulationAnswerResourceGenerationResponse,
    type SimulationCancelResourceGenerationResponse as SimulationCancelResourceGenerationResponse,
    type SimulationGenerateResourcesResponse as SimulationGenerateResourcesResponse,
    type SimulationGetResourceGenerationResponse as SimulationGetResourceGenerationResponse,
    type SimulationGuideResourceGenerationResponse as SimulationGuideResourceGenerationResponse,
    type SimulationListResourceGenerationsResponse as SimulationListResourceGenerationsResponse,
    type SimulationMockToolResponse as SimulationMockToolResponse,
    type SimulationRunResponse as SimulationRunResponse,
    type SimulationAnswerResourceGenerationParams as SimulationAnswerResourceGenerationParams,
    type SimulationGenerateResourcesParams as SimulationGenerateResourcesParams,
    type SimulationGuideResourceGenerationParams as SimulationGuideResourceGenerationParams,
    type SimulationListResourceGenerationsParams as SimulationListResourceGenerationsParams,
    type SimulationMockToolParams as SimulationMockToolParams,
    type SimulationRunParams as SimulationRunParams,
  };
}
