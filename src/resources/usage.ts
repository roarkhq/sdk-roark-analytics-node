// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Usage extends APIResource {
  /**
   * Report billable usage and cost for the organization over a time window, broken
   * down by project (highest spend first). Pass `from`/`to` as ISO 8601 timestamps;
   * optionally pass `projectId` to scope the report to one project. Amounts are
   * billable spend only (what we absorb is never included). Authenticated by either
   * an organization API key with the `usage:read` permission (any project in the
   * organization), or a project API key with the `billing:read` permission (that
   * key's own project only; any other `projectId` is a 403).
   *
   * @example
   * ```ts
   * const usage = await client.usage.get({
   *   from: '2026-09-01T00:00:00Z',
   *   to: '2026-10-01T00:00:00Z',
   * });
   * ```
   */
  get(query: UsageGetParams, options?: RequestOptions): APIPromise<UsageGetResponse> {
    return this._client.get('/v1/usage', { query, ...options });
  }
}

export interface UsageGetResponse {
  data: UsageGetResponse.Data;
}

export namespace UsageGetResponse {
  export interface Data {
    currency: 'usd';

    /**
     * The resolved window start, echoed back as ISO 8601.
     */
    from: string;

    /**
     * Per-project billable spend, highest first. Only projects with spend in the
     * window appear.
     */
    projects: Array<Data.Project>;

    /**
     * The resolved window end, echoed back as ISO 8601.
     */
    to: string;

    /**
     * The same total in US dollars.
     */
    totalUsd: number;

    /**
     * Total billable spend across the organization (or the single project) in
     * micro-dollars.
     */
    totalUsdMicros: number;
  }

  export namespace Data {
    export interface Project {
      /**
       * The same billable spend in US dollars. For display; use amountUsdMicros to
       * reconcile.
       */
      amountUsd: number;

      /**
       * Billable spend in integer micro-dollars (1,000,000 = $1). The exact value.
       */
      amountUsdMicros: number;

      /**
       * This project's spend split by cost type, highest first. Sums to amountUsdMicros.
       */
      breakdown: Array<Project.Breakdown>;

      projectId: string;

      /**
       * Null only if the project no longer exists in this organization.
       */
      projectName: string | null;
    }

    export namespace Project {
      export interface Breakdown {
        /**
         * The same figure in US dollars.
         */
        amountUsd: number;

        /**
         * Billable spend for this type, in micro-dollars.
         */
        amountUsdMicros: number;

        /**
         * The cost source, e.g. SIM*PLATFORM_FEE, SIM_LLM, SIM_TTS, SIM_STT,
         * SIM_TELEPHONY, METRIC, or TRANSCRIPTION. These are the granular sources behind
         * the Billing screen categories (SIM*\* roll up into "Simulation").
         */
        source:
          | 'SIM_PLATFORM_FEE'
          | 'SIM_TTS'
          | 'SIM_STT'
          | 'SIM_LLM'
          | 'SIM_TELEPHONY'
          | 'METRIC'
          | 'TRANSCRIPTION'
          | 'INTERNAL_LLM'
          | 'INTERNAL_STT';

        /**
         * Whether this cost came from a SIMULATION or a production call (POST_CALL).
         */
        surface: 'SIMULATION' | 'POST_CALL';
      }
    }
  }
}

export interface UsageGetParams {
  /**
   * Start of the window (inclusive), ISO 8601.
   */
  from: string;

  /**
   * End of the window (exclusive), ISO 8601. Must be after `from`, and the window
   * may not exceed 366 days.
   */
  to: string;

  /**
   * Limit the report to a single project. Omit for the whole organization.
   */
  projectId?: string;
}

export declare namespace Usage {
  export { type UsageGetResponse as UsageGetResponse, type UsageGetParams as UsageGetParams };
}
