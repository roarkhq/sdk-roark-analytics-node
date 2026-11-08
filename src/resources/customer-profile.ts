// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class CustomerProfile extends APIResource {
  /**
   * Returns the people who have talked to your agents in this project. Customers we
   * hold nothing about beyond their identifier are left out unless includeNoData is
   * true.
   *
   * @example
   * ```ts
   * const customerProfiles =
   *   await client.customerProfile.list();
   * ```
   */
  list(
    query: CustomerProfileListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CustomerProfileListResponse> {
    return this._client.get('/v1/customer-profile', { query, ...options });
  }

  /**
   * Permanently removes the profile, its fields, evidence and notes. Conversations
   * are kept. A new conversation from the same identifier creates a new profile.
   *
   * @example
   * ```ts
   * const customerProfile = await client.customerProfile.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(customerProfileID: string, options?: RequestOptions): APIPromise<CustomerProfileDeleteResponse> {
    return this._client.delete(path`/v1/customer-profile/${customerProfileID}`, options);
  }

  /**
   * Removes the value and any lock, so a later conversation can fill it again.
   *
   * @example
   * ```ts
   * const response =
   *   await client.customerProfile.clearAttribute('FULL_NAME', {
   *     customerProfileId:
   *       '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   });
   * ```
   */
  clearAttribute(
    key:
      | 'FULL_NAME'
      | 'PREFERRED_NAME'
      | 'ACCOUNT_ID'
      | 'COMPANY'
      | 'JOB_TITLE'
      | 'EMAIL'
      | 'ALTERNATE_PHONE'
      | 'AGE'
      | 'GENDER'
      | 'LANGUAGE'
      | 'LOCATION'
      | 'TIMEZONE'
      | 'BEST_TIME_TO_REACH'
      | 'PREFERRED_CHANNEL',
    params: CustomerProfileClearAttributeParams,
    options?: RequestOptions,
  ): APIPromise<CustomerProfileClearAttributeResponse> {
    const { customerProfileId } = params;
    return this._client.delete(path`/v1/customer-profile/${customerProfileId}/attributes/${key}`, options);
  }

  /**
   * Get a customer profile
   *
   * @example
   * ```ts
   * const response = await client.customerProfile.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  getByID(customerProfileID: string, options?: RequestOptions): APIPromise<CustomerProfileGetByIDResponse> {
    return this._client.get(path`/v1/customer-profile/${customerProfileID}`, options);
  }

  /**
   * Calls and chats with this customer, newest first.
   *
   * @example
   * ```ts
   * const response =
   *   await client.customerProfile.listConversations(
   *     'customerProfileId',
   *   );
   * ```
   */
  listConversations(
    customerProfileID: string,
    query: CustomerProfileListConversationsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CustomerProfileListConversationsResponse> {
    return this._client.get(path`/v1/customer-profile/${customerProfileID}/conversations`, {
      query,
      ...options,
    });
  }

  /**
   * Sets the value and locks the field, so newer conversations cannot change it.
   *
   * @example
   * ```ts
   * const response = await client.customerProfile.setAttribute(
   *   'FULL_NAME',
   *   {
   *     customerProfileId:
   *       '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     value: 'x',
   *   },
   * );
   * ```
   */
  setAttribute(
    key:
      | 'FULL_NAME'
      | 'PREFERRED_NAME'
      | 'ACCOUNT_ID'
      | 'COMPANY'
      | 'JOB_TITLE'
      | 'EMAIL'
      | 'ALTERNATE_PHONE'
      | 'AGE'
      | 'GENDER'
      | 'LANGUAGE'
      | 'LOCATION'
      | 'TIMEZONE'
      | 'BEST_TIME_TO_REACH'
      | 'PREFERRED_CHANNEL',
    params: CustomerProfileSetAttributeParams,
    options?: RequestOptions,
  ): APIPromise<CustomerProfileSetAttributeResponse> {
    const { customerProfileId, ...body } = params;
    return this._client.put(path`/v1/customer-profile/${customerProfileId}/attributes/${key}`, {
      body,
      ...options,
    });
  }

  /**
   * Lets newer conversations change this field again. The current value stays until
   * one does.
   *
   * @example
   * ```ts
   * const response =
   *   await client.customerProfile.unlockAttribute(
   *     'FULL_NAME',
   *     {
   *       customerProfileId:
   *         '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     },
   *   );
   * ```
   */
  unlockAttribute(
    key:
      | 'FULL_NAME'
      | 'PREFERRED_NAME'
      | 'ACCOUNT_ID'
      | 'COMPANY'
      | 'JOB_TITLE'
      | 'EMAIL'
      | 'ALTERNATE_PHONE'
      | 'AGE'
      | 'GENDER'
      | 'LANGUAGE'
      | 'LOCATION'
      | 'TIMEZONE'
      | 'BEST_TIME_TO_REACH'
      | 'PREFERRED_CHANNEL',
    params: CustomerProfileUnlockAttributeParams,
    options?: RequestOptions,
  ): APIPromise<CustomerProfileUnlockAttributeResponse> {
    const { customerProfileId } = params;
    return this._client.post(
      path`/v1/customer-profile/${customerProfileId}/attributes/${key}/unlock`,
      options,
    );
  }

  /**
   * Replaces your team's shared notes. Null or empty clears them. The last save
   * wins.
   *
   * @example
   * ```ts
   * const response = await client.customerProfile.updateNotes(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { notes: 'notes' },
   * );
   * ```
   */
  updateNotes(
    customerProfileID: string,
    body: CustomerProfileUpdateNotesParams,
    options?: RequestOptions,
  ): APIPromise<CustomerProfileUpdateNotesResponse> {
    return this._client.put(path`/v1/customer-profile/${customerProfileID}/notes`, { body, ...options });
  }
}

export interface CustomerProfileListResponse {
  data: CustomerProfileListResponse.Data;
}

export namespace CustomerProfileListResponse {
  export interface Data {
    items: Array<Data.Item>;

    page: number;

    totalCount: number;
  }

  export namespace Data {
    export interface Item {
      /**
       * Unique identifier of the customer profile
       */
      id: string;

      agentIds: Array<string>;

      attributes: Array<Item.Attribute>;

      chatCount: number;

      conversationCount: number;

      /**
       * Null until a name is known, which is common
       */
      displayName: string | null;

      externalId: string | null;

      firstSeenAt: string | null;

      lastSeenAt: string | null;

      /**
       * Your team's shared notes. Never sent to the agent.
       */
      notes: string | null;

      notesUpdatedAt: string | null;

      openItems: string | null;

      phoneNumberE164: string | null;

      summary: string | null;

      /**
       * Voice only. Chat time is not included.
       */
      talkTimeMs: number;

      voiceCount: number;
    }

    export namespace Item {
      export interface Attribute {
        /**
         * What a newer conversation said while this field was locked
         */
        blockedValue: string | null;

        /**
         * The moment the current value was heard. Null for a value set by a person or the
         * API.
         */
        evidence: Attribute.Evidence | null;

        /**
         * Other values this field has held or been offered, newest first
         */
        history: Array<Attribute.History>;

        /**
         * True when newer conversations cannot change this field
         */
        isLocked: boolean;

        key:
          | 'FULL_NAME'
          | 'PREFERRED_NAME'
          | 'ACCOUNT_ID'
          | 'COMPANY'
          | 'JOB_TITLE'
          | 'EMAIL'
          | 'ALTERNATE_PHONE'
          | 'AGE'
          | 'GENDER'
          | 'LANGUAGE'
          | 'LOCATION'
          | 'TIMEZONE'
          | 'BEST_TIME_TO_REACH'
          | 'PREFERRED_CHANNEL';

        observedAt: string;

        /**
         * Where the current value came from. LIVE and POST_CALL extraction are read from
         * conversations.
         */
        source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

        value: string;
      }

      export namespace Attribute {
        /**
         * The moment the current value was heard. Null for a value set by a person or the
         * API.
         */
        export interface Evidence {
          callId: string | null;

          chatId: string | null;

          observedAt: string;

          /**
           * Where in the conversation this was said
           */
          offsetMs: number | null;

          /**
           * The customer's words. Null on a project with redaction on.
           */
          quote: string | null;

          source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

          value: string;
        }

        export interface History {
          callId: string | null;

          chatId: string | null;

          observedAt: string;

          /**
           * Where in the conversation this was said
           */
          offsetMs: number | null;

          /**
           * The customer's words. Null on a project with redaction on.
           */
          quote: string | null;

          source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

          value: string;
        }
      }
    }
  }
}

export interface CustomerProfileDeleteResponse {
  data: CustomerProfileDeleteResponse.Data;
}

export namespace CustomerProfileDeleteResponse {
  export interface Data {
    success: boolean;
  }
}

export interface CustomerProfileClearAttributeResponse {
  data: CustomerProfileClearAttributeResponse.Data;
}

export namespace CustomerProfileClearAttributeResponse {
  export interface Data {
    /**
     * Unique identifier of the customer profile
     */
    id: string;

    agentIds: Array<string>;

    attributes: Array<Data.Attribute>;

    chatCount: number;

    conversationCount: number;

    /**
     * Null until a name is known, which is common
     */
    displayName: string | null;

    externalId: string | null;

    firstSeenAt: string | null;

    lastSeenAt: string | null;

    /**
     * Your team's shared notes. Never sent to the agent.
     */
    notes: string | null;

    notesUpdatedAt: string | null;

    openItems: string | null;

    phoneNumberE164: string | null;

    summary: string | null;

    /**
     * Voice only. Chat time is not included.
     */
    talkTimeMs: number;

    voiceCount: number;
  }

  export namespace Data {
    export interface Attribute {
      /**
       * What a newer conversation said while this field was locked
       */
      blockedValue: string | null;

      /**
       * The moment the current value was heard. Null for a value set by a person or the
       * API.
       */
      evidence: Attribute.Evidence | null;

      /**
       * Other values this field has held or been offered, newest first
       */
      history: Array<Attribute.History>;

      /**
       * True when newer conversations cannot change this field
       */
      isLocked: boolean;

      key:
        | 'FULL_NAME'
        | 'PREFERRED_NAME'
        | 'ACCOUNT_ID'
        | 'COMPANY'
        | 'JOB_TITLE'
        | 'EMAIL'
        | 'ALTERNATE_PHONE'
        | 'AGE'
        | 'GENDER'
        | 'LANGUAGE'
        | 'LOCATION'
        | 'TIMEZONE'
        | 'BEST_TIME_TO_REACH'
        | 'PREFERRED_CHANNEL';

      observedAt: string;

      /**
       * Where the current value came from. LIVE and POST_CALL extraction are read from
       * conversations.
       */
      source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

      value: string;
    }

    export namespace Attribute {
      /**
       * The moment the current value was heard. Null for a value set by a person or the
       * API.
       */
      export interface Evidence {
        callId: string | null;

        chatId: string | null;

        observedAt: string;

        /**
         * Where in the conversation this was said
         */
        offsetMs: number | null;

        /**
         * The customer's words. Null on a project with redaction on.
         */
        quote: string | null;

        source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

        value: string;
      }

      export interface History {
        callId: string | null;

        chatId: string | null;

        observedAt: string;

        /**
         * Where in the conversation this was said
         */
        offsetMs: number | null;

        /**
         * The customer's words. Null on a project with redaction on.
         */
        quote: string | null;

        source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

        value: string;
      }
    }
  }
}

export interface CustomerProfileGetByIDResponse {
  data: CustomerProfileGetByIDResponse.Data;
}

export namespace CustomerProfileGetByIDResponse {
  export interface Data {
    /**
     * Unique identifier of the customer profile
     */
    id: string;

    agentIds: Array<string>;

    attributes: Array<Data.Attribute>;

    chatCount: number;

    conversationCount: number;

    /**
     * Null until a name is known, which is common
     */
    displayName: string | null;

    externalId: string | null;

    firstSeenAt: string | null;

    lastSeenAt: string | null;

    /**
     * Your team's shared notes. Never sent to the agent.
     */
    notes: string | null;

    notesUpdatedAt: string | null;

    openItems: string | null;

    phoneNumberE164: string | null;

    summary: string | null;

    /**
     * Voice only. Chat time is not included.
     */
    talkTimeMs: number;

    voiceCount: number;
  }

  export namespace Data {
    export interface Attribute {
      /**
       * What a newer conversation said while this field was locked
       */
      blockedValue: string | null;

      /**
       * The moment the current value was heard. Null for a value set by a person or the
       * API.
       */
      evidence: Attribute.Evidence | null;

      /**
       * Other values this field has held or been offered, newest first
       */
      history: Array<Attribute.History>;

      /**
       * True when newer conversations cannot change this field
       */
      isLocked: boolean;

      key:
        | 'FULL_NAME'
        | 'PREFERRED_NAME'
        | 'ACCOUNT_ID'
        | 'COMPANY'
        | 'JOB_TITLE'
        | 'EMAIL'
        | 'ALTERNATE_PHONE'
        | 'AGE'
        | 'GENDER'
        | 'LANGUAGE'
        | 'LOCATION'
        | 'TIMEZONE'
        | 'BEST_TIME_TO_REACH'
        | 'PREFERRED_CHANNEL';

      observedAt: string;

      /**
       * Where the current value came from. LIVE and POST_CALL extraction are read from
       * conversations.
       */
      source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

      value: string;
    }

    export namespace Attribute {
      /**
       * The moment the current value was heard. Null for a value set by a person or the
       * API.
       */
      export interface Evidence {
        callId: string | null;

        chatId: string | null;

        observedAt: string;

        /**
         * Where in the conversation this was said
         */
        offsetMs: number | null;

        /**
         * The customer's words. Null on a project with redaction on.
         */
        quote: string | null;

        source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

        value: string;
      }

      export interface History {
        callId: string | null;

        chatId: string | null;

        observedAt: string;

        /**
         * Where in the conversation this was said
         */
        offsetMs: number | null;

        /**
         * The customer's words. Null on a project with redaction on.
         */
        quote: string | null;

        source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

        value: string;
      }
    }
  }
}

export interface CustomerProfileListConversationsResponse {
  data: CustomerProfileListConversationsResponse.Data;
}

export namespace CustomerProfileListConversationsResponse {
  export interface Data {
    items: Array<Data.Item>;

    page: number;

    totalCount: number;
  }

  export namespace Data {
    export interface Item {
      id: string;

      conversationType: 'call' | 'chat';

      durationMs: number | null;

      startedAt: string;

      summary: string | null;

      title: string | null;
    }
  }
}

export interface CustomerProfileSetAttributeResponse {
  data: CustomerProfileSetAttributeResponse.Data;
}

export namespace CustomerProfileSetAttributeResponse {
  export interface Data {
    /**
     * Unique identifier of the customer profile
     */
    id: string;

    agentIds: Array<string>;

    attributes: Array<Data.Attribute>;

    chatCount: number;

    conversationCount: number;

    /**
     * Null until a name is known, which is common
     */
    displayName: string | null;

    externalId: string | null;

    firstSeenAt: string | null;

    lastSeenAt: string | null;

    /**
     * Your team's shared notes. Never sent to the agent.
     */
    notes: string | null;

    notesUpdatedAt: string | null;

    openItems: string | null;

    phoneNumberE164: string | null;

    summary: string | null;

    /**
     * Voice only. Chat time is not included.
     */
    talkTimeMs: number;

    voiceCount: number;
  }

  export namespace Data {
    export interface Attribute {
      /**
       * What a newer conversation said while this field was locked
       */
      blockedValue: string | null;

      /**
       * The moment the current value was heard. Null for a value set by a person or the
       * API.
       */
      evidence: Attribute.Evidence | null;

      /**
       * Other values this field has held or been offered, newest first
       */
      history: Array<Attribute.History>;

      /**
       * True when newer conversations cannot change this field
       */
      isLocked: boolean;

      key:
        | 'FULL_NAME'
        | 'PREFERRED_NAME'
        | 'ACCOUNT_ID'
        | 'COMPANY'
        | 'JOB_TITLE'
        | 'EMAIL'
        | 'ALTERNATE_PHONE'
        | 'AGE'
        | 'GENDER'
        | 'LANGUAGE'
        | 'LOCATION'
        | 'TIMEZONE'
        | 'BEST_TIME_TO_REACH'
        | 'PREFERRED_CHANNEL';

      observedAt: string;

      /**
       * Where the current value came from. LIVE and POST_CALL extraction are read from
       * conversations.
       */
      source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

      value: string;
    }

    export namespace Attribute {
      /**
       * The moment the current value was heard. Null for a value set by a person or the
       * API.
       */
      export interface Evidence {
        callId: string | null;

        chatId: string | null;

        observedAt: string;

        /**
         * Where in the conversation this was said
         */
        offsetMs: number | null;

        /**
         * The customer's words. Null on a project with redaction on.
         */
        quote: string | null;

        source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

        value: string;
      }

      export interface History {
        callId: string | null;

        chatId: string | null;

        observedAt: string;

        /**
         * Where in the conversation this was said
         */
        offsetMs: number | null;

        /**
         * The customer's words. Null on a project with redaction on.
         */
        quote: string | null;

        source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

        value: string;
      }
    }
  }
}

export interface CustomerProfileUnlockAttributeResponse {
  data: CustomerProfileUnlockAttributeResponse.Data;
}

export namespace CustomerProfileUnlockAttributeResponse {
  export interface Data {
    /**
     * Unique identifier of the customer profile
     */
    id: string;

    agentIds: Array<string>;

    attributes: Array<Data.Attribute>;

    chatCount: number;

    conversationCount: number;

    /**
     * Null until a name is known, which is common
     */
    displayName: string | null;

    externalId: string | null;

    firstSeenAt: string | null;

    lastSeenAt: string | null;

    /**
     * Your team's shared notes. Never sent to the agent.
     */
    notes: string | null;

    notesUpdatedAt: string | null;

    openItems: string | null;

    phoneNumberE164: string | null;

    summary: string | null;

    /**
     * Voice only. Chat time is not included.
     */
    talkTimeMs: number;

    voiceCount: number;
  }

  export namespace Data {
    export interface Attribute {
      /**
       * What a newer conversation said while this field was locked
       */
      blockedValue: string | null;

      /**
       * The moment the current value was heard. Null for a value set by a person or the
       * API.
       */
      evidence: Attribute.Evidence | null;

      /**
       * Other values this field has held or been offered, newest first
       */
      history: Array<Attribute.History>;

      /**
       * True when newer conversations cannot change this field
       */
      isLocked: boolean;

      key:
        | 'FULL_NAME'
        | 'PREFERRED_NAME'
        | 'ACCOUNT_ID'
        | 'COMPANY'
        | 'JOB_TITLE'
        | 'EMAIL'
        | 'ALTERNATE_PHONE'
        | 'AGE'
        | 'GENDER'
        | 'LANGUAGE'
        | 'LOCATION'
        | 'TIMEZONE'
        | 'BEST_TIME_TO_REACH'
        | 'PREFERRED_CHANNEL';

      observedAt: string;

      /**
       * Where the current value came from. LIVE and POST_CALL extraction are read from
       * conversations.
       */
      source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

      value: string;
    }

    export namespace Attribute {
      /**
       * The moment the current value was heard. Null for a value set by a person or the
       * API.
       */
      export interface Evidence {
        callId: string | null;

        chatId: string | null;

        observedAt: string;

        /**
         * Where in the conversation this was said
         */
        offsetMs: number | null;

        /**
         * The customer's words. Null on a project with redaction on.
         */
        quote: string | null;

        source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

        value: string;
      }

      export interface History {
        callId: string | null;

        chatId: string | null;

        observedAt: string;

        /**
         * Where in the conversation this was said
         */
        offsetMs: number | null;

        /**
         * The customer's words. Null on a project with redaction on.
         */
        quote: string | null;

        source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

        value: string;
      }
    }
  }
}

export interface CustomerProfileUpdateNotesResponse {
  data: CustomerProfileUpdateNotesResponse.Data;
}

export namespace CustomerProfileUpdateNotesResponse {
  export interface Data {
    /**
     * Unique identifier of the customer profile
     */
    id: string;

    agentIds: Array<string>;

    attributes: Array<Data.Attribute>;

    chatCount: number;

    conversationCount: number;

    /**
     * Null until a name is known, which is common
     */
    displayName: string | null;

    externalId: string | null;

    firstSeenAt: string | null;

    lastSeenAt: string | null;

    /**
     * Your team's shared notes. Never sent to the agent.
     */
    notes: string | null;

    notesUpdatedAt: string | null;

    openItems: string | null;

    phoneNumberE164: string | null;

    summary: string | null;

    /**
     * Voice only. Chat time is not included.
     */
    talkTimeMs: number;

    voiceCount: number;
  }

  export namespace Data {
    export interface Attribute {
      /**
       * What a newer conversation said while this field was locked
       */
      blockedValue: string | null;

      /**
       * The moment the current value was heard. Null for a value set by a person or the
       * API.
       */
      evidence: Attribute.Evidence | null;

      /**
       * Other values this field has held or been offered, newest first
       */
      history: Array<Attribute.History>;

      /**
       * True when newer conversations cannot change this field
       */
      isLocked: boolean;

      key:
        | 'FULL_NAME'
        | 'PREFERRED_NAME'
        | 'ACCOUNT_ID'
        | 'COMPANY'
        | 'JOB_TITLE'
        | 'EMAIL'
        | 'ALTERNATE_PHONE'
        | 'AGE'
        | 'GENDER'
        | 'LANGUAGE'
        | 'LOCATION'
        | 'TIMEZONE'
        | 'BEST_TIME_TO_REACH'
        | 'PREFERRED_CHANNEL';

      observedAt: string;

      /**
       * Where the current value came from. LIVE and POST_CALL extraction are read from
       * conversations.
       */
      source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

      value: string;
    }

    export namespace Attribute {
      /**
       * The moment the current value was heard. Null for a value set by a person or the
       * API.
       */
      export interface Evidence {
        callId: string | null;

        chatId: string | null;

        observedAt: string;

        /**
         * Where in the conversation this was said
         */
        offsetMs: number | null;

        /**
         * The customer's words. Null on a project with redaction on.
         */
        quote: string | null;

        source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

        value: string;
      }

      export interface History {
        callId: string | null;

        chatId: string | null;

        observedAt: string;

        /**
         * Where in the conversation this was said
         */
        offsetMs: number | null;

        /**
         * The customer's words. Null on a project with redaction on.
         */
        quote: string | null;

        source: 'LIVE_EXTRACTION' | 'POST_CALL_EXTRACTION' | 'API' | 'USER';

        value: string;
      }
    }
  }
}

export interface CustomerProfileListParams {
  agentId?: string;

  /**
   * Filter by this field. Use with fieldOperator and, unless checking presence,
   * fieldValue.
   */
  fieldKey?:
    | 'FULL_NAME'
    | 'PREFERRED_NAME'
    | 'ACCOUNT_ID'
    | 'COMPANY'
    | 'JOB_TITLE'
    | 'EMAIL'
    | 'ALTERNATE_PHONE'
    | 'AGE'
    | 'GENDER'
    | 'LANGUAGE'
    | 'LOCATION'
    | 'TIMEZONE'
    | 'BEST_TIME_TO_REACH'
    | 'PREFERRED_CHANNEL';

  /**
   * How fieldValue is compared, ignoring case. NOT_EQUALS includes customers without
   * the field.
   */
  fieldOperator?: 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'STARTS_WITH' | 'IS_SET' | 'IS_NOT_SET';

  fieldValue?: string;

  /**
   * Include customers we hold nothing about beyond their identifier. Defaults to
   * false.
   */
  includeNoData?: 'true' | 'false';

  limit?: number;

  modality?: 'call' | 'chat';

  page?: number;

  search?: string;

  /**
   * A column, or field.<KEY> (for example field.COMPANY) to sort by a field's value.
   * Customers without a value sort last.
   */
  sortBy?:
    | 'lastSeenAt'
    | 'firstSeenAt'
    | 'conversationCount'
    | 'voiceCount'
    | 'chatCount'
    | 'talkTimeMs'
    | 'displayName'
    | 'field.FULL_NAME'
    | 'field.PREFERRED_NAME'
    | 'field.ACCOUNT_ID'
    | 'field.COMPANY'
    | 'field.JOB_TITLE'
    | 'field.EMAIL'
    | 'field.ALTERNATE_PHONE'
    | 'field.AGE'
    | 'field.GENDER'
    | 'field.LANGUAGE'
    | 'field.LOCATION'
    | 'field.TIMEZONE'
    | 'field.BEST_TIME_TO_REACH'
    | 'field.PREFERRED_CHANNEL';

  sortDirection?: 'asc' | 'desc';
}

export interface CustomerProfileClearAttributeParams {
  customerProfileId: string;
}

export interface CustomerProfileListConversationsParams {
  limit?: number;

  page?: number;
}

export interface CustomerProfileSetAttributeParams {
  /**
   * Path param
   */
  customerProfileId: string;

  /**
   * Body param: The new value. Setting a field locks it, so newer conversations
   * cannot change it.
   */
  value: string;
}

export interface CustomerProfileUnlockAttributeParams {
  customerProfileId: string;
}

export interface CustomerProfileUpdateNotesParams {
  /**
   * Replaces the existing notes. Null or empty clears them.
   */
  notes: string | null;
}

export declare namespace CustomerProfile {
  export {
    type CustomerProfileListResponse as CustomerProfileListResponse,
    type CustomerProfileDeleteResponse as CustomerProfileDeleteResponse,
    type CustomerProfileClearAttributeResponse as CustomerProfileClearAttributeResponse,
    type CustomerProfileGetByIDResponse as CustomerProfileGetByIDResponse,
    type CustomerProfileListConversationsResponse as CustomerProfileListConversationsResponse,
    type CustomerProfileSetAttributeResponse as CustomerProfileSetAttributeResponse,
    type CustomerProfileUnlockAttributeResponse as CustomerProfileUnlockAttributeResponse,
    type CustomerProfileUpdateNotesResponse as CustomerProfileUpdateNotesResponse,
    type CustomerProfileListParams as CustomerProfileListParams,
    type CustomerProfileClearAttributeParams as CustomerProfileClearAttributeParams,
    type CustomerProfileListConversationsParams as CustomerProfileListConversationsParams,
    type CustomerProfileSetAttributeParams as CustomerProfileSetAttributeParams,
    type CustomerProfileUnlockAttributeParams as CustomerProfileUnlockAttributeParams,
    type CustomerProfileUpdateNotesParams as CustomerProfileUpdateNotesParams,
  };
}
