// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Evaluation extends APIResource {
  /**
   * Create a evaluation job for a single call or dataset of calls
   */
  createJob(
    body: EvaluationCreateJobParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluationCreateJobResponse> {
    return this._client.post('/v1/evaluation/job', { body, ...options });
  }

  /**
   * Returns a specific evaluator with its blocks and configuration.
   */
  getEvaluatorById(
    evaluatorId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluationGetEvaluatorByIDResponse> {
    return this._client.get(`/v1/evaluation/evaluators/${evaluatorId}`, options);
  }

  /**
   * Returns a list of evaluators with their blocks and configuration for the
   * authenticated project.
   */
  getEvaluators(
    query?: EvaluationGetEvaluatorsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluationGetEvaluatorsResponse>;
  getEvaluators(options?: Core.RequestOptions): Core.APIPromise<EvaluationGetEvaluatorsResponse>;
  getEvaluators(
    query: EvaluationGetEvaluatorsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluationGetEvaluatorsResponse> {
    if (isRequestOptions(query)) {
      return this.getEvaluators({}, query);
    }
    return this._client.get('/v1/evaluation/evaluators', { query, ...options });
  }

  /**
   * Retrieve details of a specific evaluation job
   */
  getJob(jobId: string, options?: Core.RequestOptions): Core.APIPromise<EvaluationGetJobResponse> {
    return this._client.get(`/v1/evaluation/job/${jobId}`, options);
  }

  /**
   * Retrieve paginated details of a specific evaluation job runs
   */
  getJobRuns(
    jobId: string,
    query?: EvaluationGetJobRunsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluationGetJobRunsResponse>;
  getJobRuns(jobId: string, options?: Core.RequestOptions): Core.APIPromise<EvaluationGetJobRunsResponse>;
  getJobRuns(
    jobId: string,
    query: EvaluationGetJobRunsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluationGetJobRunsResponse> {
    if (isRequestOptions(query)) {
      return this.getJobRuns(jobId, {}, query);
    }
    return this._client.get(`/v1/evaluation/job/${jobId}/runs`, { query, ...options });
  }
}

export interface EvaluationCreateJobResponse {
  data: EvaluationCreateJobResponse.Data;
}

export namespace EvaluationCreateJobResponse {
  export interface Data {
    /**
     * ID of the evaluation job
     */
    jobId: string;

    /**
     * Status of the evaluation job
     */
    status: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILURE';
  }
}

/**
 * Evaluator with its configured blocks
 */
export interface EvaluationGetEvaluatorByIDResponse {
  /**
   * Unique identifier for the evaluator
   */
  id: string;

  /**
   * Array of evaluation blocks configured for this evaluator
   */
  blocks: Array<
    | EvaluationGetEvaluatorByIDResponse.UnionMember0
    | EvaluationGetEvaluatorByIDResponse.UnionMember1
    | EvaluationGetEvaluatorByIDResponse.UnionMember2
    | EvaluationGetEvaluatorByIDResponse.UnionMember3
    | EvaluationGetEvaluatorByIDResponse.UnionMember4
    | EvaluationGetEvaluatorByIDResponse.UnionMember5
    | EvaluationGetEvaluatorByIDResponse.UnionMember6
    | EvaluationGetEvaluatorByIDResponse.UnionMember7
    | EvaluationGetEvaluatorByIDResponse.UnionMember8
  >;

  /**
   * ISO timestamp when the evaluator was created
   */
  createdAt: string;

  /**
   * Optional description of the evaluator
   */
  description: string | null;

  /**
   * Name of the evaluator
   */
  name: string;

  /**
   * Unique slug identifier for the evaluator
   */
  slug: string;

  /**
   * ISO timestamp when the evaluator was last updated
   */
  updatedAt: string;
}

export namespace EvaluationGetEvaluatorByIDResponse {
  export interface UnionMember0 {
    /**
     * Unique identifier for the block
     */
    id: string;

    /**
     * Block type identifier
     */
    blockType: 'CUSTOM_PROMPT';

    /**
     * Optional description of what this block evaluates
     */
    description: string | null;

    /**
     * Name of the metric this prompt evaluates
     */
    metricName: string;

    /**
     * Display name of the evaluation block
     */
    name: string;

    /**
     * Order in which this block is executed
     */
    orderIndex: number;

    /**
     * The prompt to evaluate the call against
     */
    prompt: string;

    /**
     * Minimum score threshold to pass evaluation (0-1)
     */
    threshold: number;

    /**
     * Weight of this block in the overall evaluation score (0-100)
     */
    weight: number;
  }

  export interface UnionMember1 {
    /**
     * Unique identifier for the block
     */
    id: string;

    /**
     * Block type identifier
     */
    blockType: 'DATAFIELD_CHECK';

    /**
     * Optional description of what this block evaluates
     */
    description: string | null;

    /**
     * Criteria for evaluating the property
     */
    evaluationCriteria: string;

    /**
     * Whether this property must be present
     */
    isRequired: boolean;

    /**
     * Display name of the evaluation block
     */
    name: string;

    /**
     * Order in which this block is executed
     */
    orderIndex: number;

    /**
     * Name of the property to check
     */
    propertyName: string;

    /**
     * Minimum score threshold to pass evaluation (0-1)
     */
    threshold: number;

    /**
     * Expected type of the property value
     */
    valueType: string;

    /**
     * Weight of this block in the overall evaluation score (0-100)
     */
    weight: number;
  }

  export interface UnionMember2 {
    /**
     * Unique identifier for the block
     */
    id: string;

    /**
     * Block type identifier
     */
    blockType: 'EMOTION';

    /**
     * Optional description of what this block evaluates
     */
    description: string | null;

    /**
     * Display name of the evaluation block
     */
    name: string;

    /**
     * Order in which this block is executed
     */
    orderIndex: number;

    /**
     * The emotion to detect (e.g., "joy", "anger", "sadness")
     */
    selectedEmotion: string;

    /**
     * Minimum confidence threshold for emotion detection (0-1)
     */
    threshold: number;

    /**
     * Weight of this block in the overall evaluation score (0-100)
     */
    weight: number;
  }

  export interface UnionMember3 {
    /**
     * Unique identifier for the block
     */
    id: string;

    /**
     * Block type identifier
     */
    blockType: 'LATENCY';

    /**
     * Optional description of what this block evaluates
     */
    description: string | null;

    /**
     * Maximum number of silence periods allowed
     */
    maxAllowedSilences: number;

    /**
     * Minimum duration of silence in milliseconds to be considered
     */
    minSilenceDuration: number;

    /**
     * Display name of the evaluation block
     */
    name: string;

    /**
     * Order in which this block is executed
     */
    orderIndex: number;

    /**
     * Maximum allowed latency score
     */
    threshold: number;

    /**
     * Weight of this block in the overall evaluation score (0-100)
     */
    weight: number;
  }

  export interface UnionMember4 {
    /**
     * Unique identifier for the block
     */
    id: string;

    /**
     * Block type identifier
     */
    blockType: 'POLITENESS';

    /**
     * Optional description of what this block evaluates
     */
    description: string | null;

    /**
     * Display name of the evaluation block
     */
    name: string;

    /**
     * Order in which this block is executed
     */
    orderIndex: number;

    /**
     * Minimum politeness score threshold (0-1)
     */
    threshold: number;

    /**
     * Weight of this block in the overall evaluation score (0-100)
     */
    weight: number;
  }

  export interface UnionMember5 {
    /**
     * Unique identifier for the block
     */
    id: string;

    /**
     * Block type identifier
     */
    blockType: 'SENTIMENT';

    /**
     * Optional description of what this block evaluates
     */
    description: string | null;

    /**
     * Display name of the evaluation block
     */
    name: string;

    /**
     * Order in which this block is executed
     */
    orderIndex: number;

    /**
     * Minimum sentiment score threshold (0-1)
     */
    threshold: number;

    /**
     * Weight of this block in the overall evaluation score (0-100)
     */
    weight: number;
  }

  export interface UnionMember6 {
    /**
     * Unique identifier for the block
     */
    id: string;

    /**
     * Block type identifier
     */
    blockType: 'TOOL_CALLS';

    /**
     * Optional description of what this block evaluates
     */
    description: string | null;

    /**
     * Condition that must be met for tool invocation
     */
    invocationCondition: string | null;

    /**
     * Minimum number of times the tool should be invoked
     */
    minInvocationCount: number | null;

    /**
     * Display name of the evaluation block
     */
    name: string;

    /**
     * Order in which this block is executed
     */
    orderIndex: number;

    /**
     * Whether the tool should be invoked
     */
    shouldBeInvoked: boolean;

    /**
     * ID of the tool definition
     */
    toolDefinitionId: string;

    /**
     * Weight of this block in the overall evaluation score (0-100)
     */
    weight: number;
  }

  export interface UnionMember7 {
    /**
     * Unique identifier for the block
     */
    id: string;

    /**
     * Block type identifier
     */
    blockType: 'TOXICITY';

    /**
     * Optional description of what this block evaluates
     */
    description: string | null;

    /**
     * Display name of the evaluation block
     */
    name: string;

    /**
     * Order in which this block is executed
     */
    orderIndex: number;

    /**
     * Maximum allowed toxicity score (0-1)
     */
    threshold: number;

    /**
     * Weight of this block in the overall evaluation score (0-100)
     */
    weight: number;
  }

  export interface UnionMember8 {
    /**
     * Unique identifier for the block
     */
    id: string;

    /**
     * Block type identifier
     */
    blockType: 'VOCAL_CUE';

    /**
     * Optional description of what this block evaluates
     */
    description: string | null;

    /**
     * Display name of the evaluation block
     */
    name: string;

    /**
     * Order in which this block is executed
     */
    orderIndex: number;

    /**
     * The vocal cue to detect (e.g., "pace", "tone", "volume")
     */
    selectedCue: string;

    /**
     * Minimum confidence threshold for vocal cue detection (0-1)
     */
    threshold: number;

    /**
     * Weight of this block in the overall evaluation score (0-100)
     */
    weight: number;
  }
}

/**
 * Response containing evaluators and pagination info
 */
export interface EvaluationGetEvaluatorsResponse {
  /**
   * Array of evaluators with their blocks
   */
  data: Array<EvaluationGetEvaluatorsResponse.Data>;

  /**
   * Pagination information
   */
  pagination: EvaluationGetEvaluatorsResponse.Pagination;
}

export namespace EvaluationGetEvaluatorsResponse {
  /**
   * Evaluator with its configured blocks
   */
  export interface Data {
    /**
     * Unique identifier for the evaluator
     */
    id: string;

    /**
     * Array of evaluation blocks configured for this evaluator
     */
    blocks: Array<
      | Data.UnionMember0
      | Data.UnionMember1
      | Data.UnionMember2
      | Data.UnionMember3
      | Data.UnionMember4
      | Data.UnionMember5
      | Data.UnionMember6
      | Data.UnionMember7
      | Data.UnionMember8
    >;

    /**
     * ISO timestamp when the evaluator was created
     */
    createdAt: string;

    /**
     * Optional description of the evaluator
     */
    description: string | null;

    /**
     * Name of the evaluator
     */
    name: string;

    /**
     * Unique slug identifier for the evaluator
     */
    slug: string;

    /**
     * ISO timestamp when the evaluator was last updated
     */
    updatedAt: string;
  }

  export namespace Data {
    export interface UnionMember0 {
      /**
       * Unique identifier for the block
       */
      id: string;

      /**
       * Block type identifier
       */
      blockType: 'CUSTOM_PROMPT';

      /**
       * Optional description of what this block evaluates
       */
      description: string | null;

      /**
       * Name of the metric this prompt evaluates
       */
      metricName: string;

      /**
       * Display name of the evaluation block
       */
      name: string;

      /**
       * Order in which this block is executed
       */
      orderIndex: number;

      /**
       * The prompt to evaluate the call against
       */
      prompt: string;

      /**
       * Minimum score threshold to pass evaluation (0-1)
       */
      threshold: number;

      /**
       * Weight of this block in the overall evaluation score (0-100)
       */
      weight: number;
    }

    export interface UnionMember1 {
      /**
       * Unique identifier for the block
       */
      id: string;

      /**
       * Block type identifier
       */
      blockType: 'DATAFIELD_CHECK';

      /**
       * Optional description of what this block evaluates
       */
      description: string | null;

      /**
       * Criteria for evaluating the property
       */
      evaluationCriteria: string;

      /**
       * Whether this property must be present
       */
      isRequired: boolean;

      /**
       * Display name of the evaluation block
       */
      name: string;

      /**
       * Order in which this block is executed
       */
      orderIndex: number;

      /**
       * Name of the property to check
       */
      propertyName: string;

      /**
       * Minimum score threshold to pass evaluation (0-1)
       */
      threshold: number;

      /**
       * Expected type of the property value
       */
      valueType: string;

      /**
       * Weight of this block in the overall evaluation score (0-100)
       */
      weight: number;
    }

    export interface UnionMember2 {
      /**
       * Unique identifier for the block
       */
      id: string;

      /**
       * Block type identifier
       */
      blockType: 'EMOTION';

      /**
       * Optional description of what this block evaluates
       */
      description: string | null;

      /**
       * Display name of the evaluation block
       */
      name: string;

      /**
       * Order in which this block is executed
       */
      orderIndex: number;

      /**
       * The emotion to detect (e.g., "joy", "anger", "sadness")
       */
      selectedEmotion: string;

      /**
       * Minimum confidence threshold for emotion detection (0-1)
       */
      threshold: number;

      /**
       * Weight of this block in the overall evaluation score (0-100)
       */
      weight: number;
    }

    export interface UnionMember3 {
      /**
       * Unique identifier for the block
       */
      id: string;

      /**
       * Block type identifier
       */
      blockType: 'LATENCY';

      /**
       * Optional description of what this block evaluates
       */
      description: string | null;

      /**
       * Maximum number of silence periods allowed
       */
      maxAllowedSilences: number;

      /**
       * Minimum duration of silence in milliseconds to be considered
       */
      minSilenceDuration: number;

      /**
       * Display name of the evaluation block
       */
      name: string;

      /**
       * Order in which this block is executed
       */
      orderIndex: number;

      /**
       * Maximum allowed latency score
       */
      threshold: number;

      /**
       * Weight of this block in the overall evaluation score (0-100)
       */
      weight: number;
    }

    export interface UnionMember4 {
      /**
       * Unique identifier for the block
       */
      id: string;

      /**
       * Block type identifier
       */
      blockType: 'POLITENESS';

      /**
       * Optional description of what this block evaluates
       */
      description: string | null;

      /**
       * Display name of the evaluation block
       */
      name: string;

      /**
       * Order in which this block is executed
       */
      orderIndex: number;

      /**
       * Minimum politeness score threshold (0-1)
       */
      threshold: number;

      /**
       * Weight of this block in the overall evaluation score (0-100)
       */
      weight: number;
    }

    export interface UnionMember5 {
      /**
       * Unique identifier for the block
       */
      id: string;

      /**
       * Block type identifier
       */
      blockType: 'SENTIMENT';

      /**
       * Optional description of what this block evaluates
       */
      description: string | null;

      /**
       * Display name of the evaluation block
       */
      name: string;

      /**
       * Order in which this block is executed
       */
      orderIndex: number;

      /**
       * Minimum sentiment score threshold (0-1)
       */
      threshold: number;

      /**
       * Weight of this block in the overall evaluation score (0-100)
       */
      weight: number;
    }

    export interface UnionMember6 {
      /**
       * Unique identifier for the block
       */
      id: string;

      /**
       * Block type identifier
       */
      blockType: 'TOOL_CALLS';

      /**
       * Optional description of what this block evaluates
       */
      description: string | null;

      /**
       * Condition that must be met for tool invocation
       */
      invocationCondition: string | null;

      /**
       * Minimum number of times the tool should be invoked
       */
      minInvocationCount: number | null;

      /**
       * Display name of the evaluation block
       */
      name: string;

      /**
       * Order in which this block is executed
       */
      orderIndex: number;

      /**
       * Whether the tool should be invoked
       */
      shouldBeInvoked: boolean;

      /**
       * ID of the tool definition
       */
      toolDefinitionId: string;

      /**
       * Weight of this block in the overall evaluation score (0-100)
       */
      weight: number;
    }

    export interface UnionMember7 {
      /**
       * Unique identifier for the block
       */
      id: string;

      /**
       * Block type identifier
       */
      blockType: 'TOXICITY';

      /**
       * Optional description of what this block evaluates
       */
      description: string | null;

      /**
       * Display name of the evaluation block
       */
      name: string;

      /**
       * Order in which this block is executed
       */
      orderIndex: number;

      /**
       * Maximum allowed toxicity score (0-1)
       */
      threshold: number;

      /**
       * Weight of this block in the overall evaluation score (0-100)
       */
      weight: number;
    }

    export interface UnionMember8 {
      /**
       * Unique identifier for the block
       */
      id: string;

      /**
       * Block type identifier
       */
      blockType: 'VOCAL_CUE';

      /**
       * Optional description of what this block evaluates
       */
      description: string | null;

      /**
       * Display name of the evaluation block
       */
      name: string;

      /**
       * Order in which this block is executed
       */
      orderIndex: number;

      /**
       * The vocal cue to detect (e.g., "pace", "tone", "volume")
       */
      selectedCue: string;

      /**
       * Minimum confidence threshold for vocal cue detection (0-1)
       */
      threshold: number;

      /**
       * Weight of this block in the overall evaluation score (0-100)
       */
      weight: number;
    }
  }

  /**
   * Pagination information
   */
  export interface Pagination {
    /**
     * Whether there are more evaluators to fetch
     */
    hasMore: boolean;

    /**
     * Cursor for the next page, null if no more pages
     */
    nextCursor: string | null;

    /**
     * Total number of evaluators
     */
    total: number;
  }
}

export interface EvaluationGetJobResponse {
  /**
   * Evaluation job response payload
   */
  data: EvaluationGetJobResponse.Data;
}

export namespace EvaluationGetJobResponse {
  /**
   * Evaluation job response payload
   */
  export interface Data {
    /**
     * ID of the evaluation job
     */
    id: string;

    /**
     * Status of the evaluation job
     */
    status: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILURE';

    /**
     * Call being evaluated
     */
    call?: Data.Call;

    /**
     * Dataset being evaluated
     */
    dataset?: Data.Dataset;
  }

  export namespace Data {
    /**
     * Call being evaluated
     */
    export interface Call {
      /**
       * ID of the call being evaluated
       */
      id: string | null;
    }

    /**
     * Dataset being evaluated
     */
    export interface Dataset {
      /**
       * ID of the dataset
       */
      id: string | null;

      /**
       * Calls in the dataset
       */
      calls: Array<Dataset.Call>;
    }

    export namespace Dataset {
      export interface Call {
        /**
         * ID of the call
         */
        id: string | null;
      }
    }
  }
}

export interface EvaluationGetJobRunsResponse {
  /**
   * Evaluation job runs response payload
   */
  data: EvaluationGetJobRunsResponse.Data;
}

export namespace EvaluationGetJobRunsResponse {
  /**
   * Evaluation job runs response payload
   */
  export interface Data {
    /**
     * Evaluator runs of the evaluation job
     */
    data: Array<Data.Data> | null;

    /**
     * Pagination information
     */
    pagination: Data.Pagination | null;
  }

  export namespace Data {
    export interface Data {
      /**
       * ID of the evaluator run
       */
      id: string;

      /**
       * When the evaluator run completed
       */
      completedAt: string | null;

      /**
       * Evaluator of the evaluator run
       */
      evaluator: Data.Evaluator | null;

      /**
       * Evidence of the evaluator run
       */
      evidence: Array<Data.Evidence> | null;

      /**
       * Metrics of the evaluator run
       */
      metrics: Array<Data.Metric> | null;

      /**
       * Score of the evaluator run
       */
      score: number | null;

      /**
       * Score classification of the evaluator run
       */
      scoreClassification: 'SUCCESS' | 'FAILURE' | 'IRRELEVANT' | null;

      /**
       * When the evaluator run started
       */
      startedAt: string | null;

      /**
       * Status of the evaluator run
       */
      status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

      /**
       * Summary of the evaluator run
       */
      summary: string | null;
    }

    export namespace Data {
      /**
       * Evaluator of the evaluator run
       */
      export interface Evaluator {
        /**
         * ID of the evaluator
         */
        id: string | null;

        /**
         * Name of the evaluator
         */
        name: string | null;
      }

      export interface Evidence {
        /**
         * ID of the evidence
         */
        id: string | null;

        /**
         * Comment on the evidence
         */
        commentText: string | null;

        /**
         * Whether this is a positive example of the metric
         */
        isPositive: boolean | null;

        /**
         * Snippet of the evidence
         */
        snippetText: string | null;
      }

      export interface Metric {
        /**
         * ID of the metric
         */
        id: string | null;

        /**
         * Boolean value of the metric
         */
        booleanValue: boolean | null;

        /**
         * Confidence of the metric
         */
        confidence: number | null;

        /**
         * Name of the metric
         */
        name: string | null;

        /**
         * Numeric value of the metric
         */
        numericValue: number | null;

        /**
         * Reasoning for the metric
         */
        reasoning: string | null;

        /**
         * Role of the metric
         */
        role: 'PRIMARY' | 'SECONDARY' | null;

        /**
         * Text value of the metric
         */
        textValue: string | null;

        /**
         * Value type of the metric
         */
        valueType: 'NUMERIC' | 'BOOLEAN' | 'TEXT' | null;
      }
    }

    /**
     * Pagination information
     */
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
}

export interface EvaluationCreateJobParams {
  /**
   * List of evaluators slugs to evaluate the calls or "all" to evaluate all
   * evaluators
   */
  evaluators: Array<string> | 'all';

  /**
   * Call input to evaluate
   */
  call?: EvaluationCreateJobParams.Call;

  dataset?: EvaluationCreateJobParams.Dataset;
}

export namespace EvaluationCreateJobParams {
  /**
   * Call input to evaluate
   */
  export interface Call {
    /**
     * Direction of the call (INBOUND or OUTBOUND)
     */
    callDirection: 'INBOUND' | 'OUTBOUND';

    /**
     * Interface type of the call (PHONE or WEB)
     */
    interfaceType: 'PHONE' | 'WEB';

    /**
     * Exactly two participants in the call
     */
    participants: Array<Call.Participant>;

    /**
     * URL of source recording (must be an accessible WAV or MP3 file). Can be a signed
     * URL.
     */
    recordingUrl: string;

    /**
     * When the call started (ISO 8601 format)
     */
    startedAt: string;

    /**
     * Additional context on why the call terminated with the endedStatus
     */
    endedReason?: string;

    /**
     * High-level call end status, indicating how the call terminated
     */
    endedStatus?:
      | 'AGENT_ENDED_CALL'
      | 'AGENT_TRANSFERRED_CALL'
      | 'AGENT_ERROR'
      | 'CUSTOMER_ENDED_CALL'
      | 'VOICE_MAIL_REACHED'
      | 'SILENCE_TIME_OUT'
      | 'PHONE_CALL_PROVIDER_CONNECTION_ERROR'
      | 'CUSTOMER_DID_NOT_ANSWER'
      | 'CUSTOMER_BUSY'
      | 'DIAL_ERROR'
      | 'MAX_DURATION_REACHED'
      | 'UNKNOWN';

    /**
     * Whether this is a test call
     */
    isTest?: boolean;

    /**
     * Custom properties to include with the call. These can be used for filtering and
     * will show in the call details page
     */
    properties?: { [key: string]: unknown };

    /**
     * Retell call ID if call is being imported from Retell
     */
    retellCallId?: string;

    /**
     * URL of source stereo recording in WAV format. Must be accessible. Can be a
     * signed URL. While optional it allows for a richer audio player
     */
    stereoRecordingUrl?: string;

    /**
     * List of tool invocations made during the call
     */
    toolInvocations?: Array<Call.ToolInvocation>;

    /**
     * Vapi call ID if call is being imported from Vapi
     */
    vapiCallId?: string;
  }

  export namespace Call {
    export interface Participant {
      role: 'AGENT' | 'CUSTOMER';

      isSimulated?: boolean;

      name?: string | null;

      phoneNumber?: string | null;

      spokeFirst?: boolean;
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
  }

  export interface Dataset {
    /**
     * List of calls input to evaluate
     */
    calls: Array<Dataset.Call>;

    /**
     * Name of the dataset
     */
    name: string;
  }

  export namespace Dataset {
    export interface Call {
      /**
       * Direction of the call (INBOUND or OUTBOUND)
       */
      callDirection: 'INBOUND' | 'OUTBOUND';

      /**
       * Interface type of the call (PHONE or WEB)
       */
      interfaceType: 'PHONE' | 'WEB';

      /**
       * Exactly two participants in the call
       */
      participants: Array<Call.Participant>;

      /**
       * URL of source recording (must be an accessible WAV or MP3 file). Can be a signed
       * URL.
       */
      recordingUrl: string;

      /**
       * When the call started (ISO 8601 format)
       */
      startedAt: string;

      /**
       * Additional context on why the call terminated with the endedStatus
       */
      endedReason?: string;

      /**
       * High-level call end status, indicating how the call terminated
       */
      endedStatus?:
        | 'AGENT_ENDED_CALL'
        | 'AGENT_TRANSFERRED_CALL'
        | 'AGENT_ERROR'
        | 'CUSTOMER_ENDED_CALL'
        | 'VOICE_MAIL_REACHED'
        | 'SILENCE_TIME_OUT'
        | 'PHONE_CALL_PROVIDER_CONNECTION_ERROR'
        | 'CUSTOMER_DID_NOT_ANSWER'
        | 'CUSTOMER_BUSY'
        | 'DIAL_ERROR'
        | 'MAX_DURATION_REACHED'
        | 'UNKNOWN';

      /**
       * Whether this is a test call
       */
      isTest?: boolean;

      /**
       * Custom properties to include with the call. These can be used for filtering and
       * will show in the call details page
       */
      properties?: { [key: string]: unknown };

      /**
       * Retell call ID if call is being imported from Retell
       */
      retellCallId?: string;

      /**
       * URL of source stereo recording in WAV format. Must be accessible. Can be a
       * signed URL. While optional it allows for a richer audio player
       */
      stereoRecordingUrl?: string;

      /**
       * List of tool invocations made during the call
       */
      toolInvocations?: Array<Call.ToolInvocation>;

      /**
       * Vapi call ID if call is being imported from Vapi
       */
      vapiCallId?: string;
    }

    export namespace Call {
      export interface Participant {
        role: 'AGENT' | 'CUSTOMER';

        isSimulated?: boolean;

        name?: string | null;

        phoneNumber?: string | null;

        spokeFirst?: boolean;
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
    }
  }
}

export interface EvaluationGetEvaluatorsParams {
  /**
   * Cursor for pagination - evaluator ID to start after
   */
  after?: string;

  /**
   * Maximum number of evaluators to return (default: 20, max: 50)
   */
  limit?: string;
}

export interface EvaluationGetJobRunsParams {
  /**
   * Number of items to return per page
   */
  limit?: string;

  /**
   * Cursor for the next page of items
   */
  nextCursor?: string;
}

export declare namespace Evaluation {
  export {
    type EvaluationCreateJobResponse as EvaluationCreateJobResponse,
    type EvaluationGetEvaluatorByIDResponse as EvaluationGetEvaluatorByIDResponse,
    type EvaluationGetEvaluatorsResponse as EvaluationGetEvaluatorsResponse,
    type EvaluationGetJobResponse as EvaluationGetJobResponse,
    type EvaluationGetJobRunsResponse as EvaluationGetJobRunsResponse,
    type EvaluationCreateJobParams as EvaluationCreateJobParams,
    type EvaluationGetEvaluatorsParams as EvaluationGetEvaluatorsParams,
    type EvaluationGetJobRunsParams as EvaluationGetJobRunsParams,
  };
}
