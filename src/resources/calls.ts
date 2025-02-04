// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Calls extends APIResource {
  /**
   * Upload a call recording.
   */
  create(body: CallCreateParams, options?: Core.RequestOptions): Core.APIPromise<CallCreateResponse> {
    return this._client.post('/call', { body, ...options });
  }
}

export interface CallCreateResponse {
  data: CallCreateResponse.Data;
}

export namespace CallCreateResponse {
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

export interface CallCreateParams {
  direction: 'INBOUND' | 'OUTBOUND';

  startedAt: string;

  /**
   * Participant contact information
   */
  agent?: CallCreateParams.Agent;

  agentSpokeFirst?: boolean;

  /**
   * Participant contact information
   */
  customer?: CallCreateParams.Customer;

  isTest?: boolean;

  sourceRecordingUrl?: string;

  stereoRecordingUrl?: string;
}

export namespace CallCreateParams {
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

export declare namespace Calls {
  export { type CallCreateResponse as CallCreateResponse, type CallCreateParams as CallCreateParams };
}
