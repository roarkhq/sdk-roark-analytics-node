// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../api-promise';
import { RequestOptions } from '../internal/request-options';

export class Integrations extends APIResource {
  /**
   * Process and upload a Retell call to Roark evaluation
   */
  createRetellCall(
    body: IntegrationCreateRetellCallParams,
    options?: RequestOptions,
  ): APIPromise<IntegrationCreateRetellCallResponse> {
    return this._client.post('/v1/retell/call', { body, ...options });
  }

  /**
   * Process and upload a VAPI call to Roark evaluation
   */
  createVapiCall(
    body: IntegrationCreateVapiCallParams,
    options?: RequestOptions,
  ): APIPromise<IntegrationCreateVapiCallResponse> {
    return this._client.post('/v1/vapi/call', { body, ...options });
  }
}

export interface IntegrationCreateRetellCallResponse {
  /**
   * Retell call upload response
   */
  data: IntegrationCreateRetellCallResponse.Data;
}

export namespace IntegrationCreateRetellCallResponse {
  /**
   * Retell call upload response
   */
  export interface Data {
    /**
     * ID of the uploaded call
     */
    callId: string;
  }
}

export interface IntegrationCreateVapiCallResponse {
  /**
   * Vapi call upload response
   */
  data: IntegrationCreateVapiCallResponse.Data;
}

export namespace IntegrationCreateVapiCallResponse {
  /**
   * Vapi call upload response
   */
  export interface Data {
    /**
     * ID of the uploaded call
     */
    callId: string;
  }
}

export interface IntegrationCreateRetellCallParams {
  /**
   * Raw Retell data forwarded directly from the Retell call_ended webhook
   */
  retellCallEndedPayload: Record<string, unknown>;

  /**
   * Optional metadata (key-value pairs) to include with the call. Useful for
   * filtering and display in call details.
   */
  properties?: Record<string, unknown>;

  /**
   * Skip already imported Retell calls with the same Retell call id.
   */
  skipAlreadyImported?: boolean;
}

export interface IntegrationCreateVapiCallParams {
  /**
   * Raw Vapi data forwarded directly from the Vapi end-of-call-report webhook
   */
  vapiEndOfCallReportPayload: Record<string, unknown>;

  /**
   * Optional metadata (key-value pairs) to include with the call. Useful for
   * filtering and display in call details.
   */
  properties?: Record<string, unknown>;

  /**
   * Skip already imported Vapi calls with the same Vapi call id.
   */
  skipAlreadyImported?: boolean;
}

export declare namespace Integrations {
  export {
    type IntegrationCreateRetellCallResponse as IntegrationCreateRetellCallResponse,
    type IntegrationCreateVapiCallResponse as IntegrationCreateVapiCallResponse,
    type IntegrationCreateRetellCallParams as IntegrationCreateRetellCallParams,
    type IntegrationCreateVapiCallParams as IntegrationCreateVapiCallParams,
  };
}
