// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Evaluation extends APIResource {
  /**
   * Create a evaluation job for a dataset of calls
   */
  createJob(
    body: EvaluationCreateJobParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluationCreateJobResponse> {
    return this._client.post('/v1/evaluation/job', { body, ...options });
  }

  /**
   * Retrieve details of a specific evaluation job
   */
  getJob(jobId: string, options?: Core.RequestOptions): Core.APIPromise<unknown> {
    return this._client.get(`/v1/evaluation/job/${jobId}`, options);
  }

  /**
   * Retrieve paginated details of a specific evaluation job runs
   */
  getJobRuns(
    jobId: string,
    query?: EvaluationGetJobRunsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<unknown>;
  getJobRuns(jobId: string, options?: Core.RequestOptions): Core.APIPromise<unknown>;
  getJobRuns(
    jobId: string,
    query: EvaluationGetJobRunsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<unknown> {
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

export type EvaluationGetJobResponse = unknown;

export type EvaluationGetJobRunsResponse = unknown;

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
    properties?: Record<string, unknown>;

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
      properties?: Record<string, unknown>;

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
    type EvaluationGetJobResponse as EvaluationGetJobResponse,
    type EvaluationGetJobRunsResponse as EvaluationGetJobRunsResponse,
    type EvaluationCreateJobParams as EvaluationCreateJobParams,
    type EvaluationGetJobRunsParams as EvaluationGetJobRunsParams,
  };
}
