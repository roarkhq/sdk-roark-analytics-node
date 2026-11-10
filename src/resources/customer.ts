// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Customer extends APIResource {
  /**
   * Returns the people who have talked to your agents in this project. Customers we
   * hold nothing about beyond their identifier are left out unless includeNoData is
   * true.
   *
   * @example
   * ```ts
   * const customers = await client.customer.list();
   * ```
   */
  list(
    query: CustomerListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CustomerListResponse> {
    return this._client.get('/v1/customer', { query, ...options });
  }

  /**
   * Permanently removes the customer, with their fields, evidence and notes.
   * Conversations are kept. A new conversation from the same identifier starts a new
   * customer.
   *
   * @example
   * ```ts
   * const customer = await client.customer.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(customerProfileID: string, options?: RequestOptions): APIPromise<CustomerDeleteResponse> {
    return this._client.delete(path`/v1/customer/${customerProfileID}`, options);
  }

  /**
   * Removes the value and any lock, so a later conversation can fill it again.
   *
   * @example
   * ```ts
   * const response = await client.customer.clearAttribute('x', {
   *   customerProfileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * });
   * ```
   */
  clearAttribute(
    key: string,
    params: CustomerClearAttributeParams,
    options?: RequestOptions,
  ): APIPromise<CustomerClearAttributeResponse> {
    const { customerProfileId } = params;
    return this._client.delete(path`/v1/customer/${customerProfileId}/attributes/${key}`, options);
  }

  /**
   * Adds a field of your project's own. With extract on, conversations fill it from
   * what customers say, guided by its description.
   *
   * @example
   * ```ts
   * const response = await client.customer.createField({
   *   extract: true,
   *   key: 'plan_tier',
   *   label: 'x',
   *   valueType: 'TEXT',
   * });
   * ```
   */
  createField(
    body: CustomerCreateFieldParams,
    options?: RequestOptions,
  ): APIPromise<CustomerCreateFieldResponse> {
    return this._client.post('/v1/customer/fields', { body, ...options });
  }

  /**
   * Deletes a field of your project's own. Its values stop showing on customers. A
   * built-in field cannot be deleted; turn it off instead.
   *
   * @example
   * ```ts
   * const response = await client.customer.deleteField('x');
   * ```
   */
  deleteField(key: string, options?: RequestOptions): APIPromise<CustomerDeleteFieldResponse> {
    return this._client.delete(path`/v1/customer/fields/${key}`, options);
  }

  /**
   * Get a customer
   *
   * @example
   * ```ts
   * const response = await client.customer.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  getByID(customerProfileID: string, options?: RequestOptions): APIPromise<CustomerGetByIDResponse> {
    return this._client.get(path`/v1/customer/${customerProfileID}`, options);
  }

  /**
   * Calls and chats with this customer, newest first.
   *
   * @example
   * ```ts
   * const response = await client.customer.listConversations(
   *   'customerProfileId',
   * );
   * ```
   */
  listConversations(
    customerProfileID: string,
    query: CustomerListConversationsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CustomerListConversationsResponse> {
    return this._client.get(path`/v1/customer/${customerProfileID}/conversations`, { query, ...options });
  }

  /**
   * The fields this project's customers can hold, in display order. Use a field's
   * key to filter, sort and set attributes.
   *
   * @example
   * ```ts
   * const response = await client.customer.listFields();
   * ```
   */
  listFields(options?: RequestOptions): APIPromise<CustomerListFieldsResponse> {
    return this._client.get('/v1/customer/fields', options);
  }

  /**
   * Sets the value and locks the field, so newer conversations cannot change it.
   *
   * @example
   * ```ts
   * const response = await client.customer.setAttribute('x', {
   *   customerProfileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   value: 'x',
   * });
   * ```
   */
  setAttribute(
    key: string,
    params: CustomerSetAttributeParams,
    options?: RequestOptions,
  ): APIPromise<CustomerSetAttributeResponse> {
    const { customerProfileId, ...body } = params;
    return this._client.put(path`/v1/customer/${customerProfileId}/attributes/${key}`, { body, ...options });
  }

  /**
   * Lets newer conversations change this field again. The current value stays until
   * one does.
   *
   * @example
   * ```ts
   * const response = await client.customer.unlockAttribute(
   *   'x',
   *   {
   *     customerProfileId:
   *       '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   },
   * );
   * ```
   */
  unlockAttribute(
    key: string,
    params: CustomerUnlockAttributeParams,
    options?: RequestOptions,
  ): APIPromise<CustomerUnlockAttributeResponse> {
    const { customerProfileId } = params;
    return this._client.post(path`/v1/customer/${customerProfileId}/attributes/${key}/unlock`, options);
  }

  /**
   * Changes a field. A built-in field can only be turned on or off for your project;
   * any field of your project's own can change everything but its key.
   *
   * @example
   * ```ts
   * const response = await client.customer.updateField('x');
   * ```
   */
  updateField(
    key: string,
    body: CustomerUpdateFieldParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CustomerUpdateFieldResponse> {
    return this._client.patch(path`/v1/customer/fields/${key}`, { body, ...options });
  }

  /**
   * Replaces your team's shared notes. Null or empty clears them. The last save
   * wins.
   *
   * @example
   * ```ts
   * const response = await client.customer.updateNotes(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { notes: 'notes' },
   * );
   * ```
   */
  updateNotes(
    customerProfileID: string,
    body: CustomerUpdateNotesParams,
    options?: RequestOptions,
  ): APIPromise<CustomerUpdateNotesResponse> {
    return this._client.put(path`/v1/customer/${customerProfileID}/notes`, { body, ...options });
  }
}

export interface CustomerListResponse {
  data: CustomerListResponse.Data;
}

export namespace CustomerListResponse {
  export interface Data {
    items: Array<Data.Item>;

    page: number;

    totalCount: number;
  }

  export namespace Data {
    export interface Item {
      /**
       * Unique identifier of the customer
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
         * True when the value was inferred from the conversation, such as a gender read
         * from a name, rather than stated. A stated value always replaces it.
         */
        isInferred: boolean;

        /**
         * True when newer conversations cannot change this field
         */
        isLocked: boolean;

        key: string;

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

export interface CustomerDeleteResponse {
  data: CustomerDeleteResponse.Data;
}

export namespace CustomerDeleteResponse {
  export interface Data {
    success: boolean;
  }
}

export interface CustomerClearAttributeResponse {
  data: CustomerClearAttributeResponse.Data;
}

export namespace CustomerClearAttributeResponse {
  export interface Data {
    /**
     * Unique identifier of the customer
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
       * True when the value was inferred from the conversation, such as a gender read
       * from a name, rather than stated. A stated value always replaces it.
       */
      isInferred: boolean;

      /**
       * True when newer conversations cannot change this field
       */
      isLocked: boolean;

      key: string;

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

export interface CustomerCreateFieldResponse {
  data: CustomerCreateFieldResponse.Data;
}

export namespace CustomerCreateFieldResponse {
  export interface Data {
    /**
     * What extraction looks for in a conversation
     */
    description: string | null;

    /**
     * Whether conversations fill this field on this project: the project's own setting
     * where it made one
     */
    extract: boolean;

    /**
     * What filters, sorts and attribute routes name the field by
     */
    key: string;

    label: string;

    /**
     * The project redaction setting that, when on, keeps conversations from filling
     * this field
     */
    redactedBy:
      | 'redactName'
      | 'redactEmail'
      | 'redactPhone'
      | 'redactDateOfBirth'
      | 'redactAddress'
      | 'redactBankAccountNumber'
      | null;

    /**
     * SYSTEM for a built-in field, CUSTOM for one your project defined
     */
    source: 'SYSTEM' | 'CUSTOM';

    valueType: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'DATE' | 'PHONE_NUMBER' | 'EMAIL' | 'CURRENCY';
  }
}

export interface CustomerDeleteFieldResponse {
  data: CustomerDeleteFieldResponse.Data;
}

export namespace CustomerDeleteFieldResponse {
  export interface Data {
    success: boolean;
  }
}

export interface CustomerGetByIDResponse {
  data: CustomerGetByIDResponse.Data;
}

export namespace CustomerGetByIDResponse {
  export interface Data {
    /**
     * Unique identifier of the customer
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
       * True when the value was inferred from the conversation, such as a gender read
       * from a name, rather than stated. A stated value always replaces it.
       */
      isInferred: boolean;

      /**
       * True when newer conversations cannot change this field
       */
      isLocked: boolean;

      key: string;

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

export interface CustomerListConversationsResponse {
  data: CustomerListConversationsResponse.Data;
}

export namespace CustomerListConversationsResponse {
  export interface Data {
    items: Array<Data.Item>;

    page: number;

    totalCount: number;
  }

  export namespace Data {
    export interface Item {
      id: string;

      /**
       * `voice` or `chat`.
       */
      conversationType: 'voice' | 'chat';

      durationMs: number | null;

      startedAt: string;

      summary: string | null;

      title: string | null;
    }
  }
}

export interface CustomerListFieldsResponse {
  data: Array<CustomerListFieldsResponse.Data>;
}

export namespace CustomerListFieldsResponse {
  export interface Data {
    /**
     * What extraction looks for in a conversation
     */
    description: string | null;

    /**
     * Whether conversations fill this field on this project: the project's own setting
     * where it made one
     */
    extract: boolean;

    /**
     * What filters, sorts and attribute routes name the field by
     */
    key: string;

    label: string;

    /**
     * The project redaction setting that, when on, keeps conversations from filling
     * this field
     */
    redactedBy:
      | 'redactName'
      | 'redactEmail'
      | 'redactPhone'
      | 'redactDateOfBirth'
      | 'redactAddress'
      | 'redactBankAccountNumber'
      | null;

    /**
     * SYSTEM for a built-in field, CUSTOM for one your project defined
     */
    source: 'SYSTEM' | 'CUSTOM';

    valueType: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'DATE' | 'PHONE_NUMBER' | 'EMAIL' | 'CURRENCY';
  }
}

export interface CustomerSetAttributeResponse {
  data: CustomerSetAttributeResponse.Data;
}

export namespace CustomerSetAttributeResponse {
  export interface Data {
    /**
     * Unique identifier of the customer
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
       * True when the value was inferred from the conversation, such as a gender read
       * from a name, rather than stated. A stated value always replaces it.
       */
      isInferred: boolean;

      /**
       * True when newer conversations cannot change this field
       */
      isLocked: boolean;

      key: string;

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

export interface CustomerUnlockAttributeResponse {
  data: CustomerUnlockAttributeResponse.Data;
}

export namespace CustomerUnlockAttributeResponse {
  export interface Data {
    /**
     * Unique identifier of the customer
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
       * True when the value was inferred from the conversation, such as a gender read
       * from a name, rather than stated. A stated value always replaces it.
       */
      isInferred: boolean;

      /**
       * True when newer conversations cannot change this field
       */
      isLocked: boolean;

      key: string;

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

export interface CustomerUpdateFieldResponse {
  data: CustomerUpdateFieldResponse.Data;
}

export namespace CustomerUpdateFieldResponse {
  export interface Data {
    /**
     * What extraction looks for in a conversation
     */
    description: string | null;

    /**
     * Whether conversations fill this field on this project: the project's own setting
     * where it made one
     */
    extract: boolean;

    /**
     * What filters, sorts and attribute routes name the field by
     */
    key: string;

    label: string;

    /**
     * The project redaction setting that, when on, keeps conversations from filling
     * this field
     */
    redactedBy:
      | 'redactName'
      | 'redactEmail'
      | 'redactPhone'
      | 'redactDateOfBirth'
      | 'redactAddress'
      | 'redactBankAccountNumber'
      | null;

    /**
     * SYSTEM for a built-in field, CUSTOM for one your project defined
     */
    source: 'SYSTEM' | 'CUSTOM';

    valueType: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'DATE' | 'PHONE_NUMBER' | 'EMAIL' | 'CURRENCY';
  }
}

export interface CustomerUpdateNotesResponse {
  data: CustomerUpdateNotesResponse.Data;
}

export namespace CustomerUpdateNotesResponse {
  export interface Data {
    /**
     * Unique identifier of the customer
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
       * True when the value was inferred from the conversation, such as a gender read
       * from a name, rather than stated. A stated value always replaces it.
       */
      isInferred: boolean;

      /**
       * True when newer conversations cannot change this field
       */
      isLocked: boolean;

      key: string;

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

export interface CustomerListParams {
  agentId?: string;

  /**
   * Filter by this field, a key from GET /v1/customer/fields. Use with fieldOperator
   * and, unless checking presence, fieldValue.
   */
  fieldKey?: string;

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

  modality?: 'voice' | 'chat' | 'call';

  page?: number;

  search?: string;

  /**
   * lastSeenAt (the default), firstSeenAt, conversationCount, voiceCount, chatCount,
   * talkTimeMs or displayName, or field.<key> (for example field.COMPANY) to sort by
   * a field's value. Field keys come from GET /v1/customer/fields. Customers without
   * a value sort last.
   */
  sortBy?: string;

  sortDirection?: 'asc' | 'desc';
}

export interface CustomerClearAttributeParams {
  customerProfileId: string;
}

export interface CustomerCreateFieldParams {
  /**
   * Whether conversations fill this field
   */
  extract: boolean;

  /**
   * Starts with a letter; letters, numbers and underscores only. Fixed once created.
   */
  key: string;

  label: string;

  valueType: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'DATE' | 'PHONE_NUMBER' | 'EMAIL' | 'CURRENCY';

  /**
   * What the agent listens for in a conversation. Required when extract is true.
   */
  description?: string | null;
}

export interface CustomerListConversationsParams {
  limit?: number;

  page?: number;
}

export interface CustomerSetAttributeParams {
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

export interface CustomerUnlockAttributeParams {
  customerProfileId: string;
}

export interface CustomerUpdateFieldParams {
  description?: string | null;

  extract?: boolean;

  label?: string;

  valueType?: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'DATE' | 'PHONE_NUMBER' | 'EMAIL' | 'CURRENCY';
}

export interface CustomerUpdateNotesParams {
  /**
   * Replaces the existing notes. Null or empty clears them.
   */
  notes: string | null;
}

export declare namespace Customer {
  export {
    type CustomerListResponse as CustomerListResponse,
    type CustomerDeleteResponse as CustomerDeleteResponse,
    type CustomerClearAttributeResponse as CustomerClearAttributeResponse,
    type CustomerCreateFieldResponse as CustomerCreateFieldResponse,
    type CustomerDeleteFieldResponse as CustomerDeleteFieldResponse,
    type CustomerGetByIDResponse as CustomerGetByIDResponse,
    type CustomerListConversationsResponse as CustomerListConversationsResponse,
    type CustomerListFieldsResponse as CustomerListFieldsResponse,
    type CustomerSetAttributeResponse as CustomerSetAttributeResponse,
    type CustomerUnlockAttributeResponse as CustomerUnlockAttributeResponse,
    type CustomerUpdateFieldResponse as CustomerUpdateFieldResponse,
    type CustomerUpdateNotesResponse as CustomerUpdateNotesResponse,
    type CustomerListParams as CustomerListParams,
    type CustomerClearAttributeParams as CustomerClearAttributeParams,
    type CustomerCreateFieldParams as CustomerCreateFieldParams,
    type CustomerListConversationsParams as CustomerListConversationsParams,
    type CustomerSetAttributeParams as CustomerSetAttributeParams,
    type CustomerUnlockAttributeParams as CustomerUnlockAttributeParams,
    type CustomerUpdateFieldParams as CustomerUpdateFieldParams,
    type CustomerUpdateNotesParams as CustomerUpdateNotesParams,
  };
}
