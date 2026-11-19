// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class SimulationPhoneNumber extends APIResource {
  /**
   * Returns every number Roark may place simulation calls to your agent from,
   * ordered by number. Use it to allowlist simulation traffic or to tell it apart
   * from real callers. The shared pool changes as Roark adds and retires numbers, so
   * fetch the list again before you update an allowlist.
   *
   * @example
   * ```ts
   * const simulationPhoneNumbers =
   *   await client.simulationPhoneNumber.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<SimulationPhoneNumberListResponse> {
    return this._client.get('/v1/simulation/phone-number', options);
  }
}

export interface SimulationPhoneNumberListResponse {
  data: Array<SimulationPhoneNumberListResponse.Data>;
}

export namespace SimulationPhoneNumberListResponse {
  /**
   * A number Roark may place simulation calls from
   */
  export interface Data {
    /**
     * The number in E.164 format
     */
    e164: string;

    /**
     * ISO 3166-2 code of the region the number is from, when known
     */
    localityCode: string | null;

    /**
     * True when the number is reserved for this project: only personas that pin it
     * call from it. False for the shared pool, which any simulation call may use.
     */
    reservedForProject: boolean;
  }
}

export declare namespace SimulationPhoneNumber {
  export { type SimulationPhoneNumberListResponse as SimulationPhoneNumberListResponse };
}
