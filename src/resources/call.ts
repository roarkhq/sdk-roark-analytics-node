// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Call extends APIResource {
  /**
   * Create a new call with recording, transcript, agents, and customers
   *
   * @example
   * ```ts
   * const call = await client.call.create({
   *   callDirection: 'INBOUND',
   *   interfaceType: 'PHONE',
   *   recordingUrl: 'https://example.com',
   *   startedAt: 'startedAt',
   * });
   * ```
   */
  create(body: CallCreateParams, options?: RequestOptions): APIPromise<CallCreateResponse> {
    return this._client.post('/v1/call', { body, ...options });
  }

  /**
   * Returns a paginated list of calls for the authenticated project.
   *
   * @example
   * ```ts
   * const calls = await client.call.list();
   * ```
   */
  list(
    query: CallListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CallListResponse> {
    return this._client.get('/v1/call', { query, ...options });
  }

  /**
   * Retrieve an existing call by its unique identifier
   *
   * @example
   * ```ts
   * const response = await client.call.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  getByID(callID: string, options?: RequestOptions): APIPromise<CallGetByIDResponse> {
    return this._client.get(path`/v1/call/${callID}`, options);
  }

  /**
   * Fetch the full transcript for a specific call. Optionally specify a
   * transcription source; otherwise the best available source is used automatically.
   *
   * @example
   * ```ts
   * const response = await client.call.getTranscript('callId');
   * ```
   */
  getTranscript(
    callID: string,
    query: CallGetTranscriptParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CallGetTranscriptResponse> {
    return this._client.get(path`/v1/call/${callID}/transcript`, { query, ...options });
  }

  /**
   * Fetch all call-level metrics for a specific call, including both
   * system-generated and custom metrics. Only returns rows from the **latest**
   * metric-collection job per metric — if the same metric has been recomputed, prior
   * runs are excluded and remain in the metric history. By default returns only
   * successfully computed metrics; pass `?status=all` to also include rows that
   * resolved as NOT_APPLICABLE / DATA_MISSING / ERROR (the `value` field is omitted
   * on those entries — check `captureStatus`).
   *
   * @example
   * ```ts
   * const response = await client.call.listMetrics('callId');
   * ```
   */
  listMetrics(
    callID: string,
    query: CallListMetricsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CallListMetricsResponse> {
    return this._client.get(path`/v1/call/${callID}/metrics`, { query, ...options });
  }

  /**
   * Fetch detailed sentiment analysis results for a specific call, including
   * emotional tone, key phrases, and sentiment scores.
   *
   * @example
   * ```ts
   * const response = await client.call.listSentimentRuns(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  listSentimentRuns(callID: string, options?: RequestOptions): APIPromise<CallListSentimentRunsResponse> {
    return this._client.get(path`/v1/call/${callID}/sentiment-run`, options);
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

    externalId: string | null;

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
     * Indicates the status of `recordingUrl`. `AVAILABLE`: signed URL returned.
     * `NOT_AVAILABLE`: no recording on file yet (e.g. still processing). `RESTRICTED`:
     * the calling API key does not have the `recording:read` permission and the URL
     * has been withheld.
     */
    recordingUrlAccess: 'AVAILABLE' | 'NOT_AVAILABLE' | 'RESTRICTED';

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
     * Caller-supplied correlation ID echoed back from the create request, if any was
     * provided
     */
    externalId?: string | null;

    /**
     * IDs of metric policies that have been applied to this call
     */
    policyIds?: Array<string> | null;

    /**
     * Custom properties associated with the call
     */
    properties?: { [key: string]: unknown } | null;

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
     * Indicates the status of `recordingUrl`. `AVAILABLE`: signed URL returned.
     * `NOT_AVAILABLE`: no recording on file yet (e.g. still processing). `RESTRICTED`:
     * the calling API key does not have the `recording:read` permission and the URL
     * has been withheld.
     */
    recordingUrlAccess: 'AVAILABLE' | 'NOT_AVAILABLE' | 'RESTRICTED';

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
     * Caller-supplied correlation ID echoed back from the create request, if any was
     * provided
     */
    externalId?: string | null;

    /**
     * IDs of metric policies that have been applied to this call
     */
    policyIds?: Array<string> | null;

    /**
     * Custom properties associated with the call
     */
    properties?: { [key: string]: unknown } | null;

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

export interface CallGetTranscriptResponse {
  /**
   * Call transcript response
   */
  data: CallGetTranscriptResponse.Data;
}

export namespace CallGetTranscriptResponse {
  /**
   * Call transcript response
   */
  export interface Data {
    /**
     * Ordered list of transcript entries from the call
     */
    entries: Array<Data.Entry>;

    /**
     * All participants in this transcript, referenced by participantId on each entry
     */
    participants: Array<Data.UnionMember0 | Data.UnionMember1 | Data.UnionMember2 | Data.UnionMember3>;

    /**
     * The transcription source used for this transcript. Null if no transcript is
     * available.
     */
    transcriptionSource: 'ROARK_POST_CALL' | 'SIMULATION_AGENT_REALTIME' | 'CUSTOMER_AGENT_REALTIME' | null;
  }

  export namespace Data {
    /**
     * A single transcript entry
     */
    export interface Entry {
      /**
       * End time offset in milliseconds from the start of the conversation
       */
      endOffsetMs: number;

      /**
       * ID of the conversation participant who produced this entry. References
       * participants[].id.
       */
      participantId: string | null;

      /**
       * Convenience role derived from participant type
       */
      role: 'AGENT' | 'CUSTOMER' | null;

      /**
       * Start time offset in milliseconds from the start of the conversation
       */
      startOffsetMs: number;

      /**
       * Transcript text for this entry
       */
      text: string;
    }

    /**
     * An agent participant
     */
    export interface UnionMember0 {
      /**
       * Conversation participant ID
       */
      id: string;

      /**
       * ID of the agent entity
       */
      agentId: string | null;

      type: 'AGENT';
    }

    /**
     * A customer participant
     */
    export interface UnionMember1 {
      /**
       * Conversation participant ID
       */
      id: string;

      /**
       * ID of the conversation customer record
       */
      customerId: string | null;

      type: 'CUSTOMER';
    }

    /**
     * A simulated customer participant
     */
    export interface UnionMember2 {
      /**
       * Conversation participant ID
       */
      id: string;

      /**
       * ID of the conversation customer record
       */
      customerId: string | null;

      type: 'SIMULATED_CUSTOMER';
    }

    /**
     * A background speaker participant
     */
    export interface UnionMember3 {
      /**
       * Conversation participant ID
       */
      id: string;

      type: 'BACKGROUND_SPEAKER';
    }
  }
}

export interface CallListMetricsResponse {
  /**
   * Conversation metrics response payload grouped by metric definition
   */
  data: Array<CallListMetricsResponse.Data>;
}

export namespace CallListMetricsResponse {
  /**
   * Metric data grouped by metric definition
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
     * Alias of `slug` retained for backwards compatibility. Same value as `slug`.
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
     * Stable metric slug
     */
    slug: string;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * Array of metric values (multiple for PER_PARTICIPANT metrics, or multiple
     * segments/turns)
     */
    values: Array<Data.StandardMetricValue | Data.PropertyVerificationMetricValue>;

    /**
     * Unit information if applicable
     */
    unit?: Data.Unit;
  }

  export namespace Data {
    /**
     * A metric value entry. Applies to every metric.
     */
    export interface StandardMetricValue {
      /**
       * Result state of this metric computation. SUCCESS carries a real `value`;
       * NOT_APPLICABLE / DATA_MISSING / ERROR do not (the `value` field is omitted).
       * Non-SUCCESS rows only appear when the request includes ?status=all.
       */
      captureStatus: 'SUCCESS' | 'NOT_APPLICABLE' | 'DATA_MISSING' | 'ERROR';

      /**
       * ISO 8601 timestamp when the metric was computed
       */
      computedAt: string;

      /**
       * Context level: CALL (entire conversation), SEGMENT (single segment),
       * SEGMENT_RANGE (between/across segments)
       */
      context: 'CALL' | 'SEGMENT' | 'SEGMENT_RANGE';

      /**
       * ID of the call this value was computed on. Only set when the response spans
       * multiple conversations (e.g. job-scoped metric values).
       */
      callId?: string;

      /**
       * ID of the chat this value was computed on. Only set when the response spans
       * multiple conversations (e.g. job-scoped metric values).
       */
      chatId?: string;

      /**
       * Confidence score (0-1) for the computed value. Defaults to 1.0 for deterministic
       * metrics. Omitted on non-SUCCESS rows.
       */
      confidence?: number;

      /**
       * Error detail when captureStatus is ERROR — e.g. provider down, LLM timeout.
       * Undefined for other statuses.
       */
      errorMessage?: string;

      /**
       * Starting segment information (for SEGMENT_RANGE context metrics)
       */
      fromSegment?: StandardMetricValue.FromSegment;

      /**
       * Role of participant (only for PER_PARTICIPANT metrics)
       */
      participantRole?: 'agent' | 'customer';

      /**
       * IDs of metric policies that triggered this metric computation
       */
      policyIds?: Array<string>;

      /**
       * Segment information (for SEGMENT context metrics)
       */
      segment?: StandardMetricValue.Segment;

      /**
       * Ending segment information (for SEGMENT_RANGE context metrics)
       */
      toSegment?: StandardMetricValue.ToSegment;

      /**
       * The metric value (type depends on outputType). Present only on SUCCESS rows;
       * omitted for NOT_APPLICABLE / DATA_MISSING / ERROR.
       */
      value?: number | boolean | string;

      /**
       * Explanation for the metric value (especially useful for AI-computed metrics)
       */
      valueReasoning?: string;
    }

    export namespace StandardMetricValue {
      /**
       * Starting segment information (for SEGMENT_RANGE context metrics)
       */
      export interface FromSegment {
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
    }

    /**
     * Returned for the Property Mismatch metric (`property_transcript_mismatch`): the
     * standard entry plus the per-property verdict breakdown.
     */
    export interface PropertyVerificationMetricValue {
      /**
       * Result state of this metric computation. SUCCESS carries a real `value`;
       * NOT_APPLICABLE / DATA_MISSING / ERROR do not (the `value` field is omitted).
       * Non-SUCCESS rows only appear when the request includes ?status=all.
       */
      captureStatus: 'SUCCESS' | 'NOT_APPLICABLE' | 'DATA_MISSING' | 'ERROR';

      /**
       * ISO 8601 timestamp when the metric was computed
       */
      computedAt: string;

      /**
       * Context level: CALL (entire conversation), SEGMENT (single segment),
       * SEGMENT_RANGE (between/across segments)
       */
      context: 'CALL' | 'SEGMENT' | 'SEGMENT_RANGE';

      /**
       * ID of the call this value was computed on. Only set when the response spans
       * multiple conversations (e.g. job-scoped metric values).
       */
      callId?: string;

      /**
       * ID of the chat this value was computed on. Only set when the response spans
       * multiple conversations (e.g. job-scoped metric values).
       */
      chatId?: string;

      /**
       * Confidence score (0-1) for the computed value. Defaults to 1.0 for deterministic
       * metrics. Omitted on non-SUCCESS rows.
       */
      confidence?: number;

      /**
       * Error detail when captureStatus is ERROR — e.g. provider down, LLM timeout.
       * Undefined for other statuses.
       */
      errorMessage?: string;

      /**
       * Starting segment information (for SEGMENT_RANGE context metrics)
       */
      fromSegment?: PropertyVerificationMetricValue.FromSegment;

      /**
       * Role of participant (only for PER_PARTICIPANT metrics)
       */
      participantRole?: 'agent' | 'customer';

      /**
       * IDs of metric policies that triggered this metric computation
       */
      policyIds?: Array<string>;

      /**
       * Per-property verdicts for the Property Mismatch metric, in the order the
       * properties were checked. Omitted for every other metric.
       */
      propertyVerdicts?: Array<PropertyVerificationMetricValue.PropertyVerdict>;

      /**
       * Segment information (for SEGMENT context metrics)
       */
      segment?: PropertyVerificationMetricValue.Segment;

      /**
       * Ending segment information (for SEGMENT_RANGE context metrics)
       */
      toSegment?: PropertyVerificationMetricValue.ToSegment;

      /**
       * The metric value (type depends on outputType). Present only on SUCCESS rows;
       * omitted for NOT_APPLICABLE / DATA_MISSING / ERROR.
       */
      value?: number | boolean | string;

      /**
       * Explanation for the metric value (especially useful for AI-computed metrics)
       */
      valueReasoning?: string;
    }

    export namespace PropertyVerificationMetricValue {
      /**
       * Starting segment information (for SEGMENT_RANGE context metrics)
       */
      export interface FromSegment {
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

      export interface PropertyVerdict {
        /**
         * The value supplied at ingest, frozen at scoring time
         */
        expectedValue: string;

        /**
         * The call property checked, as sent at ingest
         */
        propertyName: string;

        /**
         * How this property resolved against the transcript. NOT_MENTIONED means the
         * subject never came up and is not a mismatch.
         */
        verdict: 'MATCH' | 'MISMATCH' | 'NOT_MENTIONED';

        /**
         * What the transcript said instead. Only present when verdict is MISMATCH.
         */
        observedValue?: string;

        /**
         * Judge reasoning for this verdict
         */
        reasoning?: string;

        /**
         * The transcript segment this property was referred to in: the conflicting value
         * for MISMATCH, the confirming reference for MATCH. Omitted for NOT_MENTIONED and
         * when the verdict could not be anchored.
         */
        segment?: PropertyVerdict.Segment;
      }

      export namespace PropertyVerdict {
        /**
         * The transcript segment this property was referred to in: the conflicting value
         * for MISMATCH, the confirming reference for MATCH. Omitted for NOT_MENTIONED and
         * when the verdict could not be anchored.
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
   * URL of source recording (must be an accessible WAV, MP3, MP4, or OGG file). Can
   * be a signed URL.
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
   * A stable identifier from your own system (e.g. session ID, conversation ID) used
   * to correlate this call with OpenTelemetry traces. Set the same value as a
   * `roark.external_id` span or resource attribute on your traces and the matching
   * trace will be linked automatically. Must be unique within a project.
   */
  externalId?: string;

  /**
   * The LiveKit Cloud room ID to link this call with OpenTelemetry trace data from
   * LiveKit. Used for matching calls with OTEL traces.
   */
  livekitRoomId?: string;

  /**
   * Custom properties to include with the call. These can be used for filtering and
   * will show in the call details page
   */
  properties?: { [key: string]: unknown };

  /**
   * URL of source stereo recording. Must be accessible. Can be a signed URL.
   * Supported formats: WAV, MP3, MP4, OGG.
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

  /**
   * The Vapi call ID (UUID) to link this call with OpenTelemetry trace data from
   * Vapi. Used for matching calls with OTEL traces.
   */
  vapiCallId?: string;
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
   * Find existing by customId if provided, otherwise reuse exact project name match
   * before creating
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

    payload?: { [key: string]: unknown } | null;
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

    payload?: { [key: string]: unknown } | null;
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

export interface CallGetTranscriptParams {
  /**
   * Transcription source to fetch. When omitted, uses the preferred source based on
   * availability: CUSTOMER_AGENT_REALTIME > SIMULATION_AGENT_REALTIME >
   * ROARK_POST_CALL
   */
  source?: 'ROARK_POST_CALL' | 'SIMULATION_AGENT_REALTIME' | 'CUSTOMER_AGENT_REALTIME';
}

export interface CallListMetricsParams {
  /**
   * Whether to return a flat list instead of grouped by metric definition (default:
   * false)
   */
  flatten?: string;

  /**
   * Filter metrics by capture status. `success` (default) returns only successfully
   * computed metrics — backwards-compatible with the historical behavior. `all` also
   * returns NOT_APPLICABLE / DATA_MISSING / ERROR rows (with `value` omitted), so
   * clients can distinguish "still computing" from "computed but no value" and exit
   * retry loops correctly.
   */
  status?: 'success' | 'all';
}

export declare namespace Call {
  export {
    type CallCreateResponse as CallCreateResponse,
    type CallListResponse as CallListResponse,
    type CallGetByIDResponse as CallGetByIDResponse,
    type CallGetTranscriptResponse as CallGetTranscriptResponse,
    type CallListMetricsResponse as CallListMetricsResponse,
    type CallListSentimentRunsResponse as CallListSentimentRunsResponse,
    type CallCreateParams as CallCreateParams,
    type CallListParams as CallListParams,
    type CallGetTranscriptParams as CallGetTranscriptParams,
    type CallListMetricsParams as CallListMetricsParams,
  };
}
