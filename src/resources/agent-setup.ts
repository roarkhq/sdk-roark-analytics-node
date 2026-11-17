// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AgentSetup extends APIResource {
  /**
   * Generates flows, metrics and a run plan for the agent. Runs in the background:
   * watch the agent.setup.completed webhook, or poll GET /v1/agent/{agentId}/setup.
   * Refuses while another setup for the agent is running. Needs the
   * 'simulation:create' and 'metric:create' permissions. Exploration also needs
   * 'simulation:run', and is turned off for keys without it unless explore.enabled
   * is set.
   *
   * @example
   * ```ts
   * const agentSetup = await client.agentSetup.create(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  create(
    agentID: string,
    body: AgentSetupCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentSetupCreateResponse> {
    return this._client.post(path`/v1/agent/${agentID}/setup`, { body, ...options });
  }

  /**
   * Answers the question a setup is waiting on (status NEEDS_INPUT). If nobody
   * answers within 15 minutes, setup goes ahead with its default.
   *
   * @example
   * ```ts
   * const response = await client.agentSetup.answerQuestion(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     text: 'x',
   *   },
   * );
   * ```
   */
  answerQuestion(
    setupID: string,
    params: AgentSetupAnswerQuestionParams,
    options?: RequestOptions,
  ): APIPromise<AgentSetupAnswerQuestionResponse> {
    const { agentId, ...body } = params;
    return this._client.post(path`/v1/agent/${agentId}/setup/${setupID}/answer`, { body, ...options });
  }

  /**
   * Stops a running setup. Flows and metrics it already created are kept; no run
   * plan is made. Refused once setup has finished.
   *
   * @example
   * ```ts
   * const response = await client.agentSetup.cancel(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  cancel(
    setupID: string,
    params: AgentSetupCancelParams,
    options?: RequestOptions,
  ): APIPromise<AgentSetupCancelResponse> {
    const { agentId } = params;
    return this._client.post(path`/v1/agent/${agentId}/setup/${setupID}/cancel`, options);
  }

  /**
   * Returns one setup, for example the one a webhook named.
   *
   * @example
   * ```ts
   * const response = await client.agentSetup.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  getByID(
    setupID: string,
    params: AgentSetupGetByIDParams,
    options?: RequestOptions,
  ): APIPromise<AgentSetupGetByIDResponse> {
    const { agentId } = params;
    return this._client.get(path`/v1/agent/${agentId}/setup/${setupID}`, options);
  }

  /**
   * Returns the agent's most recent setup: its progress, the run plan it created,
   * and every flow, metric and check it added or left out, with the reason and the
   * source it came from.
   *
   * @example
   * ```ts
   * const response = await client.agentSetup.getLatest(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  getLatest(agentID: string, options?: RequestOptions): APIPromise<AgentSetupGetLatestResponse> {
    return this._client.get(path`/v1/agent/${agentID}/setup`, options);
  }

  /**
   * Tells a running setup what to focus on or avoid, in your own words. It reads it
   * on its next turn and it outranks setup's own plan. Refused once setup has
   * finished.
   *
   * @example
   * ```ts
   * const response = await client.agentSetup.sendGuidance(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     text: 'x',
   *   },
   * );
   * ```
   */
  sendGuidance(
    setupID: string,
    params: AgentSetupSendGuidanceParams,
    options?: RequestOptions,
  ): APIPromise<AgentSetupSendGuidanceResponse> {
    const { agentId, ...body } = params;
    return this._client.post(path`/v1/agent/${agentId}/setup/${setupID}/guidance`, { body, ...options });
  }
}

export interface AgentSetupCreateResponse {
  /**
   * The tests Roark generated for an agent, and why
   */
  data: AgentSetupCreateResponse.Data;
}

export namespace AgentSetupCreateResponse {
  /**
   * The tests Roark generated for an agent, and why
   */
  export interface Data {
    /**
     * Setup ID
     */
    id: string;

    /**
     * What setup did and said, in order
     */
    activity: Array<Data.Activity>;

    agentId: string;

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
     * The checklist setup works through
     */
    layers: Array<Data.Layer>;

    /**
     * The question setup is waiting on, while NEEDS_INPUT
     */
    question: Data.Question | null;

    /**
     * The run plan to start once setup completes
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
     * One thing setup did or said, in order
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
     * Something setup created or chose to leave out, and why
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
      layer: 'CORE' | 'INDUSTRY' | 'CAPABILITY' | 'AGENT_CONTEXT' | 'EXPLORATION' | 'CUSTOMER_INSTRUCTIONS';

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
         * The exploration call it came from
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

        type: 'CATALOGUE' | 'PROMPT' | 'DESCRIPTION' | 'WEBSITE' | 'EXPLORATION_CALL' | 'INSTRUCTIONS';

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
      layer: 'CORE' | 'INDUSTRY' | 'CAPABILITY' | 'AGENT_CONTEXT' | 'EXPLORATION' | 'CUSTOMER_INSTRUCTIONS';

      /**
       * COVERED: tests exist for it, or are added when setup finishes. SKIPPED: setup
       * could not test it and said why. OPEN: not covered yet; setup does not finish
       * while a layer is open. NOT_APPLICABLE: nothing to test it from.
       */
      status: 'COVERED' | 'SKIPPED' | 'OPEN' | 'NOT_APPLICABLE';

      summary: string;
    }

    /**
     * The question setup is waiting on, while NEEDS_INPUT
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

export interface AgentSetupAnswerQuestionResponse {
  /**
   * The tests Roark generated for an agent, and why
   */
  data: AgentSetupAnswerQuestionResponse.Data;
}

export namespace AgentSetupAnswerQuestionResponse {
  /**
   * The tests Roark generated for an agent, and why
   */
  export interface Data {
    /**
     * Setup ID
     */
    id: string;

    /**
     * What setup did and said, in order
     */
    activity: Array<Data.Activity>;

    agentId: string;

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
     * The checklist setup works through
     */
    layers: Array<Data.Layer>;

    /**
     * The question setup is waiting on, while NEEDS_INPUT
     */
    question: Data.Question | null;

    /**
     * The run plan to start once setup completes
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
     * One thing setup did or said, in order
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
     * Something setup created or chose to leave out, and why
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
      layer: 'CORE' | 'INDUSTRY' | 'CAPABILITY' | 'AGENT_CONTEXT' | 'EXPLORATION' | 'CUSTOMER_INSTRUCTIONS';

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
         * The exploration call it came from
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

        type: 'CATALOGUE' | 'PROMPT' | 'DESCRIPTION' | 'WEBSITE' | 'EXPLORATION_CALL' | 'INSTRUCTIONS';

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
      layer: 'CORE' | 'INDUSTRY' | 'CAPABILITY' | 'AGENT_CONTEXT' | 'EXPLORATION' | 'CUSTOMER_INSTRUCTIONS';

      /**
       * COVERED: tests exist for it, or are added when setup finishes. SKIPPED: setup
       * could not test it and said why. OPEN: not covered yet; setup does not finish
       * while a layer is open. NOT_APPLICABLE: nothing to test it from.
       */
      status: 'COVERED' | 'SKIPPED' | 'OPEN' | 'NOT_APPLICABLE';

      summary: string;
    }

    /**
     * The question setup is waiting on, while NEEDS_INPUT
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

export interface AgentSetupCancelResponse {
  /**
   * The tests Roark generated for an agent, and why
   */
  data: AgentSetupCancelResponse.Data;
}

export namespace AgentSetupCancelResponse {
  /**
   * The tests Roark generated for an agent, and why
   */
  export interface Data {
    /**
     * Setup ID
     */
    id: string;

    /**
     * What setup did and said, in order
     */
    activity: Array<Data.Activity>;

    agentId: string;

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
     * The checklist setup works through
     */
    layers: Array<Data.Layer>;

    /**
     * The question setup is waiting on, while NEEDS_INPUT
     */
    question: Data.Question | null;

    /**
     * The run plan to start once setup completes
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
     * One thing setup did or said, in order
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
     * Something setup created or chose to leave out, and why
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
      layer: 'CORE' | 'INDUSTRY' | 'CAPABILITY' | 'AGENT_CONTEXT' | 'EXPLORATION' | 'CUSTOMER_INSTRUCTIONS';

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
         * The exploration call it came from
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

        type: 'CATALOGUE' | 'PROMPT' | 'DESCRIPTION' | 'WEBSITE' | 'EXPLORATION_CALL' | 'INSTRUCTIONS';

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
      layer: 'CORE' | 'INDUSTRY' | 'CAPABILITY' | 'AGENT_CONTEXT' | 'EXPLORATION' | 'CUSTOMER_INSTRUCTIONS';

      /**
       * COVERED: tests exist for it, or are added when setup finishes. SKIPPED: setup
       * could not test it and said why. OPEN: not covered yet; setup does not finish
       * while a layer is open. NOT_APPLICABLE: nothing to test it from.
       */
      status: 'COVERED' | 'SKIPPED' | 'OPEN' | 'NOT_APPLICABLE';

      summary: string;
    }

    /**
     * The question setup is waiting on, while NEEDS_INPUT
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

export interface AgentSetupGetByIDResponse {
  /**
   * The tests Roark generated for an agent, and why
   */
  data: AgentSetupGetByIDResponse.Data;
}

export namespace AgentSetupGetByIDResponse {
  /**
   * The tests Roark generated for an agent, and why
   */
  export interface Data {
    /**
     * Setup ID
     */
    id: string;

    /**
     * What setup did and said, in order
     */
    activity: Array<Data.Activity>;

    agentId: string;

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
     * The checklist setup works through
     */
    layers: Array<Data.Layer>;

    /**
     * The question setup is waiting on, while NEEDS_INPUT
     */
    question: Data.Question | null;

    /**
     * The run plan to start once setup completes
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
     * One thing setup did or said, in order
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
     * Something setup created or chose to leave out, and why
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
      layer: 'CORE' | 'INDUSTRY' | 'CAPABILITY' | 'AGENT_CONTEXT' | 'EXPLORATION' | 'CUSTOMER_INSTRUCTIONS';

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
         * The exploration call it came from
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

        type: 'CATALOGUE' | 'PROMPT' | 'DESCRIPTION' | 'WEBSITE' | 'EXPLORATION_CALL' | 'INSTRUCTIONS';

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
      layer: 'CORE' | 'INDUSTRY' | 'CAPABILITY' | 'AGENT_CONTEXT' | 'EXPLORATION' | 'CUSTOMER_INSTRUCTIONS';

      /**
       * COVERED: tests exist for it, or are added when setup finishes. SKIPPED: setup
       * could not test it and said why. OPEN: not covered yet; setup does not finish
       * while a layer is open. NOT_APPLICABLE: nothing to test it from.
       */
      status: 'COVERED' | 'SKIPPED' | 'OPEN' | 'NOT_APPLICABLE';

      summary: string;
    }

    /**
     * The question setup is waiting on, while NEEDS_INPUT
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

export interface AgentSetupGetLatestResponse {
  /**
   * The tests Roark generated for an agent, and why
   */
  data: AgentSetupGetLatestResponse.Data;
}

export namespace AgentSetupGetLatestResponse {
  /**
   * The tests Roark generated for an agent, and why
   */
  export interface Data {
    /**
     * Setup ID
     */
    id: string;

    /**
     * What setup did and said, in order
     */
    activity: Array<Data.Activity>;

    agentId: string;

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
     * The checklist setup works through
     */
    layers: Array<Data.Layer>;

    /**
     * The question setup is waiting on, while NEEDS_INPUT
     */
    question: Data.Question | null;

    /**
     * The run plan to start once setup completes
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
     * One thing setup did or said, in order
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
     * Something setup created or chose to leave out, and why
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
      layer: 'CORE' | 'INDUSTRY' | 'CAPABILITY' | 'AGENT_CONTEXT' | 'EXPLORATION' | 'CUSTOMER_INSTRUCTIONS';

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
         * The exploration call it came from
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

        type: 'CATALOGUE' | 'PROMPT' | 'DESCRIPTION' | 'WEBSITE' | 'EXPLORATION_CALL' | 'INSTRUCTIONS';

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
      layer: 'CORE' | 'INDUSTRY' | 'CAPABILITY' | 'AGENT_CONTEXT' | 'EXPLORATION' | 'CUSTOMER_INSTRUCTIONS';

      /**
       * COVERED: tests exist for it, or are added when setup finishes. SKIPPED: setup
       * could not test it and said why. OPEN: not covered yet; setup does not finish
       * while a layer is open. NOT_APPLICABLE: nothing to test it from.
       */
      status: 'COVERED' | 'SKIPPED' | 'OPEN' | 'NOT_APPLICABLE';

      summary: string;
    }

    /**
     * The question setup is waiting on, while NEEDS_INPUT
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

export interface AgentSetupSendGuidanceResponse {
  /**
   * The tests Roark generated for an agent, and why
   */
  data: AgentSetupSendGuidanceResponse.Data;
}

export namespace AgentSetupSendGuidanceResponse {
  /**
   * The tests Roark generated for an agent, and why
   */
  export interface Data {
    /**
     * Setup ID
     */
    id: string;

    /**
     * What setup did and said, in order
     */
    activity: Array<Data.Activity>;

    agentId: string;

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
     * The checklist setup works through
     */
    layers: Array<Data.Layer>;

    /**
     * The question setup is waiting on, while NEEDS_INPUT
     */
    question: Data.Question | null;

    /**
     * The run plan to start once setup completes
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
     * One thing setup did or said, in order
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
     * Something setup created or chose to leave out, and why
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
      layer: 'CORE' | 'INDUSTRY' | 'CAPABILITY' | 'AGENT_CONTEXT' | 'EXPLORATION' | 'CUSTOMER_INSTRUCTIONS';

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
         * The exploration call it came from
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

        type: 'CATALOGUE' | 'PROMPT' | 'DESCRIPTION' | 'WEBSITE' | 'EXPLORATION_CALL' | 'INSTRUCTIONS';

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
      layer: 'CORE' | 'INDUSTRY' | 'CAPABILITY' | 'AGENT_CONTEXT' | 'EXPLORATION' | 'CUSTOMER_INSTRUCTIONS';

      /**
       * COVERED: tests exist for it, or are added when setup finishes. SKIPPED: setup
       * could not test it and said why. OPEN: not covered yet; setup does not finish
       * while a layer is open. NOT_APPLICABLE: nothing to test it from.
       */
      status: 'COVERED' | 'SKIPPED' | 'OPEN' | 'NOT_APPLICABLE';

      summary: string;
    }

    /**
     * The question setup is waiting on, while NEEDS_INPUT
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

export interface AgentSetupCreateParams {
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
  explore?: AgentSetupCreateParams.Explore;

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

export namespace AgentSetupCreateParams {
  /**
   * Exploration settings
   */
  export interface Explore {
    /**
     * Whether Roark calls the agent to discover what it does before finishing setup.
     * Exploration calls are billed.
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

export interface AgentSetupAnswerQuestionParams {
  /**
   * Path param
   */
  agentId: string;

  /**
   * Body param: What you want setup to know
   */
  text: string;
}

export interface AgentSetupCancelParams {
  agentId: string;
}

export interface AgentSetupGetByIDParams {
  agentId: string;
}

export interface AgentSetupSendGuidanceParams {
  /**
   * Path param
   */
  agentId: string;

  /**
   * Body param: What you want setup to know
   */
  text: string;
}

export declare namespace AgentSetup {
  export {
    type AgentSetupCreateResponse as AgentSetupCreateResponse,
    type AgentSetupAnswerQuestionResponse as AgentSetupAnswerQuestionResponse,
    type AgentSetupCancelResponse as AgentSetupCancelResponse,
    type AgentSetupGetByIDResponse as AgentSetupGetByIDResponse,
    type AgentSetupGetLatestResponse as AgentSetupGetLatestResponse,
    type AgentSetupSendGuidanceResponse as AgentSetupSendGuidanceResponse,
    type AgentSetupCreateParams as AgentSetupCreateParams,
    type AgentSetupAnswerQuestionParams as AgentSetupAnswerQuestionParams,
    type AgentSetupCancelParams as AgentSetupCancelParams,
    type AgentSetupGetByIDParams as AgentSetupGetByIDParams,
    type AgentSetupSendGuidanceParams as AgentSetupSendGuidanceParams,
  };
}
