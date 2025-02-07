// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Health extends APIResource {
  /**
   * Returns the health status of the API and its dependencies
   */
  get(options?: Core.RequestOptions): Core.APIPromise<HealthGetResponse> {
    return this._client.get('/health', options);
  }
}

export interface HealthGetResponse {
  /**
   * Health check response payload
   */
  data: HealthGetResponse.Data;
}

export namespace HealthGetResponse {
  /**
   * Health check response payload
   */
  export interface Data {
    status: 'healthy' | 'degraded' | 'unhealthy';

    timestamp: string;

    version: string;
  }
}

export declare namespace Health {
  export { type HealthGetResponse as HealthGetResponse };
}
