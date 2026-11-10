// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AgentConversation extends APIResource {
  /**
   * Starts a voice conversation (`modality: voice`) or chat (`modality: chat`) with
   * this Roark-hosted agent and returns its id right away.
   *
   * `channel: web` is a conversation in a browser on your site. Call this endpoint
   * from your server, never the browser: it needs your API key. Give the page only
   * `web.clientToken`; the web SDK spends it to join from one of `allowedOrigins`
   * before `web.clientTokenExpiresAt`.
   *
   * Read it back with `GET /v1/conversation/{conversationId}` straight away:
   * `PENDING` until the browser joins, `IN_PROGRESS`, then `ENDED`. One nobody joins
   * ends without ever starting and is never billed. Starting a voice conversation
   * needs `call:create`, a chat `chat:create`, and the agent a published version
   * that takes that kind.
   *
   * @example
   * ```ts
   * const agentConversation =
   *   await client.agentConversation.create(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     {
   *       allowedOrigins: ['https://app.example.com'],
   *       channel: 'web',
   *       modality: 'voice',
   *     },
   *   );
   * ```
   */
  create(
    agentID: string,
    body: AgentConversationCreateParams,
    options?: RequestOptions,
  ): APIPromise<AgentConversationCreateResponse> {
    return this._client.post(path`/v1/agent/${agentID}/conversations`, { body, ...options });
  }
}

export interface AgentConversationCreateResponse {
  data: AgentConversationCreateResponse.Data;
}

export namespace AgentConversationCreateResponse {
  export interface Data {
    /**
     * The conversation id. Read it with `GET /v1/conversation/{conversationId}`; once
     * it is recorded it is also its call or chat id, and a call's tools get it as
     * `{{conversation.id}}`.
     */
    id: string;

    agentId: string;

    channel: 'web';

    /**
     * When it was created (ISO 8601).
     */
    createdAt: string;

    modality: 'voice' | 'chat';

    /**
     * Waiting for the browser to join.
     */
    status: 'PENDING';

    /**
     * What a browser needs to join the conversation.
     */
    web: Data.Web;
  }

  export namespace Data {
    /**
     * What a browser needs to join the conversation.
     */
    export interface Web {
      /**
       * The origins the browser may join from, normalized.
       */
      allowedOrigins: Array<string>;

      /**
       * A single-use token for the browser, and the only thing your page should get. The
       * web SDK spends it to join from one of `allowedOrigins` before
       * `clientTokenExpiresAt`, and runs the connection itself. It is not an API key.
       */
      clientToken: string;

      /**
       * When the browser can no longer join (ISO 8601).
       */
      clientTokenExpiresAt: string;
    }
  }
}

export type AgentConversationCreateParams = AgentConversationCreateParams.AgentConversationCreateParams;

export declare namespace AgentConversationCreateParams {
  export interface AgentConversationCreateParams {
    /**
     * The origins your page may join from, exactly as the browser sends them: https
     * only (http on localhost for development), no paths or wildcards.
     */
    allowedOrigins: Array<string>;

    /**
     * How it is reached. `web`: in a browser on one of `allowedOrigins`, joined with
     * the web SDK.
     */
    channel: 'web';

    /**
     * `voice` or `chat`. The agent must have that modality turned on.
     */
    modality: 'voice' | 'chat' | 'call';

    /**
     * How long the browser has to join, in seconds. Default 120.
     */
    clientTokenTtlSeconds?: number;
  }
}

export declare namespace AgentConversation {
  export {
    type AgentConversationCreateResponse as AgentConversationCreateResponse,
    type AgentConversationCreateParams as AgentConversationCreateParams,
  };
}
