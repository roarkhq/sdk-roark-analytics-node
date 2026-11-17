// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class McpServer extends APIResource {
  /**
   * Connects to the server, reads its tools, then stores it for the project. A
   * server that does not answer, or refuses the credential, returns 400 and nothing
   * is stored. The credential is encrypted and never returned.
   *
   * @example
   * ```ts
   * const mcpServer = await client.mcpServer.create({
   *   label: 'CRM',
   *   url: 'https://mcp.example.com/mcp',
   * });
   * ```
   */
  create(body: McpServerCreateParams, options?: RequestOptions): APIPromise<McpServerCreateResponse> {
    return this._client.post('/v1/connections/mcp-server', { body, ...options });
  }

  /**
   * Renames the server or replaces its credential. A new credential is checked by
   * connecting with it first; one the server refuses returns 400 and changes
   * nothing.
   *
   * @example
   * ```ts
   * const mcpServer = await client.mcpServer.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  update(
    serverID: string,
    body: McpServerUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<McpServerUpdateResponse> {
    return this._client.patch(path`/v1/connections/mcp-server/${serverID}`, { body, ...options });
  }

  /**
   * The project's MCP servers, by label, each with the tools it offered when last
   * checked. Credentials are never returned.
   *
   * @example
   * ```ts
   * const mcpServers = await client.mcpServer.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<McpServerListResponse> {
    return this._client.get('/v1/connections/mcp-server', options);
  }

  /**
   * Deletes the server and its stored credential. A server a tool still uses returns
   * 409, naming the tools.
   *
   * @example
   * ```ts
   * const mcpServer = await client.mcpServer.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(serverID: string, options?: RequestOptions): APIPromise<McpServerDeleteResponse> {
    return this._client.delete(path`/v1/connections/mcp-server/${serverID}`, options);
  }

  /**
   * Connects to a server and returns the tools it offers, without storing anything.
   * Use it to check a url and credential before connecting.
   *
   * @example
   * ```ts
   * const response = await client.mcpServer.discover({
   *   url: 'https://mcp.example.com/mcp',
   * });
   * ```
   */
  discover(body: McpServerDiscoverParams, options?: RequestOptions): APIPromise<McpServerDiscoverResponse> {
    return this._client.post('/v1/connections/mcp-server/discover', { body, ...options });
  }

  /**
   * One MCP server. The credential is never returned.
   *
   * @example
   * ```ts
   * const response = await client.mcpServer.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  getByID(serverID: string, options?: RequestOptions): APIPromise<McpServerGetByIDResponse> {
    return this._client.get(path`/v1/connections/mcp-server/${serverID}`, options);
  }

  /**
   * Connects to the server again and records the tools it offers now. Agents keep
   * calling the tools they were given; a new tool reaches an agent only once you add
   * it.
   *
   * @example
   * ```ts
   * const response = await client.mcpServer.refresh(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  refresh(serverID: string, options?: RequestOptions): APIPromise<McpServerRefreshResponse> {
    return this._client.post(path`/v1/connections/mcp-server/${serverID}/refresh`, options);
  }
}

export interface McpServerCreateResponse {
  data: McpServerCreateResponse.Data;
}

export namespace McpServerCreateResponse {
  export interface Data {
    /**
     * The id a tool names the server by
     */
    id: string;

    /**
     * The header a HEADER credential is sent in
     */
    authHeaderName: string | null;

    /**
     * How the server authenticates. The credential is never returned.
     */
    authType: 'NONE' | 'BEARER' | 'HEADER';

    /**
     * The tools calling on this server, and whether it still offers each
     */
    boundTools: Array<Data.BoundTool>;

    /**
     * Changes when the server changes the tools it offers
     */
    catalogHash: string;

    createdAt: string;

    /**
     * The MCP registry entry it was connected from
     */
    directoryKey: string | null;

    /**
     * The server's own advice on using it, for you to read. Never shown to the agent.
     */
    instructions: string | null;

    label: string;

    lastDiscoveredAt: string;

    /**
     * The name the server gives itself
     */
    serverName: string | null;

    serverVersion: string | null;

    tools: Array<Data.Tool>;

    transport: 'STREAMABLE_HTTP' | 'SSE';

    updatedAt: string;

    url: string;
  }

  export namespace Data {
    export interface BoundTool {
      name: string;

      /**
       * False when the server stopped offering it: agents lose the tool
       */
      offered: boolean;

      /**
       * The tool it calls, as the server names it
       */
      remoteToolName: string;

      toolDefinitionId: string;
    }

    export interface Tool {
      description: string | null;

      /**
       * The tool as the server names it
       */
      name: string;

      /**
       * The server's hint that the tool only reads
       */
      readOnly: boolean | null;

      /**
       * What a tool for it is called by default: the name with unusable characters
       * replaced
       */
      suggestedName: string | null;

      /**
       * Why an agent could not use this tool, such as a name a built-in tool already has
       */
      unavailableReason: string | null;
    }
  }
}

export interface McpServerUpdateResponse {
  data: McpServerUpdateResponse.Data;
}

export namespace McpServerUpdateResponse {
  export interface Data {
    /**
     * The id a tool names the server by
     */
    id: string;

    /**
     * The header a HEADER credential is sent in
     */
    authHeaderName: string | null;

    /**
     * How the server authenticates. The credential is never returned.
     */
    authType: 'NONE' | 'BEARER' | 'HEADER';

    /**
     * The tools calling on this server, and whether it still offers each
     */
    boundTools: Array<Data.BoundTool>;

    /**
     * Changes when the server changes the tools it offers
     */
    catalogHash: string;

    createdAt: string;

    /**
     * The MCP registry entry it was connected from
     */
    directoryKey: string | null;

    /**
     * The server's own advice on using it, for you to read. Never shown to the agent.
     */
    instructions: string | null;

    label: string;

    lastDiscoveredAt: string;

    /**
     * The name the server gives itself
     */
    serverName: string | null;

    serverVersion: string | null;

    tools: Array<Data.Tool>;

    transport: 'STREAMABLE_HTTP' | 'SSE';

    updatedAt: string;

    url: string;
  }

  export namespace Data {
    export interface BoundTool {
      name: string;

      /**
       * False when the server stopped offering it: agents lose the tool
       */
      offered: boolean;

      /**
       * The tool it calls, as the server names it
       */
      remoteToolName: string;

      toolDefinitionId: string;
    }

    export interface Tool {
      description: string | null;

      /**
       * The tool as the server names it
       */
      name: string;

      /**
       * The server's hint that the tool only reads
       */
      readOnly: boolean | null;

      /**
       * What a tool for it is called by default: the name with unusable characters
       * replaced
       */
      suggestedName: string | null;

      /**
       * Why an agent could not use this tool, such as a name a built-in tool already has
       */
      unavailableReason: string | null;
    }
  }
}

export interface McpServerListResponse {
  data: Array<McpServerListResponse.Data>;
}

export namespace McpServerListResponse {
  export interface Data {
    /**
     * The id a tool names the server by
     */
    id: string;

    /**
     * The header a HEADER credential is sent in
     */
    authHeaderName: string | null;

    /**
     * How the server authenticates. The credential is never returned.
     */
    authType: 'NONE' | 'BEARER' | 'HEADER';

    /**
     * The tools calling on this server, and whether it still offers each
     */
    boundTools: Array<Data.BoundTool>;

    /**
     * Changes when the server changes the tools it offers
     */
    catalogHash: string;

    createdAt: string;

    /**
     * The MCP registry entry it was connected from
     */
    directoryKey: string | null;

    /**
     * The server's own advice on using it, for you to read. Never shown to the agent.
     */
    instructions: string | null;

    label: string;

    lastDiscoveredAt: string;

    /**
     * The name the server gives itself
     */
    serverName: string | null;

    serverVersion: string | null;

    tools: Array<Data.Tool>;

    transport: 'STREAMABLE_HTTP' | 'SSE';

    updatedAt: string;

    url: string;
  }

  export namespace Data {
    export interface BoundTool {
      name: string;

      /**
       * False when the server stopped offering it: agents lose the tool
       */
      offered: boolean;

      /**
       * The tool it calls, as the server names it
       */
      remoteToolName: string;

      toolDefinitionId: string;
    }

    export interface Tool {
      description: string | null;

      /**
       * The tool as the server names it
       */
      name: string;

      /**
       * The server's hint that the tool only reads
       */
      readOnly: boolean | null;

      /**
       * What a tool for it is called by default: the name with unusable characters
       * replaced
       */
      suggestedName: string | null;

      /**
       * Why an agent could not use this tool, such as a name a built-in tool already has
       */
      unavailableReason: string | null;
    }
  }
}

export interface McpServerDeleteResponse {
  data: McpServerDeleteResponse.Data;
}

export namespace McpServerDeleteResponse {
  export interface Data {
    id: string;

    deleted: true;
  }
}

export interface McpServerDiscoverResponse {
  data: McpServerDiscoverResponse.Data;
}

export namespace McpServerDiscoverResponse {
  export interface Data {
    /**
     * Changes when the server changes the tools it offers
     */
    catalogHash: string;

    /**
     * The server's own advice on using it, for you to read. Never shown to the agent.
     */
    instructions: string | null;

    /**
     * The name the server gives itself
     */
    serverName: string | null;

    serverVersion: string | null;

    tools: Array<Data.Tool>;
  }

  export namespace Data {
    export interface Tool {
      description: string | null;

      /**
       * The tool as the server names it
       */
      name: string;

      /**
       * The server's hint that the tool only reads
       */
      readOnly: boolean | null;

      /**
       * What a tool for it is called by default: the name with unusable characters
       * replaced
       */
      suggestedName: string | null;

      /**
       * Why an agent could not use this tool, such as a name a built-in tool already has
       */
      unavailableReason: string | null;
    }
  }
}

export interface McpServerGetByIDResponse {
  data: McpServerGetByIDResponse.Data;
}

export namespace McpServerGetByIDResponse {
  export interface Data {
    /**
     * The id a tool names the server by
     */
    id: string;

    /**
     * The header a HEADER credential is sent in
     */
    authHeaderName: string | null;

    /**
     * How the server authenticates. The credential is never returned.
     */
    authType: 'NONE' | 'BEARER' | 'HEADER';

    /**
     * The tools calling on this server, and whether it still offers each
     */
    boundTools: Array<Data.BoundTool>;

    /**
     * Changes when the server changes the tools it offers
     */
    catalogHash: string;

    createdAt: string;

    /**
     * The MCP registry entry it was connected from
     */
    directoryKey: string | null;

    /**
     * The server's own advice on using it, for you to read. Never shown to the agent.
     */
    instructions: string | null;

    label: string;

    lastDiscoveredAt: string;

    /**
     * The name the server gives itself
     */
    serverName: string | null;

    serverVersion: string | null;

    tools: Array<Data.Tool>;

    transport: 'STREAMABLE_HTTP' | 'SSE';

    updatedAt: string;

    url: string;
  }

  export namespace Data {
    export interface BoundTool {
      name: string;

      /**
       * False when the server stopped offering it: agents lose the tool
       */
      offered: boolean;

      /**
       * The tool it calls, as the server names it
       */
      remoteToolName: string;

      toolDefinitionId: string;
    }

    export interface Tool {
      description: string | null;

      /**
       * The tool as the server names it
       */
      name: string;

      /**
       * The server's hint that the tool only reads
       */
      readOnly: boolean | null;

      /**
       * What a tool for it is called by default: the name with unusable characters
       * replaced
       */
      suggestedName: string | null;

      /**
       * Why an agent could not use this tool, such as a name a built-in tool already has
       */
      unavailableReason: string | null;
    }
  }
}

export interface McpServerRefreshResponse {
  data: McpServerRefreshResponse.Data;
}

export namespace McpServerRefreshResponse {
  export interface Data {
    /**
     * The id a tool names the server by
     */
    id: string;

    /**
     * The header a HEADER credential is sent in
     */
    authHeaderName: string | null;

    /**
     * How the server authenticates. The credential is never returned.
     */
    authType: 'NONE' | 'BEARER' | 'HEADER';

    /**
     * The tools calling on this server, and whether it still offers each
     */
    boundTools: Array<Data.BoundTool>;

    /**
     * Changes when the server changes the tools it offers
     */
    catalogHash: string;

    createdAt: string;

    /**
     * The MCP registry entry it was connected from
     */
    directoryKey: string | null;

    /**
     * The server's own advice on using it, for you to read. Never shown to the agent.
     */
    instructions: string | null;

    label: string;

    lastDiscoveredAt: string;

    /**
     * The name the server gives itself
     */
    serverName: string | null;

    serverVersion: string | null;

    tools: Array<Data.Tool>;

    transport: 'STREAMABLE_HTTP' | 'SSE';

    updatedAt: string;

    url: string;
  }

  export namespace Data {
    export interface BoundTool {
      name: string;

      /**
       * False when the server stopped offering it: agents lose the tool
       */
      offered: boolean;

      /**
       * The tool it calls, as the server names it
       */
      remoteToolName: string;

      toolDefinitionId: string;
    }

    export interface Tool {
      description: string | null;

      /**
       * The tool as the server names it
       */
      name: string;

      /**
       * The server's hint that the tool only reads
       */
      readOnly: boolean | null;

      /**
       * What a tool for it is called by default: the name with unusable characters
       * replaced
       */
      suggestedName: string | null;

      /**
       * Why an agent could not use this tool, such as a name a built-in tool already has
       */
      unavailableReason: string | null;
    }
  }
}

export interface McpServerCreateParams {
  label: string;

  url: string;

  auth?: { [key: string]: unknown };

  directoryKey?: string | null;

  transport?: 'STREAMABLE_HTTP' | 'SSE';
}

export interface McpServerUpdateParams {
  /**
   * How the server authenticates. Stored encrypted; never returned.
   */
  auth?:
    | McpServerUpdateParams.UnionMember0
    | McpServerUpdateParams.UnionMember1
    | McpServerUpdateParams.UnionMember2;

  label?: string;
}

export namespace McpServerUpdateParams {
  export interface UnionMember0 {
    type: 'NONE';
  }

  export interface UnionMember1 {
    token: string;

    type: 'BEARER';
  }

  export interface UnionMember2 {
    name: string;

    type: 'HEADER';

    value: string;
  }
}

export interface McpServerDiscoverParams {
  url: string;

  auth?: { [key: string]: unknown };

  transport?: 'STREAMABLE_HTTP' | 'SSE';
}

export declare namespace McpServer {
  export {
    type McpServerCreateResponse as McpServerCreateResponse,
    type McpServerUpdateResponse as McpServerUpdateResponse,
    type McpServerListResponse as McpServerListResponse,
    type McpServerDeleteResponse as McpServerDeleteResponse,
    type McpServerDiscoverResponse as McpServerDiscoverResponse,
    type McpServerGetByIDResponse as McpServerGetByIDResponse,
    type McpServerRefreshResponse as McpServerRefreshResponse,
    type McpServerCreateParams as McpServerCreateParams,
    type McpServerUpdateParams as McpServerUpdateParams,
    type McpServerDiscoverParams as McpServerDiscoverParams,
  };
}
