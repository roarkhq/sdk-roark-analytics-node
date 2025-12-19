// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Call extends APIResource {
  /**
   * Create a new call with recording, transcript, agents, and customers
   */
  create(body: CallCreateParams, options?: Core.RequestOptions): Core.APIPromise<CallCreateResponse> {
    return this._client.post('/v1/call', { body, ...options });
  }

  /**
   * Retrieve an existing call by its unique identifier
   */
  getById(callId: string, options?: Core.RequestOptions): Core.APIPromise<CallGetByIDResponse> {
    return this._client.get(`/v1/call/${callId}`, options);
  }

  /**
   * Fetch all evaluation run results for a specific call.
   */
  getEvaluationRuns(
    callId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CallGetEvaluationRunsResponse> {
    return this._client.get(`/v1/call/${callId}/evaluation-run`, options);
  }

  /**
   * Fetch all call-level metrics for a specific call, including both
   * system-generated and custom metrics. Only returns successfully computed metrics.
   */
  getMetrics(
    callId: string,
    query?: CallGetMetricsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CallGetMetricsResponse>;
  getMetrics(callId: string, options?: Core.RequestOptions): Core.APIPromise<CallGetMetricsResponse>;
  getMetrics(
    callId: string,
    query: CallGetMetricsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<CallGetMetricsResponse> {
    if (isRequestOptions(query)) {
      return this.getMetrics(callId, {}, query);
    }
    return this._client.get(`/v1/call/${callId}/metrics`, { query, ...options });
  }

  /**
   * Fetch detailed sentiment analysis results for a specific call, including
   * emotional tone, key phrases, and sentiment scores.
   */
  getSentimentRuns(
    callId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CallGetSentimentRunsResponse> {
    return this._client.get(`/v1/call/${callId}/sentiment-run`, options);
  }
}

export interface CallCreateResponse {
  /**
   * Response after creating a call
   */
  data: CallCreateResponse.Data;
}

export namespace CallCreateResponse {
  /**
   * Response after creating a call
   */
  export interface Data {
    /**
     * Unique identifier for the call
     */
    id: string;

    agents: Array<Data.Agent> | null;

    /**
     * Direction of the call (inbound or outbound)
     */
    callDirection: 'INBOUND' | 'OUTBOUND';

    createdAt: string | null;

    customers: Array<Data.Customer> | null;

    /**
     * ID of the project this call belongs to
     */
    projectId: string;

    /**
     * Timestamp when the call started
     */
    startedAt: string;

    status: 'RINGING' | 'IN_PROGRESS' | 'ENDED' | null;
  }

  export namespace Data {
    export interface Agent {
      id: string;

      endpoint?: Agent.Endpoint | null;
    }

    export namespace Agent {
      export interface Endpoint {
        id: string;

        environment: string;

        phoneNumberE164?: string | null;
      }
    }

    export interface Customer {
      phoneNumberE164?: string | null;
    }
  }
}

export interface CallGetByIDResponse {
  /**
   * Response containing call information
   */
  data: CallGetByIDResponse.Data;
}

export namespace CallGetByIDResponse {
  /**
   * Response containing call information
   */
  export interface Data {
    /**
     * Unique identifier for the call
     */
    id: string;

    /**
     * Direction of the call (inbound or outbound)
     */
    callDirection: 'INBOUND' | 'OUTBOUND';

    /**
     * ID of the project this call belongs to
     */
    projectId: string;

    /**
     * Timestamp when the call started
     */
    startedAt: string;

    /**
     * Agent information
     */
    agents?: Array<Data.Agent> | null;

    /**
     * Timestamp when the call record was created
     */
    createdAt?: string | null;

    /**
     * Customer information
     */
    customers?: Array<Data.Customer> | null;

    /**
     * Duration of the call in milliseconds
     */
    durationMs?: number | null;

    /**
     * Timestamp when the call ended
     */
    endedAt?: string | null;

    /**
     * Status indicating how the call ended
     */
    endedStatus?:
      | 'PARTICIPANTS_DID_NOT_SPEAK'
      | 'AGENT_DID_NOT_ANSWER'
      | 'AGENT_DID_NOT_SPEAK'
      | 'AGENT_STOPPED_SPEAKING'
      | 'AGENT_ENDED_CALL'
      | 'AGENT_TRANSFERRED_CALL'
      | 'AGENT_BUSY'
      | 'AGENT_ERROR'
      | 'CUSTOMER_ENDED_CALL'
      | 'VOICE_MAIL_REACHED'
      | 'SILENCE_TIME_OUT'
      | 'PHONE_CALL_PROVIDER_CONNECTION_ERROR'
      | 'CUSTOMER_DID_NOT_ANSWER'
      | 'CUSTOMER_DID_NOT_SPEAK'
      | 'CUSTOMER_STOPPED_SPEAKING'
      | 'CUSTOMER_BUSY'
      | 'DIAL_ERROR'
      | 'MAX_DURATION_REACHED'
      | 'UNKNOWN'
      | null;

    /**
     * Pre-signed URL to the call recording (expires in 1 hour)
     */
    recordingUrl?: string | null;

    /**
     * ID of the simulation job if this call was generated by a simulation
     */
    simulationJobId?: string | null;

    /**
     * Current status of the call
     */
    status?: 'RINGING' | 'IN_PROGRESS' | 'ENDED' | null;

    /**
     * Auto-generated summary of the call conversation
     */
    summary?: string | null;

    /**
     * ID of the call that superseded this one (if applicable)
     */
    supersededByCallId?: string | null;

    /**
     * Auto-generated title for the call based on content
     */
    title?: string | null;

    /**
     * Timestamp when the call record was last updated
     */
    updatedAt?: string | null;
  }

  export namespace Data {
    export interface Agent {
      id: string;

      endpoint?: Agent.Endpoint | null;
    }

    export namespace Agent {
      export interface Endpoint {
        id: string;

        environment: string;

        phoneNumberE164?: string | null;
      }
    }

    export interface Customer {
      phoneNumberE164?: string | null;
    }
  }
}

export interface CallGetEvaluationRunsResponse {
  /**
   * Evaluation run response payload
   */
  data: Array<CallGetEvaluationRunsResponse.Data>;
}

export namespace CallGetEvaluationRunsResponse {
  export interface Data {
    /**
     * All block runs for this evaluator, including skipped ones
     */
    blockRuns: Array<Data.BlockRun>;

    evaluator: Data.Evaluator;

    evidence: Array<Data.Evidence>;

    metrics: Array<Data.Metric>;

    /**
     * Status of the evaluator run
     */
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

    /**
     * ID of the evaluator run
     */
    id?: string;

    /**
     * When the evaluator run completed
     */
    completedAt?: string | null;

    /**
     * Result of the evaluator run based on score threshold (IRRELEVANT is mapped to
     * SKIPPED)
     */
    result?: 'SUCCESS' | 'FAILURE' | 'SKIPPED' | null;

    /**
     * Score of the evaluation run (0-1)
     */
    score?: number | null;

    /**
     * When the evaluator run started
     */
    startedAt?: string | null;

    /**
     * Summary of the evaluation run
     */
    summary?: string | null;
  }

  export namespace Data {
    export interface BlockRun {
      /**
       * ID of the block definition
       */
      blockDefinitionId: string;

      /**
       * Name of the evaluation block
       */
      blockName: string;

      /**
       * ID of the block run instance
       */
      blockRunId: string;

      /**
       * When the block run was created
       */
      createdAt: string;

      /**
       * Reason for the outcome (pass/fail explanation or skip reason)
       */
      reason: string | null;

      /**
       * Result of the block run
       */
      result: 'PASSED' | 'FAILED' | 'SKIPPED' | null;

      /**
       * Score of the block run (0-1)
       */
      score: number | null;

      /**
       * Status of the block run
       */
      status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
    }

    export interface Evaluator {
      /**
       * ID of the evaluator
       */
      id: string;

      /**
       * Name of the evaluator
       */
      name: string;

      /**
       * Weight of the evaluator
       */
      weight?: number;
    }

    export interface Evidence {
      /**
       * Comment text of the evidence
       */
      commentText: string | null;

      /**
       * Created at of the evidence
       */
      createdAt: string;

      /**
       * Is positive of the evidence
       */
      isPositive: boolean;

      /**
       * Snippet text of the evidence
       */
      snippetText: string;
    }

    export interface Metric {
      /**
       * Boolean value of the metric
       */
      booleanValue: boolean | null;

      /**
       * Confidence level of the metric (0-1)
       */
      confidence: number | null;

      /**
       * Created at of the metric
       */
      createdAt: string;

      /**
       * Name of the metric
       */
      name: string;

      /**
       * Numeric value of the metric
       */
      numericValue: number | null;

      /**
       * Reasoning of the metric
       */
      reasoning: string | null;

      /**
       * Role of the metric
       */
      role: string;

      /**
       * Text value of the metric
       */
      textValue: string | null;

      /**
       * Value type of the metric
       */
      valueType: string;
    }
  }
}

export interface CallGetMetricsResponse {
  /**
   * Call metrics response payload grouped by metric definition
   */
  data: Array<CallGetMetricsResponse.Data>;
}

export namespace CallGetMetricsResponse {
  /**
   * Call metric data grouped by metric definition
   */
  export interface Data {
    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * Unique identifier for the metric definition
     */
    metricDefinitionId: string;

    /**
     * Stable metric identifier
     */
    metricId: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * Whether metric is global or per-participant
     */
    scope: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * Array of metric values (multiple for PER_PARTICIPANT metrics, or multiple
     * segments/turns)
     */
    values: Array<Data.Value>;

    /**
     * Unit information if applicable
     */
    unit?: Data.Unit;
  }

  export namespace Data {
    export interface Value {
      /**
       * ISO 8601 timestamp when the metric was computed
       */
      computedAt: string;

      /**
       * Confidence score (0-1) for the computed value. Defaults to 1.0 for deterministic
       * metrics.
       */
      confidence: number;

      /**
       * Context level: CALL (entire call), SEGMENT (single segment), SEGMENT_RANGE
       * (between/across segments)
       */
      context: 'CALL' | 'SEGMENT' | 'SEGMENT_RANGE';

      /**
       * The metric value (type depends on outputType)
       */
      value: number | boolean | string;

      /**
       * Starting segment information (for SEGMENT_RANGE context metrics)
       */
      fromSegment?: Value.FromSegment;

      /**
       * Role of participant (only for PER_PARTICIPANT metrics)
       */
      participantRole?: 'agent' | 'customer';

      /**
       * Segment information (for SEGMENT context metrics)
       */
      segment?: Value.Segment;

      /**
       * Ending segment information (for SEGMENT_RANGE context metrics)
       */
      toSegment?: Value.ToSegment;

      /**
       * Explanation for the metric value (especially useful for AI-computed metrics)
       */
      valueReasoning?: string;
    }

    export namespace Value {
      /**
       * Starting segment information (for SEGMENT_RANGE context metrics)
       */
      export interface FromSegment {
        /**
         * Starting segment ID
         */
        id: string;

        /**
         * End time offset in milliseconds
         */
        endOffsetMs: number;

        /**
         * Start time offset in milliseconds
         */
        startOffsetMs: number;

        /**
         * Starting segment text content
         */
        text: string;
      }

      /**
       * Segment information (for SEGMENT context metrics)
       */
      export interface Segment {
        /**
         * Segment ID
         */
        id: string;

        /**
         * End time offset in milliseconds
         */
        endOffsetMs: number;

        /**
         * Start time offset in milliseconds
         */
        startOffsetMs: number;

        /**
         * Segment text content
         */
        text: string;
      }

      /**
       * Ending segment information (for SEGMENT_RANGE context metrics)
       */
      export interface ToSegment {
        /**
         * Ending segment ID
         */
        id: string;

        /**
         * End time offset in milliseconds
         */
        endOffsetMs: number;

        /**
         * Start time offset in milliseconds
         */
        startOffsetMs: number;

        /**
         * Ending segment text content
         */
        text: string;
      }
    }

    /**
     * Unit information if applicable
     */
    export interface Unit {
      /**
       * Name of the unit
       */
      name: string;

      /**
       * Symbol for the unit
       */
      symbol: string | null;
    }
  }
}

export interface CallGetSentimentRunsResponse {
  /**
   * Sentiment run response payload
   */
  data: CallGetSentimentRunsResponse.Data;
}

export namespace CallGetSentimentRunsResponse {
  /**
   * Sentiment run response payload
   */
  export interface Data {
    /**
     * Status of the sentiment run
     */
    status: string;

    /**
     * NEUTRAL / NEGATIVE / POSITIVE
     */
    averageCategoricalSentiment?: string;

    /**
     * Average sentiment score between 0-1 of the call
     */
    averageSentiment?: number;

    /**
     * Common emotion of the call
     */
    commonEmotion?: string;
  }
}

export type CallCreateParams = CallCreateParams.Variant0 | CallCreateParams.Variant1;

export declare namespace CallCreateParams {
  export interface Variant0 {
    /**
     * Single agent participating in the call. Use this for simpler API when you have
     * only one agent.
     */
    agent: Variant0.UnionMember0 | Variant0.UnionMember1 | Variant0.UnionMember2;

    /**
     * Direction of the call (INBOUND or OUTBOUND)
     */
    callDirection: 'INBOUND' | 'OUTBOUND';

    /**
     * Interface type of the call (PHONE or WEB)
     */
    interfaceType: 'PHONE' | 'WEB';

    /**
     * URL of source recording (must be an accessible WAV, MP3, or MP4 file). Can be a
     * signed URL.
     */
    recordingUrl: string;

    /**
     * When the call started (ISO 8601 format)
     */
    startedAt: string;

    /**
     * Single customer participating in the call. Use this for simpler API when you
     * have only one customer.
     */
    customer?: Variant0.Customer;

    /**
     * High-level call end status, indicating how the call terminated
     */
    endedStatus?:
      | 'PARTICIPANTS_DID_NOT_SPEAK'
      | 'AGENT_DID_NOT_ANSWER'
      | 'AGENT_DID_NOT_SPEAK'
      | 'AGENT_STOPPED_SPEAKING'
      | 'AGENT_ENDED_CALL'
      | 'AGENT_TRANSFERRED_CALL'
      | 'AGENT_BUSY'
      | 'AGENT_ERROR'
      | 'CUSTOMER_ENDED_CALL'
      | 'VOICE_MAIL_REACHED'
      | 'SILENCE_TIME_OUT'
      | 'PHONE_CALL_PROVIDER_CONNECTION_ERROR'
      | 'CUSTOMER_DID_NOT_ANSWER'
      | 'CUSTOMER_DID_NOT_SPEAK'
      | 'CUSTOMER_STOPPED_SPEAKING'
      | 'CUSTOMER_BUSY'
      | 'DIAL_ERROR'
      | 'MAX_DURATION_REACHED'
      | 'UNKNOWN';

    /**
     * Custom properties to include with the call. These can be used for filtering and
     * will show in the call details page
     */
    properties?: { [key: string]: unknown };

    /**
     * URL of source stereo recording. Must be accessible. Can be a signed URL.
     * Supported formats: WAV, MP3, MP4.
     */
    stereoRecordingUrl?: string;

    /**
     * List of tool invocations made during the call
     */
    toolInvocations?: Array<Variant0.ToolInvocation>;

    /**
     * List of transcript entries made during the call
     */
    transcript?: Array<Variant0.UnionMember0 | Variant0.UnionMember1>;
  }

  export namespace Variant0 {
    export interface UnionMember0 {
      /**
       * Existing Roark agent ID
       */
      roarkId: string;

      /**
       * Endpoint configuration for this agent (optional)
       */
      endpoint?: UnionMember0.ID | UnionMember0.UnionMember1;

      /**
       * Agent's prompt configuration
       */
      prompt?: UnionMember0.Prompt;
    }

    export namespace UnionMember0 {
      export interface ID {
        /**
         * Existing Roark endpoint ID
         */
        id: string;
      }

      /**
       * Lookup or create endpoint if one with these values does not exist
       */
      export interface UnionMember1 {
        /**
         * Type of endpoint (phone or websocket)
         */
        type: string;

        /**
         * Endpoint value (phone number in E.164 format or websocket URL)
         */
        value: string;

        /**
         * Call direction for this endpoint
         */
        direction?: string;
      }

      /**
       * Agent's prompt configuration
       */
      export interface Prompt {
        /**
         * The agent's system prompt used during this call
         */
        resolvedPrompt: string;
      }
    }

    export interface UnionMember1 {
      /**
       * Existing custom ID for a Roark agent
       */
      customId: string;

      /**
       * Endpoint configuration for this agent (optional)
       */
      endpoint?: UnionMember1.ID | UnionMember1.UnionMember1;

      /**
       * Agent's prompt configuration
       */
      prompt?: UnionMember1.Prompt;
    }

    export namespace UnionMember1 {
      export interface ID {
        /**
         * Existing Roark endpoint ID
         */
        id: string;
      }

      /**
       * Lookup or create endpoint if one with these values does not exist
       */
      export interface UnionMember1 {
        /**
         * Type of endpoint (phone or websocket)
         */
        type: string;

        /**
         * Endpoint value (phone number in E.164 format or websocket URL)
         */
        value: string;

        /**
         * Call direction for this endpoint
         */
        direction?: string;
      }

      /**
       * Agent's prompt configuration
       */
      export interface Prompt {
        /**
         * The agent's system prompt used during this call
         */
        resolvedPrompt: string;
      }
    }

    /**
     * Match existing agent by name, description, and custom ID, or create a new one if
     * no match is found
     */
    export interface UnionMember2 {
      /**
       * Agent name
       */
      name: string;

      /**
       * Agent custom ID
       */
      customId?: string;

      /**
       * Agent description
       */
      description?: string;

      /**
       * Endpoint configuration for this agent (optional)
       */
      endpoint?: UnionMember2.ID | UnionMember2.UnionMember1;

      /**
       * Agent's prompt configuration
       */
      prompt?: UnionMember2.Prompt;
    }

    export namespace UnionMember2 {
      export interface ID {
        /**
         * Existing Roark endpoint ID
         */
        id: string;
      }

      /**
       * Lookup or create endpoint if one with these values does not exist
       */
      export interface UnionMember1 {
        /**
         * Type of endpoint (phone or websocket)
         */
        type: string;

        /**
         * Endpoint value (phone number in E.164 format or websocket URL)
         */
        value: string;

        /**
         * Call direction for this endpoint
         */
        direction?: string;
      }

      /**
       * Agent's prompt configuration
       */
      export interface Prompt {
        /**
         * The agent's system prompt used during this call
         */
        resolvedPrompt: string;
      }
    }

    /**
     * Single customer participating in the call. Use this for simpler API when you
     * have only one customer.
     */
    export interface Customer {
      /**
       * Customer phone number in E.164 format (e.g., +14155551234)
       */
      phoneNumberE164: string | null;

      /**
       * Label to identify this customer in the transcript (e.g., "speaker-01",
       * "speaker-02")
       */
      label?: string | null;
    }

    export interface ToolInvocation {
      /**
       * Name of the tool that was invoked
       */
      name: string;

      /**
       * Parameters provided to the tool during invocation
       */
      parameters: { [key: string]: ToolInvocation.UnionMember0 | unknown };

      /**
       * Result returned by the tool after execution. Can be a string or a JSON object
       */
      result: string | { [key: string]: unknown };

      /**
       * Offset in milliseconds from the start of the call when the tool was invoked
       */
      startOffsetMs: number;

      /**
       * Description of when the tool should be invoked
       */
      description?: string;

      /**
       * Offset in milliseconds from the start of the call when the tool execution
       * completed. Used to calculate duration of the tool execution
       */
      endOffsetMs?: number;
    }

    export namespace ToolInvocation {
      export interface UnionMember0 {
        description?: string;

        type?: 'string' | 'number' | 'boolean';

        value?: unknown;
      }
    }

    export interface UnionMember0 {
      endOffsetMs: number;

      role: 'AGENT';

      startOffsetMs: number;

      text: string;

      agent?: UnionMember0.Agent;

      languageCode?: string;
    }

    export namespace UnionMember0 {
      export interface Agent {
        customId?: string;

        roarkId?: string;
      }
    }

    export interface UnionMember1 {
      endOffsetMs: number;

      role: 'CUSTOMER';

      startOffsetMs: number;

      text: string;

      customer?: UnionMember1.Customer;

      languageCode?: string;
    }

    export namespace UnionMember1 {
      export interface Customer {
        label?: string;

        phoneNumberE164?: string;
      }
    }
  }

  export interface Variant1 {
    /**
     * Agents participating in the call. Each agent requires identification and prompt
     * information.
     */
    agents: Array<Variant1.UnionMember0 | Variant1.UnionMember1 | Variant1.UnionMember2>;

    /**
     * Direction of the call (INBOUND or OUTBOUND)
     */
    callDirection: 'INBOUND' | 'OUTBOUND';

    /**
     * Interface type of the call (PHONE or WEB)
     */
    interfaceType: 'PHONE' | 'WEB';

    /**
     * URL of source recording (must be an accessible WAV, MP3, or MP4 file). Can be a
     * signed URL.
     */
    recordingUrl: string;

    /**
     * When the call started (ISO 8601 format)
     */
    startedAt: string;

    /**
     * Customers participating in the call.
     */
    customers?: Array<Variant1.Customer>;

    /**
     * High-level call end status, indicating how the call terminated
     */
    endedStatus?:
      | 'PARTICIPANTS_DID_NOT_SPEAK'
      | 'AGENT_DID_NOT_ANSWER'
      | 'AGENT_DID_NOT_SPEAK'
      | 'AGENT_STOPPED_SPEAKING'
      | 'AGENT_ENDED_CALL'
      | 'AGENT_TRANSFERRED_CALL'
      | 'AGENT_BUSY'
      | 'AGENT_ERROR'
      | 'CUSTOMER_ENDED_CALL'
      | 'VOICE_MAIL_REACHED'
      | 'SILENCE_TIME_OUT'
      | 'PHONE_CALL_PROVIDER_CONNECTION_ERROR'
      | 'CUSTOMER_DID_NOT_ANSWER'
      | 'CUSTOMER_DID_NOT_SPEAK'
      | 'CUSTOMER_STOPPED_SPEAKING'
      | 'CUSTOMER_BUSY'
      | 'DIAL_ERROR'
      | 'MAX_DURATION_REACHED'
      | 'UNKNOWN';

    /**
     * Custom properties to include with the call. These can be used for filtering and
     * will show in the call details page
     */
    properties?: { [key: string]: unknown };

    /**
     * URL of source stereo recording. Must be accessible. Can be a signed URL.
     * Supported formats: WAV, MP3, MP4.
     */
    stereoRecordingUrl?: string;

    /**
     * List of tool invocations made during the call
     */
    toolInvocations?: Array<Variant1.ToolInvocation>;

    /**
     * List of transcript entries made during the call
     */
    transcript?: Array<Variant1.UnionMember0 | Variant1.UnionMember1>;
  }

  export namespace Variant1 {
    export interface UnionMember0 {
      /**
       * Existing Roark agent ID
       */
      roarkId: string;

      /**
       * Endpoint configuration for this agent (optional)
       */
      endpoint?: UnionMember0.ID | UnionMember0.UnionMember1;

      /**
       * Agent's prompt configuration
       */
      prompt?: UnionMember0.Prompt;
    }

    export namespace UnionMember0 {
      export interface ID {
        /**
         * Existing Roark endpoint ID
         */
        id: string;
      }

      /**
       * Lookup or create endpoint if one with these values does not exist
       */
      export interface UnionMember1 {
        /**
         * Type of endpoint (phone or websocket)
         */
        type: string;

        /**
         * Endpoint value (phone number in E.164 format or websocket URL)
         */
        value: string;

        /**
         * Call direction for this endpoint
         */
        direction?: string;
      }

      /**
       * Agent's prompt configuration
       */
      export interface Prompt {
        /**
         * The agent's system prompt used during this call
         */
        resolvedPrompt: string;
      }
    }

    export interface UnionMember1 {
      /**
       * Existing custom ID for a Roark agent
       */
      customId: string;

      /**
       * Endpoint configuration for this agent (optional)
       */
      endpoint?: UnionMember1.ID | UnionMember1.UnionMember1;

      /**
       * Agent's prompt configuration
       */
      prompt?: UnionMember1.Prompt;
    }

    export namespace UnionMember1 {
      export interface ID {
        /**
         * Existing Roark endpoint ID
         */
        id: string;
      }

      /**
       * Lookup or create endpoint if one with these values does not exist
       */
      export interface UnionMember1 {
        /**
         * Type of endpoint (phone or websocket)
         */
        type: string;

        /**
         * Endpoint value (phone number in E.164 format or websocket URL)
         */
        value: string;

        /**
         * Call direction for this endpoint
         */
        direction?: string;
      }

      /**
       * Agent's prompt configuration
       */
      export interface Prompt {
        /**
         * The agent's system prompt used during this call
         */
        resolvedPrompt: string;
      }
    }

    /**
     * Match existing agent by name, description, and custom ID, or create a new one if
     * no match is found
     */
    export interface UnionMember2 {
      /**
       * Agent name
       */
      name: string;

      /**
       * Agent custom ID
       */
      customId?: string;

      /**
       * Agent description
       */
      description?: string;

      /**
       * Endpoint configuration for this agent (optional)
       */
      endpoint?: UnionMember2.ID | UnionMember2.UnionMember1;

      /**
       * Agent's prompt configuration
       */
      prompt?: UnionMember2.Prompt;
    }

    export namespace UnionMember2 {
      export interface ID {
        /**
         * Existing Roark endpoint ID
         */
        id: string;
      }

      /**
       * Lookup or create endpoint if one with these values does not exist
       */
      export interface UnionMember1 {
        /**
         * Type of endpoint (phone or websocket)
         */
        type: string;

        /**
         * Endpoint value (phone number in E.164 format or websocket URL)
         */
        value: string;

        /**
         * Call direction for this endpoint
         */
        direction?: string;
      }

      /**
       * Agent's prompt configuration
       */
      export interface Prompt {
        /**
         * The agent's system prompt used during this call
         */
        resolvedPrompt: string;
      }
    }

    /**
     * Customer participating in the call
     */
    export interface Customer {
      /**
       * Customer phone number in E.164 format (e.g., +14155551234)
       */
      phoneNumberE164: string | null;

      /**
       * Label to identify this customer in the transcript (e.g., "speaker-01",
       * "speaker-02")
       */
      label?: string | null;
    }

    export interface ToolInvocation {
      /**
       * Name of the tool that was invoked
       */
      name: string;

      /**
       * Parameters provided to the tool during invocation
       */
      parameters: { [key: string]: ToolInvocation.UnionMember0 | unknown };

      /**
       * Result returned by the tool after execution. Can be a string or a JSON object
       */
      result: string | { [key: string]: unknown };

      /**
       * Offset in milliseconds from the start of the call when the tool was invoked
       */
      startOffsetMs: number;

      /**
       * Description of when the tool should be invoked
       */
      description?: string;

      /**
       * Offset in milliseconds from the start of the call when the tool execution
       * completed. Used to calculate duration of the tool execution
       */
      endOffsetMs?: number;
    }

    export namespace ToolInvocation {
      export interface UnionMember0 {
        description?: string;

        type?: 'string' | 'number' | 'boolean';

        value?: unknown;
      }
    }

    export interface UnionMember0 {
      endOffsetMs: number;

      role: 'AGENT';

      startOffsetMs: number;

      text: string;

      agent?: UnionMember0.Agent;

      languageCode?: string;
    }

    export namespace UnionMember0 {
      export interface Agent {
        customId?: string;

        roarkId?: string;
      }
    }

    export interface UnionMember1 {
      endOffsetMs: number;

      role: 'CUSTOMER';

      startOffsetMs: number;

      text: string;

      customer?: UnionMember1.Customer;

      languageCode?: string;
    }

    export namespace UnionMember1 {
      export interface Customer {
        label?: string;

        phoneNumberE164?: string;
      }
    }
  }
}

export interface CallGetMetricsParams {
  /**
   * Whether to return a flat list instead of grouped by metric definition (default:
   * false)
   */
  flatten?: string;
}

export declare namespace Call {
  export {
    type CallCreateResponse as CallCreateResponse,
    type CallGetByIDResponse as CallGetByIDResponse,
    type CallGetEvaluationRunsResponse as CallGetEvaluationRunsResponse,
    type CallGetMetricsResponse as CallGetMetricsResponse,
    type CallGetSentimentRunsResponse as CallGetSentimentRunsResponse,
    type CallCreateParams as CallCreateParams,
    type CallGetMetricsParams as CallGetMetricsParams,
  };
}
