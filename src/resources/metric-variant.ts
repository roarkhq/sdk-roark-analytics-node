// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class MetricVariant extends APIResource {
  /**
   * Add a configuration of this metric for your organization, seeded from its
   * Default. Edit it with PUT to change what it measures, then pin it where you want
   * it used.
   *
   * Threshold metrics have no variants: their configuration comes from the metric
   * they derive from. Metrics in a package that manages its own variants reject this
   * too.
   *
   * @example
   * ```ts
   * const metricVariant = await client.metricVariant.create(
   *   'idOrSlug',
   *   { name: 'Strict' },
   * );
   * ```
   */
  create(
    idOrSlug: string,
    body: MetricVariantCreateParams,
    options?: RequestOptions,
  ): APIPromise<MetricVariantCreateResponse> {
    return this._client.post(path`/v1/metric/definitions/${idOrSlug}/variants`, { body, ...options });
  }

  /**
   * Rename a variant, change its configuration, or both. Every configuration change
   * creates a new immutable version and advances `versionId`; the response carries
   * the advanced value.
   *
   * **Editing one of Roark’s own variants forks it for your organization.** The
   * response carries the new variant’s `id`, which will differ from the one in the
   * path, and `isSystem` becomes false. Roark’s variant is untouched and other
   * organizations keep it. DELETE your fork to go back to it.
   *
   * Which fields are editable depends on the metric: some Roark metrics lock their
   * prompt or output configuration, and a locked field is rejected rather than
   * ignored.
   *
   * @example
   * ```ts
   * const metricVariant = await client.metricVariant.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { idOrSlug: 'idOrSlug' },
   * );
   * ```
   */
  update(
    variantID: string,
    params: MetricVariantUpdateParams,
    options?: RequestOptions,
  ): APIPromise<MetricVariantUpdateResponse> {
    const { idOrSlug, ...body } = params;
    return this._client.put(path`/v1/metric/definitions/${idOrSlug}/variants/${variantID}`, {
      body,
      ...options,
    });
  }

  /**
   * Every configuration of this metric your organization can use: Roark’s own
   * variants and any your organization has added or forked. `isDefault` marks the
   * one the metric is scored with when nothing pins another; pass any variant’s `id`
   * as `sourceVariantId` to pin it on a derived metric.
   *
   * Auto-managed variants (the ones a package materializes for you) are not listed:
   * they are engine state, not configuration you author.
   *
   * @example
   * ```ts
   * const metricVariants =
   *   await client.metricVariant.list('idOrSlug');
   * ```
   */
  list(idOrSlug: string, options?: RequestOptions): APIPromise<MetricVariantListResponse> {
    return this._client.get(path`/v1/metric/definitions/${idOrSlug}/variants`, options);
  }

  /**
   * Remove one of your organization’s variants. Anything pinned to it falls back to
   * the Default, so deleting a fork of a Roark variant returns you to Roark’s
   * configuration.
   *
   * Roark’s own variants cannot be deleted, and neither can a Default. Values
   * already collected under the deleted variant are retained.
   *
   * @example
   * ```ts
   * const metricVariant = await client.metricVariant.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { idOrSlug: 'idOrSlug' },
   * );
   * ```
   */
  delete(
    variantID: string,
    params: MetricVariantDeleteParams,
    options?: RequestOptions,
  ): APIPromise<MetricVariantDeleteResponse> {
    const { idOrSlug } = params;
    return this._client.delete(path`/v1/metric/definitions/${idOrSlug}/variants/${variantID}`, options);
  }

  /**
   * One configuration of this metric, by id.
   *
   * @example
   * ```ts
   * const response = await client.metricVariant.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { idOrSlug: 'idOrSlug' },
   * );
   * ```
   */
  getByID(
    variantID: string,
    params: MetricVariantGetByIDParams,
    options?: RequestOptions,
  ): APIPromise<MetricVariantGetByIDResponse> {
    const { idOrSlug } = params;
    return this._client.get(path`/v1/metric/definitions/${idOrSlug}/variants/${variantID}`, options);
  }
}

export interface MetricVariantCreateResponse {
  /**
   * One named configuration of a metric.
   */
  data: MetricVariantCreateResponse.Data;
}

export namespace MetricVariantCreateResponse {
  /**
   * One named configuration of a metric.
   */
  export interface Data {
    /**
     * Unique identifier for the variant.
     */
    id: string;

    /**
     * When the variant was created.
     */
    createdAt: string;

    /**
     * Whether this is the variant a metric is scored with when nothing pins another.
     */
    isDefault: boolean;

    /**
     * True for Roark's own variant, shared by every organization. Editing one forks it
     * for yours; the original is left alone.
     */
    isSystem: boolean;

    /**
     * The metric this variant configures.
     */
    metricDefinitionId: string;

    /**
     * Name of the variant. "Default" is the one a metric is scored with unless
     * something pins another.
     */
    name: string;

    /**
     * When the variant was last changed.
     */
    updatedAt: string;

    /**
     * The variant's current version: an immutable snapshot of its configuration.
     * Editing the variant advances this. Null only for a variant left without one,
     * which cannot be scored until it is configured.
     */
    versionId: string | null;
  }
}

export interface MetricVariantUpdateResponse {
  /**
   * One named configuration of a metric.
   */
  data: MetricVariantUpdateResponse.Data;
}

export namespace MetricVariantUpdateResponse {
  /**
   * One named configuration of a metric.
   */
  export interface Data {
    /**
     * Unique identifier for the variant.
     */
    id: string;

    /**
     * When the variant was created.
     */
    createdAt: string;

    /**
     * Whether this is the variant a metric is scored with when nothing pins another.
     */
    isDefault: boolean;

    /**
     * True for Roark's own variant, shared by every organization. Editing one forks it
     * for yours; the original is left alone.
     */
    isSystem: boolean;

    /**
     * The metric this variant configures.
     */
    metricDefinitionId: string;

    /**
     * Name of the variant. "Default" is the one a metric is scored with unless
     * something pins another.
     */
    name: string;

    /**
     * When the variant was last changed.
     */
    updatedAt: string;

    /**
     * The variant's current version: an immutable snapshot of its configuration.
     * Editing the variant advances this. Null only for a variant left without one,
     * which cannot be scored until it is configured.
     */
    versionId: string | null;
  }
}

export interface MetricVariantListResponse {
  data: Array<MetricVariantListResponse.Data>;
}

export namespace MetricVariantListResponse {
  /**
   * One named configuration of a metric.
   */
  export interface Data {
    /**
     * Unique identifier for the variant.
     */
    id: string;

    /**
     * When the variant was created.
     */
    createdAt: string;

    /**
     * Whether this is the variant a metric is scored with when nothing pins another.
     */
    isDefault: boolean;

    /**
     * True for Roark's own variant, shared by every organization. Editing one forks it
     * for yours; the original is left alone.
     */
    isSystem: boolean;

    /**
     * The metric this variant configures.
     */
    metricDefinitionId: string;

    /**
     * Name of the variant. "Default" is the one a metric is scored with unless
     * something pins another.
     */
    name: string;

    /**
     * When the variant was last changed.
     */
    updatedAt: string;

    /**
     * The variant's current version: an immutable snapshot of its configuration.
     * Editing the variant advances this. Null only for a variant left without one,
     * which cannot be scored until it is configured.
     */
    versionId: string | null;
  }
}

export interface MetricVariantDeleteResponse {
  data: MetricVariantDeleteResponse.Data;
}

export namespace MetricVariantDeleteResponse {
  export interface Data {
    id: string;

    deleted: true;
  }
}

export interface MetricVariantGetByIDResponse {
  /**
   * One named configuration of a metric.
   */
  data: MetricVariantGetByIDResponse.Data;
}

export namespace MetricVariantGetByIDResponse {
  /**
   * One named configuration of a metric.
   */
  export interface Data {
    /**
     * Unique identifier for the variant.
     */
    id: string;

    /**
     * When the variant was created.
     */
    createdAt: string;

    /**
     * Whether this is the variant a metric is scored with when nothing pins another.
     */
    isDefault: boolean;

    /**
     * True for Roark's own variant, shared by every organization. Editing one forks it
     * for yours; the original is left alone.
     */
    isSystem: boolean;

    /**
     * The metric this variant configures.
     */
    metricDefinitionId: string;

    /**
     * Name of the variant. "Default" is the one a metric is scored with unless
     * something pins another.
     */
    name: string;

    /**
     * When the variant was last changed.
     */
    updatedAt: string;

    /**
     * The variant's current version: an immutable snapshot of its configuration.
     * Editing the variant advances this. Null only for a variant left without one,
     * which cannot be scored until it is configured.
     */
    versionId: string | null;
  }
}

export interface MetricVariantCreateParams {
  /**
   * Name for the new variant. Must be unique for this metric within your
   * organization and cannot be `Default`.
   */
  name: string;
}

export interface MetricVariantUpdateParams {
  /**
   * Path param: Metric definition UUID or its stable slug.
   */
  idOrSlug: string;

  /**
   * Body param: What a `false` value means. Given to the judge as its polarity rule,
   * so keep it accurate.
   */
  booleanFalseLabel?: string;

  /**
   * Body param: What a `true` value means. Given to the judge as its polarity rule,
   * so keep it accurate.
   */
  booleanTrueLabel?: string;

  /**
   * Body param: Free-text audit note recorded on the new version.
   */
  changeReason?: string;

  /**
   * Body param: The rubric this variant applies. LLM judge metrics only.
   */
  llmPrompt?: string;

  /**
   * Body param: Maximum classifications returned. CLASSIFICATION output only.
   */
  maxClassifications?: number;

  /**
   * Body param: Rename the variant. Does not change its configuration, so
   * `versionId` is unaffected. `Default` is reserved.
   */
  name?: string;

  /**
   * Body param: Scale maximum. SCALE output only.
   */
  scaleMax?: number;

  /**
   * Body param: Scale minimum. SCALE output only.
   */
  scaleMin?: number;
}

export interface MetricVariantDeleteParams {
  /**
   * Metric definition UUID or its stable slug.
   */
  idOrSlug: string;
}

export interface MetricVariantGetByIDParams {
  /**
   * Metric definition UUID or its stable slug.
   */
  idOrSlug: string;
}

export declare namespace MetricVariant {
  export {
    type MetricVariantCreateResponse as MetricVariantCreateResponse,
    type MetricVariantUpdateResponse as MetricVariantUpdateResponse,
    type MetricVariantListResponse as MetricVariantListResponse,
    type MetricVariantDeleteResponse as MetricVariantDeleteResponse,
    type MetricVariantGetByIDResponse as MetricVariantGetByIDResponse,
    type MetricVariantCreateParams as MetricVariantCreateParams,
    type MetricVariantUpdateParams as MetricVariantUpdateParams,
    type MetricVariantDeleteParams as MetricVariantDeleteParams,
    type MetricVariantGetByIDParams as MetricVariantGetByIDParams,
  };
}
