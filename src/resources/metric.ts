// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Metric extends APIResource {
  /**
   * Fetch all metric definitions available in the project, including both
   * system-generated and custom metrics. Only returns metrics from enabled analysis
   * packages.
   */
  listDefinitions(options?: RequestOptions): APIPromise<MetricListDefinitionsResponse> {
    return this._client.get('/v1/metric/definitions', options);
  }
}

export interface MetricListDefinitionsResponse {
  /**
   * Metrics response payload
   */
  data: Array<MetricListDefinitionsResponse.Data>;
}

export namespace MetricListDefinitionsResponse {
  /**
   * Metric definition data
   */
  export interface Data {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * Stable metric identifier
     */
    metricId: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * Whether metric is global or per-participant
     */
    scope: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * Unit information if applicable
     */
    unit?: Data.Unit;
  }

  export namespace Data {
    /**
     * Unit information if applicable
     */
    export interface Unit {
      /**
       * Name of the unit
       */
      name: string;

      /**
       * Symbol for the unit
       */
      symbol: string | null;
    }
  }
}

export declare namespace Metric {
  export { type MetricListDefinitionsResponse as MetricListDefinitionsResponse };
}
