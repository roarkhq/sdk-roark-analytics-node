// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class CallAnalysis extends APIResource {
  /**
   * Upload a new call recording
   */
  create(
    body: CallAnalysisCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CallAnalysisCreateResponse> {
    return this._client.post('/v1/call-analysis', { body, ...options });
  }

  /**
   * Fetch a call analysis job by ID
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
   * Reason why the call ended (optional)
   */
  endedReason?: string;

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
    name: string;

    parameters: Record<string, ToolInvocation.UnionMember0 | unknown>;

    result: string | Record<string, unknown>;

    startOffsetMs: number;

    description?: string;

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
