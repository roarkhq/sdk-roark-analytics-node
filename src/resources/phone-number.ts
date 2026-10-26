// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class PhoneNumber extends APIResource {
  /**
   * Buys a number from the carrier for this project. Free inside the plan allowance;
   * past it, the first month of rent is charged now and monthly after that.
   *
   * @example
   * ```ts
   * const phoneNumber = await client.phoneNumber.create({
   *   e164: '+14155550123',
   * });
   * ```
   */
  create(body: PhoneNumberCreateParams, options?: RequestOptions): APIPromise<PhoneNumberCreateResponse> {
    return this._client.post('/v1/phone-number', { body, ...options });
  }

  /**
   * Relabels a number or changes which agent it is assigned to. A field left out is
   * untouched; null clears it.
   *
   * @example
   * ```ts
   * const phoneNumber = await client.phoneNumber.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  update(
    phoneNumberID: string,
    body: PhoneNumberUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PhoneNumberUpdateResponse> {
    return this._client.put(path`/v1/phone-number/${phoneNumberID}`, { body, ...options });
  }

  /**
   * Returns the phone numbers the project owns, oldest first, with the agent each is
   * assigned to.
   *
   * @example
   * ```ts
   * const phoneNumbers = await client.phoneNumber.list();
   * ```
   */
  list(
    query: PhoneNumberListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PhoneNumberListResponse> {
    return this._client.get('/v1/phone-number', { query, ...options });
  }

  /**
   * Gives the number back to the carrier. This cannot be undone: rent stops today
   * and nothing is refunded.
   *
   * @example
   * ```ts
   * const phoneNumber = await client.phoneNumber.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(phoneNumberID: string, options?: RequestOptions): APIPromise<PhoneNumberDeleteResponse> {
    return this._client.delete(path`/v1/phone-number/${phoneNumberID}`, options);
  }

  /**
   * Returns how many numbers the organization gets for free, how many it holds, what
   * a paid number costs a month, and whether a purchase would be admitted right now.
   *
   * @example
   * ```ts
   * const response = await client.phoneNumber.getAllowance();
   * ```
   */
  getAllowance(options?: RequestOptions): APIPromise<PhoneNumberGetAllowanceResponse> {
    return this._client.get('/v1/phone-number/allowance', options);
  }

  /**
   * Returns US numbers the carrier has for sale, narrowed by area code or by digits
   * the number must contain. Buy one with POST /v1/phone-number.
   *
   * @example
   * ```ts
   * const response = await client.phoneNumber.listAvailable();
   * ```
   */
  listAvailable(
    query: PhoneNumberListAvailableParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PhoneNumberListAvailableResponse> {
    return this._client.get('/v1/phone-number/available', { query, ...options });
  }
}

export interface PhoneNumberCreateResponse {
  /**
   * A phone number the project owns
   */
  data: PhoneNumberCreateResponse.Data;
}

export namespace PhoneNumberCreateResponse {
  /**
   * A phone number the project owns
   */
  export interface Data {
    /**
     * Phone number ID
     */
    id: string;

    /**
     * The agent the number is assigned to, if any
     */
    agentId: string | null;

    /**
     * The number in E.164 format
     */
    e164: string;

    /**
     * Whether the number sits inside the plan free allowance right now
     */
    isFree: boolean;

    /**
     * ISO 3166-2 code of the region the number is from, when the carrier gave one
     */
    localityCode: string | null;

    /**
     * What a month of this number costs in micro-dollars; 0 while it is free
     */
    monthlyRentMicros: number;

    /**
     * Label the project gave the number
     */
    name: string | null;

    /**
     * When the number was bought (ISO 8601)
     */
    purchasedAt: string;

    /**
     * When the next month of rent is due (ISO 8601)
     */
    rentNextChargeAt: string;
  }
}

export interface PhoneNumberUpdateResponse {
  /**
   * A phone number the project owns
   */
  data: PhoneNumberUpdateResponse.Data;
}

export namespace PhoneNumberUpdateResponse {
  /**
   * A phone number the project owns
   */
  export interface Data {
    /**
     * Phone number ID
     */
    id: string;

    /**
     * The agent the number is assigned to, if any
     */
    agentId: string | null;

    /**
     * The number in E.164 format
     */
    e164: string;

    /**
     * Whether the number sits inside the plan free allowance right now
     */
    isFree: boolean;

    /**
     * ISO 3166-2 code of the region the number is from, when the carrier gave one
     */
    localityCode: string | null;

    /**
     * What a month of this number costs in micro-dollars; 0 while it is free
     */
    monthlyRentMicros: number;

    /**
     * Label the project gave the number
     */
    name: string | null;

    /**
     * When the number was bought (ISO 8601)
     */
    purchasedAt: string;

    /**
     * When the next month of rent is due (ISO 8601)
     */
    rentNextChargeAt: string;
  }
}

export interface PhoneNumberListResponse {
  data: Array<PhoneNumberListResponse.Data>;
}

export namespace PhoneNumberListResponse {
  /**
   * A phone number the project owns
   */
  export interface Data {
    /**
     * Phone number ID
     */
    id: string;

    /**
     * The agent the number is assigned to, if any
     */
    agentId: string | null;

    /**
     * The number in E.164 format
     */
    e164: string;

    /**
     * Whether the number sits inside the plan free allowance right now
     */
    isFree: boolean;

    /**
     * ISO 3166-2 code of the region the number is from, when the carrier gave one
     */
    localityCode: string | null;

    /**
     * What a month of this number costs in micro-dollars; 0 while it is free
     */
    monthlyRentMicros: number;

    /**
     * Label the project gave the number
     */
    name: string | null;

    /**
     * When the number was bought (ISO 8601)
     */
    purchasedAt: string;

    /**
     * When the next month of rent is due (ISO 8601)
     */
    rentNextChargeAt: string;
  }
}

export interface PhoneNumberDeleteResponse {
  /**
   * Confirmation that a phone number was released
   */
  data: PhoneNumberDeleteResponse.Data;
}

export namespace PhoneNumberDeleteResponse {
  /**
   * Confirmation that a phone number was released
   */
  export interface Data {
    /**
     * Phone number ID
     */
    id: string;

    /**
     * Always true; the number is gone and rent has stopped
     */
    released: true;
  }
}

export interface PhoneNumberGetAllowanceResponse {
  /**
   * How many numbers the organization gets for free and whether it may buy the next
   * one
   */
  data: PhoneNumberGetAllowanceResponse.Data;
}

export namespace PhoneNumberGetAllowanceResponse {
  /**
   * How many numbers the organization gets for free and whether it may buy the next
   * one
   */
  export interface Data {
    /**
     * Why a purchase would be refused; null when canPurchase is true
     */
    blockedReason:
      | 'PAYMENT_METHOD_REQUIRED'
      | 'INSUFFICIENT_CREDITS'
      | 'SPEND_CAP_REACHED'
      | 'PLAN_LIMIT_REACHED'
      | null;

    /**
     * Whether a purchase would be admitted right now
     */
    canPurchase: boolean;

    /**
     * Numbers included at no charge
     */
    freeLimit: number;

    /**
     * True when the free allowance comes from a per-organization override
     */
    isOverridden: boolean;

    /**
     * What one paid number costs a month, in micro-dollars
     */
    monthlyRentMicros: number;

    /**
     * Whether the next number would be free
     */
    nextIsFree: boolean;

    /**
     * How many of those sit outside the free allowance
     */
    paidCount: number;

    /**
     * The billing plan the allowance comes from
     */
    plan: 'PAYG' | 'TEAM' | 'ENTERPRISE';

    /**
     * Numbers the organization holds right now
     */
    used: number;
  }
}

export interface PhoneNumberListAvailableResponse {
  data: Array<PhoneNumberListAvailableResponse.Data>;
}

export namespace PhoneNumberListAvailableResponse {
  /**
   * A number the carrier has for sale
   */
  export interface Data {
    /**
     * The number in E.164 format
     */
    e164: string;

    /**
     * Locality the carrier lists, e.g. a city
     */
    locality: string | null;

    /**
     * Region the carrier lists, e.g. a state code
     */
    region: string | null;
  }
}

export interface PhoneNumberCreateParams {
  /**
   * The number to buy, in E.164 format, from a search result
   */
  e164: string;

  /**
   * The agent to assign the number to
   */
  agentId?: string;

  /**
   * Whether you expect this number to be free (from the allowance). The purchase is
   * refused with 409 if that has changed since you checked.
   */
  expectFree?: boolean;

  /**
   * The monthly rent you expect for a paid number, in micros (from the allowance).
   * The purchase is refused with 409 if that has changed since you checked.
   */
  expectMonthlyRentMicros?: number;

  /**
   * A label for the number
   */
  name?: string;
}

export interface PhoneNumberUpdateParams {
  /**
   * Agent to assign the number to; null unassigns, omit to leave it alone
   */
  agentId?: string | null;

  /**
   * New label; null clears it, omit to leave it alone
   */
  name?: string | null;
}

export interface PhoneNumberListParams {
  /**
   * Only the numbers assigned to this agent
   */
  agentId?: string;
}

export interface PhoneNumberListAvailableParams {
  /**
   * Three-digit US area code
   */
  areaCode?: string;

  /**
   * Digits or letters the number must contain (1 to 7, \* matches any digit)
   */
  contains?: string;

  /**
   * Maximum number of results (default: 20, max: 50)
   */
  limit?: number;
}

export declare namespace PhoneNumber {
  export {
    type PhoneNumberCreateResponse as PhoneNumberCreateResponse,
    type PhoneNumberUpdateResponse as PhoneNumberUpdateResponse,
    type PhoneNumberListResponse as PhoneNumberListResponse,
    type PhoneNumberDeleteResponse as PhoneNumberDeleteResponse,
    type PhoneNumberGetAllowanceResponse as PhoneNumberGetAllowanceResponse,
    type PhoneNumberListAvailableResponse as PhoneNumberListAvailableResponse,
    type PhoneNumberCreateParams as PhoneNumberCreateParams,
    type PhoneNumberUpdateParams as PhoneNumberUpdateParams,
    type PhoneNumberListParams as PhoneNumberListParams,
    type PhoneNumberListAvailableParams as PhoneNumberListAvailableParams,
  };
}
