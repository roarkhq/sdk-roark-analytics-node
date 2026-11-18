// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Conversation extends APIResource {
  /**
   * Fetches one conversation by its id, whether it is a call or a chat. The same
   * endpoint reads both modalities, and `modality` in the response says which one it
   * is, so you do not need to know it up front. A conversation started with
   * `POST /v1/agent/{agentId}/conversations` reads back from the moment it is
   * created, before it is recorded as a call or chat. For its transcript and
   * metrics, use the call or chat endpoints that match its `modality`.
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

export declare namespace Conversation {
  export { type ConversationGetByIDResponse as ConversationGetByIDResponse };
}
