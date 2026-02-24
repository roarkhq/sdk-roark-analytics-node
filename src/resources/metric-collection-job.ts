// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class MetricCollectionJob extends APIResource {
  /**
   * Creates a metric collection job for the specified calls and metrics, then
   * triggers processing.
   */
  create(
    body: MetricCollectionJobCreateParams,
    options?: RequestOptions,
  ): APIPromise<MetricCollectionJobCreateResponse> {
    return this._client.post('/v1/metric/collection-jobs', { body, ...options });
  }

  /**
   * Returns a paginated list of metric collection jobs for the project.
   */
  list(
    query: MetricCollectionJobListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MetricCollectionJobListResponse> {
    return this._client.get('/v1/metric/collection-jobs', { query, ...options });
  }

  /**
   * Returns a specific metric collection job with progress information.
   */
  getByID(jobID: string, options?: RequestOptions): APIPromise<MetricCollectionJobGetByIDResponse> {
    return this._client.get(path`/v1/metric/collection-jobs/${jobID}`, options);
  }
}

export interface MetricCollectionJobCreateResponse {
  /**
   * A metric collection job that processes metrics for calls
   */
  data: MetricCollectionJobCreateResponse.Data;
}

export namespace MetricCollectionJobCreateResponse {
  /**
   * A metric collection job that processes metrics for calls
   */
  export interface Data {
    /**
     * Unique identifier of the metric collection job
     */
    id: string;

    /**
     * When the job completed
     */
    completedAt: string | null;

    /**
     * Number of successfully completed items
     */
    completedItems: number;

    /**
     * When the job was created
     */
    createdAt: string;

    /**
     * Error message if the job failed
     */
    errorMessage: string | null;

    /**
     * Number of failed items
     */
    failedItems: number;

    /**
     * When the job started processing
     */
    startedAt: string | null;

    /**
     * Current status of the job
     */
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED';

    /**
     * Total number of call-metric pairs to process
     */
    totalItems: number;

    /**
     * What triggered this job
     */
    triggeredBy: 'USER_MANUAL' | 'USER_API' | 'METRIC_POLICY' | 'SIMULATION';

    /**
     * When the job was last updated
     */
    updatedAt: string;
  }
}

/**
 * Paginated list of metric collection jobs
 */
export interface MetricCollectionJobListResponse {
  data: Array<MetricCollectionJobListResponse.Data>;

  pagination: MetricCollectionJobListResponse.Pagination;
}

export namespace MetricCollectionJobListResponse {
  /**
   * A metric collection job that processes metrics for calls
   */
  export interface Data {
    /**
     * Unique identifier of the metric collection job
     */
    id: string;

    /**
     * When the job completed
     */
    completedAt: string | null;

    /**
     * Number of successfully completed items
     */
    completedItems: number;

    /**
     * When the job was created
     */
    createdAt: string;

    /**
     * Error message if the job failed
     */
    errorMessage: string | null;

    /**
     * Number of failed items
     */
    failedItems: number;

    /**
     * When the job started processing
     */
    startedAt: string | null;

    /**
     * Current status of the job
     */
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED';

    /**
     * Total number of call-metric pairs to process
     */
    totalItems: number;

    /**
     * What triggered this job
     */
    triggeredBy: 'USER_MANUAL' | 'USER_API' | 'METRIC_POLICY' | 'SIMULATION';

    /**
     * When the job was last updated
     */
    updatedAt: string;
  }

  export interface Pagination {
    /**
     * Whether there are more items to fetch
     */
    hasMore: boolean;

    /**
     * Cursor for the next page of items
     */
    nextCursor: string | null;

    /**
     * Total number of items
     */
    total: number;
  }
}

export interface MetricCollectionJobGetByIDResponse {
  /**
   * A metric collection job that processes metrics for calls
   */
  data: MetricCollectionJobGetByIDResponse.Data;
}

export namespace MetricCollectionJobGetByIDResponse {
  /**
   * A metric collection job that processes metrics for calls
   */
  export interface Data {
    /**
     * Unique identifier of the metric collection job
     */
    id: string;

    /**
     * When the job completed
     */
    completedAt: string | null;

    /**
     * Number of successfully completed items
     */
    completedItems: number;

    /**
     * When the job was created
     */
    createdAt: string;

    /**
     * Error message if the job failed
     */
    errorMessage: string | null;

    /**
     * Number of failed items
     */
    failedItems: number;

    /**
     * When the job started processing
     */
    startedAt: string | null;

    /**
     * Current status of the job
     */
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED';

    /**
     * Total number of call-metric pairs to process
     */
    totalItems: number;

    /**
     * What triggered this job
     */
    triggeredBy: 'USER_MANUAL' | 'USER_API' | 'METRIC_POLICY' | 'SIMULATION';

    /**
     * When the job was last updated
     */
    updatedAt: string;
  }
}

export interface MetricCollectionJobCreateParams {
  /**
   * Call IDs to collect metrics for
   */
  callIds: Array<string>;

  /**
   * Metric definitions to collect
   */
  metrics: Array<MetricCollectionJobCreateParams.Metric>;
}

export namespace MetricCollectionJobCreateParams {
  export interface Metric {
    id: string;
  }
}

export interface MetricCollectionJobListParams {
  /**
   * Cursor for pagination - use the nextCursor value from a previous response
   */
  after?: string;

  /**
   * Maximum number of jobs to return (default: 20, max: 50)
   */
  limit?: number;

  /**
   * Filter by job status
   */
  status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED';
}

export declare namespace MetricCollectionJob {
  export {
    type MetricCollectionJobCreateResponse as MetricCollectionJobCreateResponse,
    type MetricCollectionJobListResponse as MetricCollectionJobListResponse,
    type MetricCollectionJobGetByIDResponse as MetricCollectionJobGetByIDResponse,
    type MetricCollectionJobCreateParams as MetricCollectionJobCreateParams,
    type MetricCollectionJobListParams as MetricCollectionJobListParams,
  };
}
