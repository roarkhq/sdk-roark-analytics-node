// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Tool extends APIResource {
  /**
   * Creates a tool and declares its first version. A tool only recorded from calls
   * under the same name is adopted; one already declared returns 409. Give it a
   * `runtime` for a hosted agent to call your endpoint. Header values are returned
   * on read, so keep secrets out of them.
   *
   * @example
   * ```ts
   * const tool = await client.tool.create({
   *   description: 'x',
   *   name: 'book_appointment',
   * });
   * ```
   */
  create(body: ToolCreateParams, options?: RequestOptions): APIPromise<ToolCreateResponse> {
    return this._client.post('/v1/tool', { body, ...options });
  }

  /**
   * Replaces the tool: its name, scope, inputs, description, grading hints and
   * runtime. A field left out is cleared, so omitting agentId makes the tool
   * project-wide. A change declares a new version; agent versions pinned to an older
   * one keep it.
   *
   * @example
   * ```ts
   * const tool = await client.tool.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { description: 'x', name: 'book_appointment' },
   * );
   * ```
   */
  update(toolID: string, body: ToolUpdateParams, options?: RequestOptions): APIPromise<ToolUpdateResponse> {
    return this._client.put(path`/v1/tool/${toolID}`, { body, ...options });
  }

  /**
   * The project's tools and the built-in ones, each with its latest version: inputs,
   * description and, for a tool a hosted agent runs, its request. Attach one to an
   * agent draft by id.
   *
   * @example
   * ```ts
   * const tools = await client.tool.list();
   * ```
   */
  list(
    query: ToolListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ToolListResponse> {
    return this._client.get('/v1/tool', { query, ...options });
  }

  /**
   * Deletes a tool no agent version uses. A tool an agent version uses returns 409.
   *
   * @example
   * ```ts
   * const tool = await client.tool.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(toolID: string, options?: RequestOptions): APIPromise<ToolDeleteResponse> {
    return this._client.delete(path`/v1/tool/${toolID}`, options);
  }

  /**
   * Get a tool
   *
   * @example
   * ```ts
   * const response = await client.tool.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  getByID(toolID: string, options?: RequestOptions): APIPromise<ToolGetByIDResponse> {
    return this._client.get(path`/v1/tool/${toolID}`, options);
  }
}

export interface ToolCreateResponse {
  data: ToolCreateResponse.Data;
}

export namespace ToolCreateResponse {
  export interface Data {
    id: string;

    /**
     * The agent the tool is scoped to; null for the project
     */
    agentId: string | null;

    createdAt: string;

    description: string | null;

    /**
     * How it should handle the result, for grading
     */
    expectedResult: string | null;

    inputs: Array<Data.Input>;

    /**
     * When the agent should call it, for grading
     */
    invocationCriteria: string | null;

    name: string;

    /**
     * What a hosted agent sends and says when it calls the tool
     */
    runtime: Data.Runtime | null;

    /**
     * SYSTEM for a built-in tool every project can attach
     */
    source: 'CUSTOM' | 'SYSTEM';

    /**
     * The stable key of a built-in tool, such as dtmf
     */
    systemKey: string | null;

    updatedAt: string;

    /**
     * The latest version; null before any is declared
     */
    version: number | null;
  }

  export namespace Data {
    export interface Input {
      /**
       * What the input is, so the agent fills it in right
       */
      description: string | null;

      /**
       * The input name, as the agent passes it
       */
      name: string;

      /**
       * The agent must pass it
       */
      required: boolean;

      /**
       * string, number or boolean
       */
      type: 'string' | 'number' | 'boolean';
    }

    /**
     * What a hosted agent sends and says when it calls the tool
     */
    export interface Runtime {
      /**
       * The tool books, cancels or sends something: its call is not abandoned when the
       * caller interrupts, and each request carries an Idempotency-Key.
       */
      changesData: boolean;

      messages: Runtime.Messages;

      request: Runtime.Request;

      /**
       * Dot paths into the JSON response the agent is given. Null gives it the whole
       * response.
       */
      responseFields: Array<string> | null;
    }

    export namespace Runtime {
      export interface Messages {
        /**
         * Said as the request goes out
         */
        before: string | null;

        /**
         * Given to the agent to say when the request fails
         */
        failure: string | null;

        /**
         * Said once if the request is slow
         */
        slow: string | null;
      }

      export interface Request {
        /**
         * JSON body template. Null sends the inputs as the body (POST, PUT, PATCH) or the
         * query (GET, DELETE).
         */
        body: string | null;

        headers: Array<Request.Header>;

        method: 'POST' | 'PUT' | 'PATCH' | 'GET' | 'DELETE';

        /**
         * How long the agent waits, 1000 to 30000 ms
         */
        timeoutMs: number | null;

        /**
         * https URL. Placeholders {{args.<input>}} and {{conversation.\*}} (id, direction,
         * modality, agentNumber, customerNumber, startedAt) may appear in the path and
         * query.
         */
        url: string;
      }

      export namespace Request {
        export interface Header {
          name: string;

          value: string;
        }
      }
    }
  }
}

export interface ToolUpdateResponse {
  data: ToolUpdateResponse.Data;
}

export namespace ToolUpdateResponse {
  export interface Data {
    id: string;

    /**
     * The agent the tool is scoped to; null for the project
     */
    agentId: string | null;

    createdAt: string;

    description: string | null;

    /**
     * How it should handle the result, for grading
     */
    expectedResult: string | null;

    inputs: Array<Data.Input>;

    /**
     * When the agent should call it, for grading
     */
    invocationCriteria: string | null;

    name: string;

    /**
     * What a hosted agent sends and says when it calls the tool
     */
    runtime: Data.Runtime | null;

    /**
     * SYSTEM for a built-in tool every project can attach
     */
    source: 'CUSTOM' | 'SYSTEM';

    /**
     * The stable key of a built-in tool, such as dtmf
     */
    systemKey: string | null;

    updatedAt: string;

    /**
     * The latest version; null before any is declared
     */
    version: number | null;
  }

  export namespace Data {
    export interface Input {
      /**
       * What the input is, so the agent fills it in right
       */
      description: string | null;

      /**
       * The input name, as the agent passes it
       */
      name: string;

      /**
       * The agent must pass it
       */
      required: boolean;

      /**
       * string, number or boolean
       */
      type: 'string' | 'number' | 'boolean';
    }

    /**
     * What a hosted agent sends and says when it calls the tool
     */
    export interface Runtime {
      /**
       * The tool books, cancels or sends something: its call is not abandoned when the
       * caller interrupts, and each request carries an Idempotency-Key.
       */
      changesData: boolean;

      messages: Runtime.Messages;

      request: Runtime.Request;

      /**
       * Dot paths into the JSON response the agent is given. Null gives it the whole
       * response.
       */
      responseFields: Array<string> | null;
    }

    export namespace Runtime {
      export interface Messages {
        /**
         * Said as the request goes out
         */
        before: string | null;

        /**
         * Given to the agent to say when the request fails
         */
        failure: string | null;

        /**
         * Said once if the request is slow
         */
        slow: string | null;
      }

      export interface Request {
        /**
         * JSON body template. Null sends the inputs as the body (POST, PUT, PATCH) or the
         * query (GET, DELETE).
         */
        body: string | null;

        headers: Array<Request.Header>;

        method: 'POST' | 'PUT' | 'PATCH' | 'GET' | 'DELETE';

        /**
         * How long the agent waits, 1000 to 30000 ms
         */
        timeoutMs: number | null;

        /**
         * https URL. Placeholders {{args.<input>}} and {{conversation.\*}} (id, direction,
         * modality, agentNumber, customerNumber, startedAt) may appear in the path and
         * query.
         */
        url: string;
      }

      export namespace Request {
        export interface Header {
          name: string;

          value: string;
        }
      }
    }
  }
}

export interface ToolListResponse {
  data: Array<ToolListResponse.Data>;
}

export namespace ToolListResponse {
  export interface Data {
    id: string;

    /**
     * The agent the tool is scoped to; null for the project
     */
    agentId: string | null;

    createdAt: string;

    description: string | null;

    /**
     * How it should handle the result, for grading
     */
    expectedResult: string | null;

    inputs: Array<Data.Input>;

    /**
     * When the agent should call it, for grading
     */
    invocationCriteria: string | null;

    name: string;

    /**
     * What a hosted agent sends and says when it calls the tool
     */
    runtime: Data.Runtime | null;

    /**
     * SYSTEM for a built-in tool every project can attach
     */
    source: 'CUSTOM' | 'SYSTEM';

    /**
     * The stable key of a built-in tool, such as dtmf
     */
    systemKey: string | null;

    updatedAt: string;

    /**
     * The latest version; null before any is declared
     */
    version: number | null;
  }

  export namespace Data {
    export interface Input {
      /**
       * What the input is, so the agent fills it in right
       */
      description: string | null;

      /**
       * The input name, as the agent passes it
       */
      name: string;

      /**
       * The agent must pass it
       */
      required: boolean;

      /**
       * string, number or boolean
       */
      type: 'string' | 'number' | 'boolean';
    }

    /**
     * What a hosted agent sends and says when it calls the tool
     */
    export interface Runtime {
      /**
       * The tool books, cancels or sends something: its call is not abandoned when the
       * caller interrupts, and each request carries an Idempotency-Key.
       */
      changesData: boolean;

      messages: Runtime.Messages;

      request: Runtime.Request;

      /**
       * Dot paths into the JSON response the agent is given. Null gives it the whole
       * response.
       */
      responseFields: Array<string> | null;
    }

    export namespace Runtime {
      export interface Messages {
        /**
         * Said as the request goes out
         */
        before: string | null;

        /**
         * Given to the agent to say when the request fails
         */
        failure: string | null;

        /**
         * Said once if the request is slow
         */
        slow: string | null;
      }

      export interface Request {
        /**
         * JSON body template. Null sends the inputs as the body (POST, PUT, PATCH) or the
         * query (GET, DELETE).
         */
        body: string | null;

        headers: Array<Request.Header>;

        method: 'POST' | 'PUT' | 'PATCH' | 'GET' | 'DELETE';

        /**
         * How long the agent waits, 1000 to 30000 ms
         */
        timeoutMs: number | null;

        /**
         * https URL. Placeholders {{args.<input>}} and {{conversation.\*}} (id, direction,
         * modality, agentNumber, customerNumber, startedAt) may appear in the path and
         * query.
         */
        url: string;
      }

      export namespace Request {
        export interface Header {
          name: string;

          value: string;
        }
      }
    }
  }
}

export interface ToolDeleteResponse {
  data: ToolDeleteResponse.Data;
}

export namespace ToolDeleteResponse {
  export interface Data {
    id: string;

    deleted: true;
  }
}

export interface ToolGetByIDResponse {
  data: ToolGetByIDResponse.Data;
}

export namespace ToolGetByIDResponse {
  export interface Data {
    id: string;

    /**
     * The agent the tool is scoped to; null for the project
     */
    agentId: string | null;

    createdAt: string;

    description: string | null;

    /**
     * How it should handle the result, for grading
     */
    expectedResult: string | null;

    inputs: Array<Data.Input>;

    /**
     * When the agent should call it, for grading
     */
    invocationCriteria: string | null;

    name: string;

    /**
     * What a hosted agent sends and says when it calls the tool
     */
    runtime: Data.Runtime | null;

    /**
     * SYSTEM for a built-in tool every project can attach
     */
    source: 'CUSTOM' | 'SYSTEM';

    /**
     * The stable key of a built-in tool, such as dtmf
     */
    systemKey: string | null;

    updatedAt: string;

    /**
     * The latest version; null before any is declared
     */
    version: number | null;
  }

  export namespace Data {
    export interface Input {
      /**
       * What the input is, so the agent fills it in right
       */
      description: string | null;

      /**
       * The input name, as the agent passes it
       */
      name: string;

      /**
       * The agent must pass it
       */
      required: boolean;

      /**
       * string, number or boolean
       */
      type: 'string' | 'number' | 'boolean';
    }

    /**
     * What a hosted agent sends and says when it calls the tool
     */
    export interface Runtime {
      /**
       * The tool books, cancels or sends something: its call is not abandoned when the
       * caller interrupts, and each request carries an Idempotency-Key.
       */
      changesData: boolean;

      messages: Runtime.Messages;

      request: Runtime.Request;

      /**
       * Dot paths into the JSON response the agent is given. Null gives it the whole
       * response.
       */
      responseFields: Array<string> | null;
    }

    export namespace Runtime {
      export interface Messages {
        /**
         * Said as the request goes out
         */
        before: string | null;

        /**
         * Given to the agent to say when the request fails
         */
        failure: string | null;

        /**
         * Said once if the request is slow
         */
        slow: string | null;
      }

      export interface Request {
        /**
         * JSON body template. Null sends the inputs as the body (POST, PUT, PATCH) or the
         * query (GET, DELETE).
         */
        body: string | null;

        headers: Array<Request.Header>;

        method: 'POST' | 'PUT' | 'PATCH' | 'GET' | 'DELETE';

        /**
         * How long the agent waits, 1000 to 30000 ms
         */
        timeoutMs: number | null;

        /**
         * https URL. Placeholders {{args.<input>}} and {{conversation.\*}} (id, direction,
         * modality, agentNumber, customerNumber, startedAt) may appear in the path and
         * query.
         */
        url: string;
      }

      export namespace Request {
        export interface Header {
          name: string;

          value: string;
        }
      }
    }
  }
}

export interface ToolCreateParams {
  /**
   * When the agent should use the tool
   */
  description: string;

  name: string;

  agentId?: string | null;

  expectedResult?: string | null;

  inputs?: Array<ToolCreateParams.Input>;

  invocationCriteria?: string | null;

  /**
   * Omit or null for a tool that is only graded
   */
  runtime?: ToolCreateParams.Runtime | null;
}

export namespace ToolCreateParams {
  export interface Input {
    name: string;

    type: 'string' | 'number' | 'boolean';

    description?: string;

    required?: boolean;
  }

  /**
   * Omit or null for a tool that is only graded
   */
  export interface Runtime {
    request: Runtime.Request;

    changesData?: boolean;

    messages?: Runtime.Messages;

    responseFields?: Array<string> | null;
  }

  export namespace Runtime {
    export interface Request {
      url: string;

      body?: string | null;

      headers?: Array<Request.Header>;

      method?: 'POST' | 'PUT' | 'PATCH' | 'GET' | 'DELETE';

      timeoutMs?: number | null;
    }

    export namespace Request {
      export interface Header {
        name: string;

        value: string;
      }
    }

    export interface Messages {
      before?: string | null;

      failure?: string | null;

      slow?: string | null;
    }
  }
}

export interface ToolUpdateParams {
  /**
   * When the agent should use the tool
   */
  description: string;

  name: string;

  agentId?: string | null;

  expectedResult?: string | null;

  inputs?: Array<ToolUpdateParams.Input>;

  invocationCriteria?: string | null;

  /**
   * Omit or null for a tool that is only graded
   */
  runtime?: ToolUpdateParams.Runtime | null;
}

export namespace ToolUpdateParams {
  export interface Input {
    name: string;

    type: 'string' | 'number' | 'boolean';

    description?: string;

    required?: boolean;
  }

  /**
   * Omit or null for a tool that is only graded
   */
  export interface Runtime {
    request: Runtime.Request;

    changesData?: boolean;

    messages?: Runtime.Messages;

    responseFields?: Array<string> | null;
  }

  export namespace Runtime {
    export interface Request {
      url: string;

      body?: string | null;

      headers?: Array<Request.Header>;

      method?: 'POST' | 'PUT' | 'PATCH' | 'GET' | 'DELETE';

      timeoutMs?: number | null;
    }

    export namespace Request {
      export interface Header {
        name: string;

        value: string;
      }
    }

    export interface Messages {
      before?: string | null;

      failure?: string | null;

      slow?: string | null;
    }
  }
}

export interface ToolListParams {
  /**
   * Only tools scoped to this agent
   */
  agentId?: string;

  /**
   * Include the built-in tools (default true)
   */
  includeBuiltIn?: 'true' | 'false';
}

export declare namespace Tool {
  export {
    type ToolCreateResponse as ToolCreateResponse,
    type ToolUpdateResponse as ToolUpdateResponse,
    type ToolListResponse as ToolListResponse,
    type ToolDeleteResponse as ToolDeleteResponse,
    type ToolGetByIDResponse as ToolGetByIDResponse,
    type ToolCreateParams as ToolCreateParams,
    type ToolUpdateParams as ToolUpdateParams,
    type ToolListParams as ToolListParams,
  };
}
