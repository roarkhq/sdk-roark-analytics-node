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

      summary?: string | null;
    }

    export namespace Call {
      export interface Participant {
        role: 'AGENT' | 'CUSTOMER' | 'SIMULATED_AGENT' | 'SIMULATED_CUSTOMER';

        name?: string;

        phoneNumber?: string;

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
   * URL of source recording (must be an accessible WAV file). Can be a signed URL.
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
   * URL of source stereo recording in WAV format. Must be accessible. Can be a
   * signed URL. While optional it allows for a richer audio player
   */
  stereoRecordingUrl?: string;
}

export namespace CallAnalysisCreateParams {
  export interface Participant {
    role: 'AGENT' | 'CUSTOMER' | 'SIMULATED_AGENT' | 'SIMULATED_CUSTOMER';

    name?: string;

    phoneNumber?: string;

    spokeFirst?: boolean;
  }
}

export declare namespace CallAnalysis {
  export {
    type CallAnalysisCreateResponse as CallAnalysisCreateResponse,
    type CallAnalysisCreateParams as CallAnalysisCreateParams,
  };
}
