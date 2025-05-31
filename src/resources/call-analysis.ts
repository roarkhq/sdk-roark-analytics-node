// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class CallAnalysis extends APIResource {
  /**
   * Upload a new call recording
   *
   * @example
   * ```ts
   * const callAnalysis = await client.callAnalysis.create({
   *   callDirection: 'INBOUND',
   *   interfaceType: 'WEB',
   *   participants: [{ role: 'AGENT' }, { role: 'CUSTOMER' }],
   *   recordingUrl: 'https://example.com/recording.wav',
   *   startedAt: '2025-05-31T19:13:37.445Z',
   * });
   * ```
   */
  create(
    body: CallAnalysisCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CallAnalysisCreateResponse> {
    return this._client.post('/v1/call-analysis', { body, ...options });
  }

  /**
   * Fetch a call analysis job by ID
   *
   * @example
   * ```ts
   * const callAnalysis = await client.callAnalysis.retrieve(
   *   'jobId',
   * );
   * ```
   */
  retrieve(jobId: string, options?: Core.RequestOptions): Core.APIPromise<CallAnalysisRetrieveResponse> {
    return this._client.get(`/v1/call-analysis/${jobId}`, options);
  }
}

export interface CallAnalysisCreateResponse {
  /**
   * Analysis job with associated call context
   */
  data: CallAnalysisCreateResponse.Data;
}

export namespace CallAnalysisCreateResponse {
  /**
   * Analysis job with associated call context
   */
  export interface Data {
    call: Data.Call;

    /**
     * Analysis job ID for tracking progress
     */
    jobId: string;

    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  }

  export namespace Data {
    export interface Call {
      id: string;

      callDirection: 'INBOUND' | 'OUTBOUND';

      isTest: boolean;

      participants: Array<Call.Participant>;

      startedAt: string;

      status: 'RINGING' | 'IN_PROGRESS' | 'ENDED' | null;

      durationMs?: number | null;

      endedAt?: string | null;

      endedReason?: string | null;

      properties?: Record<string, unknown> | null;

      summary?: string | null;
    }

    export namespace Call {
      export interface Participant {
        role: 'AGENT' | 'CUSTOMER';

        isSimulated?: boolean;

        name?: string | null;

        phoneNumber?: string | null;

        spokeFirst?: boolean;
      }
    }
  }
}

export interface CallAnalysisRetrieveResponse {
  /**
   * Analysis job with associated call context
   */
  data: CallAnalysisRetrieveResponse.Data;
}

export namespace CallAnalysisRetrieveResponse {
  /**
   * Analysis job with associated call context
   */
  export interface Data {
    call: Data.Call;

    /**
     * Analysis job ID for tracking progress
     */
    jobId: string;

    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  }

  export namespace Data {
    export interface Call {
      id: string;

      callDirection: 'INBOUND' | 'OUTBOUND';

      isTest: boolean;

      participants: Array<Call.Participant>;

      startedAt: string;

      status: 'RINGING' | 'IN_PROGRESS' | 'ENDED' | null;

      durationMs?: number | null;

      endedAt?: string | null;

      endedReason?: string | null;

      properties?: Record<string, unknown> | null;

      summary?: string | null;
    }

    export namespace Call {
      export interface Participant {
        role: 'AGENT' | 'CUSTOMER';

        isSimulated?: boolean;

        name?: string | null;

        phoneNumber?: string | null;

        spokeFirst?: boolean;
      }
    }
  }
}

export interface CallAnalysisCreateParams {
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
  participants: Array<CallAnalysisCreateParams.Participant>;

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
  toolInvocations?: Array<CallAnalysisCreateParams.ToolInvocation>;

  /**
   * Vapi call ID if call is being imported from Vapi
   */
  vapiCallId?: string;
}

export namespace CallAnalysisCreateParams {
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

export declare namespace CallAnalysis {
  export {
    type CallAnalysisCreateResponse as CallAnalysisCreateResponse,
    type CallAnalysisRetrieveResponse as CallAnalysisRetrieveResponse,
    type CallAnalysisCreateParams as CallAnalysisCreateParams,
  };
}
