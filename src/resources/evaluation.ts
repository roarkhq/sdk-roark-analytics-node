// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Evaluation extends APIResource {
  /**
   * Create a evaluation job for a single call or dataset of calls
   */
  createJob(
    body: EvaluationCreateJobParams,
    options?: RequestOptions,
  ): APIPromise<EvaluationCreateJobResponse> {
    return this._client.post('/v1/evaluation/job', { body, ...options });
  }

  /**
   * Returns a specific evaluator with its blocks and configuration.
   */
  getEvaluatorByID(
    evaluatorID: string,
    options?: RequestOptions,
  ): APIPromise<EvaluationGetEvaluatorByIDResponse> {
    return this._client.get(path`/v1/evaluation/evaluators/${evaluatorID}`, options);
  }

  /**
   * Retrieve details of a specific evaluation job
   */
  getJob(jobID: string, options?: RequestOptions): APIPromise<EvaluationGetJobResponse> {
    return this._client.get(path`/v1/evaluation/job/${jobID}`, options);
  }

  /**
   * Returns a list of evaluators with their blocks and configuration for the
   * authenticated project.
   */
  listEvaluators(
    query: EvaluationListEvaluatorsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EvaluationListEvaluatorsResponse> {
    return this._client.get('/v1/evaluation/evaluators', { query, ...options });
  }

  /**
   * Retrieve paginated details of a specific evaluation job runs
   */
  listJobRuns(
    jobID: string,
    query: EvaluationListJobRunsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EvaluationListJobRunsResponse> {
    return this._client.get(path`/v1/evaluation/job/${jobID}/runs`, { query, ...options });
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

    /**
     * ID of the call being evaluated (only present for single call evaluations)
     */
    callId?: string;
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

/**
 * Response containing evaluators and pagination info
 */
export interface EvaluationListEvaluatorsResponse {
  /**
   * Array of evaluators with their blocks
   */
  data: Array<EvaluationListEvaluatorsResponse.Data>;

  /**
   * Pagination information
   */
  pagination: EvaluationListEvaluatorsResponse.Pagination;
}

export namespace EvaluationListEvaluatorsResponse {
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

export interface EvaluationListJobRunsResponse {
  /**
   * Evaluation job runs response payload
   */
  data: EvaluationListJobRunsResponse.Data;
}

export namespace EvaluationListJobRunsResponse {
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

  /**
   * ID of an existing call to evaluate
   */
  callId?: string;

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
     * URL of source recording (must be an accessible WAV, MP3, or MP4 file). Can be a
     * signed URL.
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
     * URL of source stereo recording. Must be accessible. Can be a signed URL. While
     * optional it allows for a richer audio player. Supported formats: WAV, MP3, MP4.
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
      role: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER';

      isSimulated?: boolean;

      name?: string | null;

      participantId?: string | null;

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
       * URL of source recording (must be an accessible WAV, MP3, or MP4 file). Can be a
       * signed URL.
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
       * URL of source stereo recording. Must be accessible. Can be a signed URL. While
       * optional it allows for a richer audio player. Supported formats: WAV, MP3, MP4.
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
        role: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER';

        isSimulated?: boolean;

        name?: string | null;

        participantId?: string | null;

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

export interface EvaluationListEvaluatorsParams {
  /**
   * Cursor for pagination - evaluator ID to start after
   */
  after?: string;

  /**
   * Maximum number of evaluators to return (default: 20, max: 50)
   */
  limit?: string;
}

export interface EvaluationListJobRunsParams {
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
    type EvaluationGetJobResponse as EvaluationGetJobResponse,
    type EvaluationListEvaluatorsResponse as EvaluationListEvaluatorsResponse,
    type EvaluationListJobRunsResponse as EvaluationListJobRunsResponse,
    type EvaluationCreateJobParams as EvaluationCreateJobParams,
    type EvaluationListEvaluatorsParams as EvaluationListEvaluatorsParams,
    type EvaluationListJobRunsParams as EvaluationListJobRunsParams,
  };
}
