// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Conversation extends APIResource {
  /**
   * Calls and chats in the project as one list, most recent start first. A
   * conversation is listed once it is recorded: a call when it connects, a chat when
   * it ends. Listing calls needs `call:read`, chats `chat:read`, and both kinds
   * both.
   *
   * @example
   * ```ts
   * const conversations = await client.conversation.list();
   * ```
   */
  list(
    query: ConversationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConversationListResponse> {
    return this._client.get('/v1/conversation', { query, ...options });
  }

  /**
   * A call or chat by its id, whichever it is. One started through
   * `POST /v1/agent/{agentId}/conversations` reads back from the moment it is
   * created, before it is recorded. For its transcript and metrics, read it as a
   * call or chat, as `modality` says.
   *
   * @example
   * ```ts
   * const response = await client.conversation.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  getByID(conversationID: string, options?: RequestOptions): APIPromise<ConversationGetByIDResponse> {
    return this._client.get(path`/v1/conversation/${conversationID}`, options);
  }
}

export interface ConversationListResponse {
  data: Array<ConversationListResponse.Data>;

  pagination: ConversationListResponse.Pagination;
}

export namespace ConversationListResponse {
  export interface Data {
    /**
     * The conversation id: its call id or chat id. `modality` says which, and where to
     * read its transcript and metrics (`/v1/call/{callId}` or `/v1/chat/{id}`).
     */
    id: string;

    createdAt: string;

    /**
     * How long it ran. Null until it ends.
     */
    durationMs: number | null;

    /**
     * When it ended (ISO 8601). Null until it ends.
     */
    endedAt: string | null;

    /**
     * Your own id for it, if one was given.
     */
    externalId: string | null;

    /**
     * `voice` or `chat`. A voice conversation is recorded as a call
     * (`/v1/call/{callId}`), a chat as a chat (`/v1/chat/{id}`).
     */
    modality: 'voice' | 'chat';

    projectId: string;

    /**
     * When it started, or was created while pending (ISO 8601).
     */
    startedAt: string;

    /**
     * `PENDING` until it starts (a call ringing, a chat nobody has joined yet),
     * `IN_PROGRESS`, then `ENDED`.
     */
    status: 'PENDING' | 'IN_PROGRESS' | 'ENDED';

    summary: string | null;

    title: string | null;
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

export interface ConversationGetByIDResponse {
  data: ConversationGetByIDResponse.Data;
}

export namespace ConversationGetByIDResponse {
  export interface Data {
    /**
     * The conversation id: its call id or chat id. `modality` says which, and where to
     * read its transcript and metrics (`/v1/call/{callId}` or `/v1/chat/{id}`).
     */
    id: string;

    createdAt: string;

    /**
     * How long it ran. Null until it ends.
     */
    durationMs: number | null;

    /**
     * When it ended (ISO 8601). Null until it ends.
     */
    endedAt: string | null;

    /**
     * Your own id for it, if one was given.
     */
    externalId: string | null;

    /**
     * `voice` or `chat`. A voice conversation is recorded as a call
     * (`/v1/call/{callId}`), a chat as a chat (`/v1/chat/{id}`).
     */
    modality: 'voice' | 'chat';

    projectId: string;

    /**
     * When it started, or was created while pending (ISO 8601).
     */
    startedAt: string;

    /**
     * `PENDING` until it starts (a call ringing, a chat nobody has joined yet),
     * `IN_PROGRESS`, then `ENDED`.
     */
    status: 'PENDING' | 'IN_PROGRESS' | 'ENDED';

    summary: string | null;

    title: string | null;
  }
}

export interface ConversationListParams {
  /**
   * The `nextCursor` of the previous page.
   */
  after?: string;

  /**
   * How many to return (default 20, max 100).
   */
  limit?: number;

  /**
   * Only `voice`, or only `chat`. Both by default.
   */
  modality?: 'voice' | 'chat' | 'call';

  /**
   * Only conversations that started at or after this time.
   */
  startedFrom?: string;

  /**
   * Only conversations that started at or before this time.
   */
  startedTo?: string;
}

export declare namespace Conversation {
  export {
    type ConversationListResponse as ConversationListResponse,
    type ConversationGetByIDResponse as ConversationGetByIDResponse,
    type ConversationListParams as ConversationListParams,
  };
}
