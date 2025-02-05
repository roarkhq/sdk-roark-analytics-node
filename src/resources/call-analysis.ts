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
    return this._client.post('/call-analysis', { body, ...options });
  }
}

export interface CallAnalysisCreateResponse {
  data: CallAnalysisCreateResponse.Data;
}

export namespace CallAnalysisCreateResponse {
  export interface Data {
    id: string;

    direction: 'INBOUND' | 'OUTBOUND';

    interfaceType: 'PHONE' | 'WEB';

    isTest: boolean;

    startedAt: string;

    status: 'RINGING' | 'IN_PROGRESS' | 'ENDED' | null;

    /**
     * Participant contact information
     */
    agent?: Data.Agent;

    /**
     * Participant contact information
     */
    customer?: Data.Customer;

    endedAt?: string | null;

    endedReason?: string | null;

    summary?: string | null;
  }

  export namespace Data {
    /**
     * Participant contact information
     */
    export interface Agent {
      name?: string;

      phoneNumber?: string;
    }

    /**
     * Participant contact information
     */
    export interface Customer {
      name?: string;

      phoneNumber?: string;
    }
  }
}

export interface CallAnalysisCreateParams {
  /**
   * The original direction of the call
   */
  direction: 'INBOUND' | 'OUTBOUND';

  /**
   * URL of source recording
   */
  sourceRecordingUrl: string;

  startedAt: string;

  /**
   * Agent information
   */
  agent?: CallAnalysisCreateParams.Agent;

  agentSpokeFirst?: boolean;

  /**
   * Customer information
   */
  customer?: CallAnalysisCreateParams.Customer;

  isTest?: boolean;

  /**
   * URL of source stereo recording. While optional it allows for a richer audio
   * player
   */
  stereoRecordingUrl?: string;
}

export namespace CallAnalysisCreateParams {
  /**
   * Agent information
   */
  export interface Agent {
    name?: string;

    phoneNumber?: string;
  }

  /**
   * Customer information
   */
  export interface Customer {
    name?: string;

    phoneNumber?: string;
  }
}

export declare namespace CallAnalysis {
  export {
    type CallAnalysisCreateResponse as CallAnalysisCreateResponse,
    type CallAnalysisCreateParams as CallAnalysisCreateParams,
  };
}
