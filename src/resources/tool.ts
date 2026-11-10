// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Tool extends APIResource {
  /**
   * Creates a tool and declares its first version. A tool only recorded from calls
   * under the same name is adopted; one already declared returns 409. Give it a
   * `runtime` for a hosted agent to call your endpoint, a `calendar` for it to book
   * on a calendar connected to the project, or `mcp` for it to call a tool on an MCP
   * server connected to the project. Header values are returned on read, so keep
   * secrets out of them.
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
   * Replaces the tool: its name, scope, inputs, description, grading hints, runtime,
   * calendar and MCP tool. A field left out is cleared, so omitting agentId makes
   * the tool project-wide and omitting calendar or mcp makes it an ordinary tool. A
   * change declares a new version; agent versions pinned to an older one keep it. A
   * tool managed by config-as-code returns 409.
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

    /**
     * What a calendar tool books into. Roark runs it; it has no runtime.
     */
    calendar: Data.Calendar | null;

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

    /**
     * A tool on one of the project's MCP servers. The server runs it and defines its
     * arguments.
     */
    mcp: Data.Mcp | null;

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
    /**
     * What a calendar tool books into. Roark runs it; it has no runtime.
     */
    export interface Calendar {
      /**
       * The kinds of appointment the tool may reach
       */
      appointmentTypes: Array<Calendar.AppointmentType>;

      /**
       * The connected calendar the tool books on
       */
      calendarConnectionId: string;

      messages: Calendar.Messages;

      /**
       * The one action this tool takes on the calendar
       */
      operation: 'CHECK_AVAILABILITY' | 'BOOK' | 'LOOKUP_BOOKING' | 'RESCHEDULE' | 'CANCEL' | 'LIST_BOOKINGS';

      /**
       * Every call books on a simulated calendar instead of the customer's
       */
      simulate: boolean;
    }

    export namespace Calendar {
      export interface AppointmentType {
        /**
         * Only for an event type offering several durations
         */
        durationMinutes: number | null;

        /**
         * For Cal.com: the event type it books
         */
        eventTypeId: number | null;

        /**
         * What the agent passes to name it
         */
        name: string;

        /**
         * The line that tells the agent when it applies
         */
        whenToUse: string | null;
      }

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
    }

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
     * A tool on one of the project's MCP servers. The server runs it and defines its
     * arguments.
     */
    export interface Mcp {
      /**
       * The MCP server the tool calls
       */
      mcpServerId: string;

      messages: Mcp.Messages;

      /**
       * The tool as the server names it
       */
      tool: string;
    }

    export namespace Mcp {
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

    /**
     * What a calendar tool books into. Roark runs it; it has no runtime.
     */
    calendar: Data.Calendar | null;

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

    /**
     * A tool on one of the project's MCP servers. The server runs it and defines its
     * arguments.
     */
    mcp: Data.Mcp | null;

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
    /**
     * What a calendar tool books into. Roark runs it; it has no runtime.
     */
    export interface Calendar {
      /**
       * The kinds of appointment the tool may reach
       */
      appointmentTypes: Array<Calendar.AppointmentType>;

      /**
       * The connected calendar the tool books on
       */
      calendarConnectionId: string;

      messages: Calendar.Messages;

      /**
       * The one action this tool takes on the calendar
       */
      operation: 'CHECK_AVAILABILITY' | 'BOOK' | 'LOOKUP_BOOKING' | 'RESCHEDULE' | 'CANCEL' | 'LIST_BOOKINGS';

      /**
       * Every call books on a simulated calendar instead of the customer's
       */
      simulate: boolean;
    }

    export namespace Calendar {
      export interface AppointmentType {
        /**
         * Only for an event type offering several durations
         */
        durationMinutes: number | null;

        /**
         * For Cal.com: the event type it books
         */
        eventTypeId: number | null;

        /**
         * What the agent passes to name it
         */
        name: string;

        /**
         * The line that tells the agent when it applies
         */
        whenToUse: string | null;
      }

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
    }

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
     * A tool on one of the project's MCP servers. The server runs it and defines its
     * arguments.
     */
    export interface Mcp {
      /**
       * The MCP server the tool calls
       */
      mcpServerId: string;

      messages: Mcp.Messages;

      /**
       * The tool as the server names it
       */
      tool: string;
    }

    export namespace Mcp {
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

    /**
     * What a calendar tool books into. Roark runs it; it has no runtime.
     */
    calendar: Data.Calendar | null;

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

    /**
     * A tool on one of the project's MCP servers. The server runs it and defines its
     * arguments.
     */
    mcp: Data.Mcp | null;

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
    /**
     * What a calendar tool books into. Roark runs it; it has no runtime.
     */
    export interface Calendar {
      /**
       * The kinds of appointment the tool may reach
       */
      appointmentTypes: Array<Calendar.AppointmentType>;

      /**
       * The connected calendar the tool books on
       */
      calendarConnectionId: string;

      messages: Calendar.Messages;

      /**
       * The one action this tool takes on the calendar
       */
      operation: 'CHECK_AVAILABILITY' | 'BOOK' | 'LOOKUP_BOOKING' | 'RESCHEDULE' | 'CANCEL' | 'LIST_BOOKINGS';

      /**
       * Every call books on a simulated calendar instead of the customer's
       */
      simulate: boolean;
    }

    export namespace Calendar {
      export interface AppointmentType {
        /**
         * Only for an event type offering several durations
         */
        durationMinutes: number | null;

        /**
         * For Cal.com: the event type it books
         */
        eventTypeId: number | null;

        /**
         * What the agent passes to name it
         */
        name: string;

        /**
         * The line that tells the agent when it applies
         */
        whenToUse: string | null;
      }

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
    }

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
     * A tool on one of the project's MCP servers. The server runs it and defines its
     * arguments.
     */
    export interface Mcp {
      /**
       * The MCP server the tool calls
       */
      mcpServerId: string;

      messages: Mcp.Messages;

      /**
       * The tool as the server names it
       */
      tool: string;
    }

    export namespace Mcp {
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

    /**
     * What a calendar tool books into. Roark runs it; it has no runtime.
     */
    calendar: Data.Calendar | null;

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

    /**
     * A tool on one of the project's MCP servers. The server runs it and defines its
     * arguments.
     */
    mcp: Data.Mcp | null;

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
    /**
     * What a calendar tool books into. Roark runs it; it has no runtime.
     */
    export interface Calendar {
      /**
       * The kinds of appointment the tool may reach
       */
      appointmentTypes: Array<Calendar.AppointmentType>;

      /**
       * The connected calendar the tool books on
       */
      calendarConnectionId: string;

      messages: Calendar.Messages;

      /**
       * The one action this tool takes on the calendar
       */
      operation: 'CHECK_AVAILABILITY' | 'BOOK' | 'LOOKUP_BOOKING' | 'RESCHEDULE' | 'CANCEL' | 'LIST_BOOKINGS';

      /**
       * Every call books on a simulated calendar instead of the customer's
       */
      simulate: boolean;
    }

    export namespace Calendar {
      export interface AppointmentType {
        /**
         * Only for an event type offering several durations
         */
        durationMinutes: number | null;

        /**
         * For Cal.com: the event type it books
         */
        eventTypeId: number | null;

        /**
         * What the agent passes to name it
         */
        name: string;

        /**
         * The line that tells the agent when it applies
         */
        whenToUse: string | null;
      }

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
    }

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
     * A tool on one of the project's MCP servers. The server runs it and defines its
     * arguments.
     */
    export interface Mcp {
      /**
       * The MCP server the tool calls
       */
      mcpServerId: string;

      messages: Mcp.Messages;

      /**
       * The tool as the server names it
       */
      tool: string;
    }

    export namespace Mcp {
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

  /**
   * Makes this a calendar tool, which Roark runs against a connected calendar: it
   * takes no runtime and no inputs. Omit or null for any other tool; on update,
   * omitting it makes the tool an ordinary one.
   */
  calendar?: ToolCreateParams.Calendar | null;

  expectedResult?: string | null;

  inputs?: Array<ToolCreateParams.Input>;

  invocationCriteria?: string | null;

  /**
   * Makes this a tool on one of the project's MCP servers: it takes no runtime, no
   * inputs and no calendar, and the description replaces the server's own. On
   * update, omitting it makes the tool an ordinary one.
   */
  mcp?: ToolCreateParams.Mcp | null;

  /**
   * Omit or null for a tool that is only graded
   */
  runtime?: ToolCreateParams.Runtime | null;
}

export namespace ToolCreateParams {
  /**
   * Makes this a calendar tool, which Roark runs against a connected calendar: it
   * takes no runtime and no inputs. Omit or null for any other tool; on update,
   * omitting it makes the tool an ordinary one.
   */
  export interface Calendar {
    appointmentTypes: Array<Calendar.AppointmentType>;

    calendarConnectionId: string;

    operation: 'CHECK_AVAILABILITY' | 'BOOK' | 'LOOKUP_BOOKING' | 'RESCHEDULE' | 'CANCEL' | 'LIST_BOOKINGS';

    messages?: Calendar.Messages;

    simulate?: boolean;
  }

  export namespace Calendar {
    export interface AppointmentType {
      /**
       * For Cal.com: the event type to book
       */
      eventTypeId: number;

      name: string;

      durationMinutes?: number | null;

      whenToUse?: string | null;
    }

    export interface Messages {
      before?: string | null;

      failure?: string | null;

      slow?: string | null;
    }
  }

  export interface Input {
    name: string;

    type: 'string' | 'number' | 'boolean';

    description?: string;

    required?: boolean;
  }

  /**
   * Makes this a tool on one of the project's MCP servers: it takes no runtime, no
   * inputs and no calendar, and the description replaces the server's own. On
   * update, omitting it makes the tool an ordinary one.
   */
  export interface Mcp {
    mcpServerId: string;

    /**
     * The tool as the server names it
     */
    tool: string;

    messages?: Mcp.Messages;
  }

  export namespace Mcp {
    export interface Messages {
      before?: string | null;

      failure?: string | null;

      slow?: string | null;
    }
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

  /**
   * Makes this a calendar tool, which Roark runs against a connected calendar: it
   * takes no runtime and no inputs. Omit or null for any other tool; on update,
   * omitting it makes the tool an ordinary one.
   */
  calendar?: ToolUpdateParams.Calendar | null;

  expectedResult?: string | null;

  inputs?: Array<ToolUpdateParams.Input>;

  invocationCriteria?: string | null;

  /**
   * Makes this a tool on one of the project's MCP servers: it takes no runtime, no
   * inputs and no calendar, and the description replaces the server's own. On
   * update, omitting it makes the tool an ordinary one.
   */
  mcp?: ToolUpdateParams.Mcp | null;

  /**
   * Omit or null for a tool that is only graded
   */
  runtime?: ToolUpdateParams.Runtime | null;
}

export namespace ToolUpdateParams {
  /**
   * Makes this a calendar tool, which Roark runs against a connected calendar: it
   * takes no runtime and no inputs. Omit or null for any other tool; on update,
   * omitting it makes the tool an ordinary one.
   */
  export interface Calendar {
    appointmentTypes: Array<Calendar.AppointmentType>;

    calendarConnectionId: string;

    operation: 'CHECK_AVAILABILITY' | 'BOOK' | 'LOOKUP_BOOKING' | 'RESCHEDULE' | 'CANCEL' | 'LIST_BOOKINGS';

    messages?: Calendar.Messages;

    simulate?: boolean;
  }

  export namespace Calendar {
    export interface AppointmentType {
      /**
       * For Cal.com: the event type to book
       */
      eventTypeId: number;

      name: string;

      durationMinutes?: number | null;

      whenToUse?: string | null;
    }

    export interface Messages {
      before?: string | null;

      failure?: string | null;

      slow?: string | null;
    }
  }

  export interface Input {
    name: string;

    type: 'string' | 'number' | 'boolean';

    description?: string;

    required?: boolean;
  }

  /**
   * Makes this a tool on one of the project's MCP servers: it takes no runtime, no
   * inputs and no calendar, and the description replaces the server's own. On
   * update, omitting it makes the tool an ordinary one.
   */
  export interface Mcp {
    mcpServerId: string;

    /**
     * The tool as the server names it
     */
    tool: string;

    messages?: Mcp.Messages;
  }

  export namespace Mcp {
    export interface Messages {
      before?: string | null;

      failure?: string | null;

      slow?: string | null;
    }
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
