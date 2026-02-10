// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../api-promise';
import { RequestOptions } from '../internal/request-options';

export class Call extends APIResource {
  /**
   * Create a new call with recording, transcript, agents, and customers
   */
  create(body: CallCreateParams, options?: RequestOptions): APIPromise<CallCreateResponse> {
    return this._client.post('/v1/call', { body, ...options });
  }

  /**
   * Returns a paginated list of calls for the authenticated project.
   */
  list(
    query: CallListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CallListResponse> {
    return this._client.get('/v1/call', { query, ...options });
  }

  /**
   * Retrieve an existing call by its unique identifier
   */
  getByID(callID: string, options?: RequestOptions): APIPromise<CallGetByIDResponse> {
    return this._client.get(`/v1/call/${callID}`, options);
  }

  /**
   * Fetch all evaluation run results for a specific call.
   */
  listEvaluationRuns(callID: string, options?: RequestOptions): APIPromise<CallListEvaluationRunsResponse> {
    return this._client.get(`/v1/call/${callID}/evaluation-run`, options);
  }

  /**
   * Fetch all call-level metrics for a specific call, including both
   * system-generated and custom metrics. Only returns successfully computed metrics.
   */
  listMetrics(
    callID: string,
    query: CallListMetricsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CallListMetricsResponse> {
    return this._client.get(`/v1/call/${callID}/metrics`, { query, ...options });
  }

  /**
   * Fetch detailed sentiment analysis results for a specific call, including
   * emotional tone, key phrases, and sentiment scores.
   */
  listSentimentRuns(callID: string, options?: RequestOptions): APIPromise<CallListSentimentRunsResponse> {
    return this._client.get(`/v1/call/${callID}/sentiment-run`, options);
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
      label?: string | null;

      phoneNumberE164?: string | null;
    }
  }
}

export interface CallListResponse {
  data: Array<CallListResponse.Data>;

  pagination: CallListResponse.Pagination;
}

export namespace CallListResponse {
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
     * Custom properties associated with the call
     */
    properties?: Record<string, unknown> | null;

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
      label?: string | null;

      phoneNumberE164?: string | null;
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
     * Custom properties associated with the call
     */
    properties?: Record<string, unknown> | null;

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
      label?: string | null;

      phoneNumberE164?: string | null;
    }
  }
}

export interface CallListEvaluationRunsResponse {
  /**
   * Evaluation run response payload
   */
  data: Array<CallListEvaluationRunsResponse.Data>;
}

export namespace CallListEvaluationRunsResponse {
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

export interface CallListMetricsResponse {
  /**
   * Call metrics response payload grouped by metric definition
   */
  data: Array<CallListMetricsResponse.Data>;
}

export namespace CallListMetricsResponse {
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

export interface CallListSentimentRunsResponse {
  /**
   * Sentiment run response payload
   */
  data: CallListSentimentRunsResponse.Data;
}

export namespace CallListSentimentRunsResponse {
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

export interface CallCreateParams {
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
   * Single agent participating in the call. Use this for simpler API when you have
   * only one agent.
   */
  agent?:
    | CallCreateParams.AgentIdentificationByRoarkID
    | CallCreateParams.AgentIdentificationByName
    | CallCreateParams.AgentIdentificationByCustomID;

  /**
   * Agents participating in the call. Each agent requires identification and prompt
   * information.
   */
  agents?: Array<
    | CallCreateParams.AgentIdentificationByRoarkID
    | CallCreateParams.AgentIdentificationByName
    | CallCreateParams.AgentIdentificationByCustomID
  >;

  /**
   * Single customer participating in the call. Use this for simpler API when you
   * have only one customer.
   */
  customer?: CallCreateParams.Customer;

  /**
   * Customers participating in the call.
   */
  customers?: Array<CallCreateParams.Customer>;

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
  properties?: Record<string, unknown>;

  /**
   * URL of source stereo recording. Must be accessible. Can be a signed URL.
   * Supported formats: WAV, MP3, MP4.
   */
  stereoRecordingUrl?: string;

  /**
   * List of tool invocations made during the call
   */
  toolInvocations?: Array<CallCreateParams.ToolInvocation>;

  /**
   * List of transcript entries made during the call
   */
  transcript?: Array<CallCreateParams.TranscriptEntryAgent | CallCreateParams.TranscriptEntryCustomer>;
}

export namespace CallCreateParams {
  export interface AgentIdentificationByRoarkID {
    /**
     * Existing Roark agent ID
     */
    roarkId: string;

    /**
     * Endpoint configuration for this agent (optional)
     */
    endpoint?:
      | AgentIdentificationByRoarkID.AgentEndpointByID
      | AgentIdentificationByRoarkID.AgentEndpointByValue;

    /**
     * Agent's prompt configuration (optional)
     */
    prompt?: AgentIdentificationByRoarkID.Prompt;
  }

  export namespace AgentIdentificationByRoarkID {
    export interface AgentEndpointByID {
      /**
       * Existing Roark endpoint ID
       */
      id: string;
    }

    /**
     * Lookup or create endpoint if one with these values does not exist
     */
    export interface AgentEndpointByValue {
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
     * Agent's prompt configuration (optional)
     */
    export interface Prompt {
      /**
       * The agent's system prompt used during this call
       */
      resolvedPrompt: string;
    }
  }

  /**
   * Create a new agent or find existing by customId if provided
   */
  export interface AgentIdentificationByName {
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
    endpoint?: AgentIdentificationByName.AgentEndpointByID | AgentIdentificationByName.AgentEndpointByValue;

    /**
     * Agent's prompt configuration (optional)
     */
    prompt?: AgentIdentificationByName.Prompt;
  }

  export namespace AgentIdentificationByName {
    export interface AgentEndpointByID {
      /**
       * Existing Roark endpoint ID
       */
      id: string;
    }

    /**
     * Lookup or create endpoint if one with these values does not exist
     */
    export interface AgentEndpointByValue {
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
     * Agent's prompt configuration (optional)
     */
    export interface Prompt {
      /**
       * The agent's system prompt used during this call
       */
      resolvedPrompt: string;
    }
  }

  export interface AgentIdentificationByCustomID {
    /**
     * Existing custom ID for a Roark agent
     */
    customId: string;

    /**
     * Endpoint configuration for this agent (optional)
     */
    endpoint?:
      | AgentIdentificationByCustomID.AgentEndpointByID
      | AgentIdentificationByCustomID.AgentEndpointByValue;

    /**
     * Agent's prompt configuration (optional)
     */
    prompt?: AgentIdentificationByCustomID.Prompt;
  }

  export namespace AgentIdentificationByCustomID {
    export interface AgentEndpointByID {
      /**
       * Existing Roark endpoint ID
       */
      id: string;
    }

    /**
     * Lookup or create endpoint if one with these values does not exist
     */
    export interface AgentEndpointByValue {
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
     * Agent's prompt configuration (optional)
     */
    export interface Prompt {
      /**
       * The agent's system prompt used during this call
       */
      resolvedPrompt: string;
    }
  }

  export interface AgentIdentificationByRoarkID {
    /**
     * Existing Roark agent ID
     */
    roarkId: string;

    /**
     * Endpoint configuration for this agent (optional)
     */
    endpoint?:
      | AgentIdentificationByRoarkID.AgentEndpointByID
      | AgentIdentificationByRoarkID.AgentEndpointByValue;

    /**
     * Agent's prompt configuration (optional)
     */
    prompt?: AgentIdentificationByRoarkID.Prompt;
  }

  export namespace AgentIdentificationByRoarkID {
    export interface AgentEndpointByID {
      /**
       * Existing Roark endpoint ID
       */
      id: string;
    }

    /**
     * Lookup or create endpoint if one with these values does not exist
     */
    export interface AgentEndpointByValue {
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
     * Agent's prompt configuration (optional)
     */
    export interface Prompt {
      /**
       * The agent's system prompt used during this call
       */
      resolvedPrompt: string;
    }
  }

  /**
   * Create a new agent or find existing by customId if provided
   */
  export interface AgentIdentificationByName {
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
    endpoint?: AgentIdentificationByName.AgentEndpointByID | AgentIdentificationByName.AgentEndpointByValue;

    /**
     * Agent's prompt configuration (optional)
     */
    prompt?: AgentIdentificationByName.Prompt;
  }

  export namespace AgentIdentificationByName {
    export interface AgentEndpointByID {
      /**
       * Existing Roark endpoint ID
       */
      id: string;
    }

    /**
     * Lookup or create endpoint if one with these values does not exist
     */
    export interface AgentEndpointByValue {
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
     * Agent's prompt configuration (optional)
     */
    export interface Prompt {
      /**
       * The agent's system prompt used during this call
       */
      resolvedPrompt: string;
    }
  }

  export interface AgentIdentificationByCustomID {
    /**
     * Existing custom ID for a Roark agent
     */
    customId: string;

    /**
     * Endpoint configuration for this agent (optional)
     */
    endpoint?:
      | AgentIdentificationByCustomID.AgentEndpointByID
      | AgentIdentificationByCustomID.AgentEndpointByValue;

    /**
     * Agent's prompt configuration (optional)
     */
    prompt?: AgentIdentificationByCustomID.Prompt;
  }

  export namespace AgentIdentificationByCustomID {
    export interface AgentEndpointByID {
      /**
       * Existing Roark endpoint ID
       */
      id: string;
    }

    /**
     * Lookup or create endpoint if one with these values does not exist
     */
    export interface AgentEndpointByValue {
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
     * Agent's prompt configuration (optional)
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
    parameters: Record<string, ToolInvocation.UnionMember0 | unknown>;

    /**
     * Result returned by the tool after execution. Can be a string or a JSON object
     */
    result: string | Record<string, unknown>;

    /**
     * Offset in milliseconds from the start of the call when the tool was invoked
     */
    startOffsetMs: number;

    /**
     * Metadata about the agent that invoked this tool - used to match which agent from
     * the agents array this tool invocation belongs to
     */
    agent?: ToolInvocation.Agent;

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

    /**
     * Metadata about the agent that invoked this tool - used to match which agent from
     * the agents array this tool invocation belongs to
     */
    export interface Agent {
      /**
       * The custom ID set on the agent
       */
      customId?: string;

      /**
       * The Roark ID of the agent
       */
      roarkId?: string;
    }
  }

  export interface TranscriptEntryAgent {
    endOffsetMs: number;

    role: 'AGENT';

    startOffsetMs: number;

    text: string;

    /**
     * Metadata about the agent that spoke this turn - used to match which agent from
     * the `agents` array this transcript entry belongs to
     */
    agent?: TranscriptEntryAgent.Agent;

    languageCode?: string;
  }

  export namespace TranscriptEntryAgent {
    /**
     * Metadata about the agent that spoke this turn - used to match which agent from
     * the `agents` array this transcript entry belongs to
     */
    export interface Agent {
      /**
       * The custom ID set on the agent
       */
      customId?: string;

      /**
       * The Roark ID of the agent
       */
      roarkId?: string;
    }
  }

  export interface TranscriptEntryCustomer {
    endOffsetMs: number;

    role: 'CUSTOMER';

    startOffsetMs: number;

    text: string;

    /**
     * Metadata about the customer that spoke this turn - used to match which customer
     * from the `customers` array this transcript entry belongs to
     */
    customer?: TranscriptEntryCustomer.Customer;

    languageCode?: string;
  }

  export namespace TranscriptEntryCustomer {
    /**
     * Metadata about the customer that spoke this turn - used to match which customer
     * from the `customers` array this transcript entry belongs to
     */
    export interface Customer {
      /**
       * Label matching the `label` field on the `customers` array when creating the call
       */
      label?: string;

      /**
       * The phone number of the customer in E.164 format, matching the `phoneNumberE164`
       * field on the `customers` array when creating the call
       */
      phoneNumberE164?: string;
    }
  }
}

export interface CallListParams {
  /**
   * Cursor for pagination - use the nextCursor value from a previous response
   */
  after?: string;

  /**
   * Maximum number of calls to return (default: 20, max: 100)
   */
  limit?: number;

  /**
   * Search text to filter calls by title, summary, or transcript
   */
  searchText?: string;

  /**
   * Filter by simulation run plan job ID to get all calls from a specific simulation
   * batch
   */
  simulationRunPlanJobId?: string;

  /**
   * Field to sort by (default: createdAt)
   */
  sortBy?: 'createdAt' | 'startedAt' | 'endedAt' | 'duration' | 'title' | 'status';

  /**
   * Sort direction (default: desc)
   */
  sortDirection?: 'asc' | 'desc';

  /**
   * Filter by call status
   */
  status?: 'RINGING' | 'IN_PROGRESS' | 'ENDED';
}

export interface CallListMetricsParams {
  /**
   * Whether to return a flat list instead of grouped by metric definition (default:
   * false)
   */
  flatten?: string;
}

export declare namespace Call {
  export {
    type CallCreateResponse as CallCreateResponse,
    type CallListResponse as CallListResponse,
    type CallGetByIDResponse as CallGetByIDResponse,
    type CallListEvaluationRunsResponse as CallListEvaluationRunsResponse,
    type CallListMetricsResponse as CallListMetricsResponse,
    type CallListSentimentRunsResponse as CallListSentimentRunsResponse,
    type CallCreateParams as CallCreateParams,
    type CallListParams as CallListParams,
    type CallListMetricsParams as CallListMetricsParams,
  };
}
