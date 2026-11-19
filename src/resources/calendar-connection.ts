// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class CalendarConnection extends APIResource {
  /**
   * Verifies the credential against the provider and, only if it works, stores it
   * encrypted. A credential the provider rejects is a 400 and no connection is
   * created: a connection that has never worked would next be exercised by an
   * inbound call at 2am, with nobody there to fix it.
   *
   * @example
   * ```ts
   * const calendarConnection =
   *   await client.calendarConnection.create({
   *     apiKey: 'x',
   *     label: 'x',
   *     provider: 'CAL_COM',
   *   });
   * ```
   */
  create(
    body: CalendarConnectionCreateParams,
    options?: RequestOptions,
  ): APIPromise<CalendarConnectionCreateResponse> {
    return this._client.post('/v1/connections/calendar', { body, ...options });
  }

  /**
   * Renames a connection, changes the timezone slots are offered in, or rotates the
   * credential. A rotated credential is verified first, and a verified credential
   * returns the connection to ACTIVE.
   *
   * @example
   * ```ts
   * const calendarConnection =
   *   await client.calendarConnection.update('connectionId');
   * ```
   */
  update(
    connectionID: string,
    body: CalendarConnectionUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CalendarConnectionUpdateResponse> {
    return this._client.patch(path`/v1/connections/calendar/${connectionID}`, { body, ...options });
  }

  /**
   * Returns every calendar connection in the authenticated project, by label. A
   * project has a handful of these, so the list is not paginated:
   * `pagination.hasMore` is always false.
   *
   * @example
   * ```ts
   * const calendarConnections =
   *   await client.calendarConnection.list();
   * ```
   */
  list(
    query: CalendarConnectionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CalendarConnectionListResponse> {
    return this._client.get('/v1/connections/calendar', { query, ...options });
  }

  /**
   * Disconnects the calendar and destroys the stored credential. A credential the
   * customer deleted should stop existing, so this is not an archive. Appointments
   * already recorded against the connection are kept, so a booking stays explainable
   * after the calendar is disconnected. Refused with a 409 while a calendar tool is
   * still bound to the connection, naming the tools: point them at another calendar,
   * or delete them, first. A dangling binding would otherwise be found by whoever
   * next tried to ship the agent, who is not the person who disconnected the
   * calendar.
   *
   * @example
   * ```ts
   * const calendarConnection =
   *   await client.calendarConnection.delete('connectionId');
   * ```
   */
  delete(connectionID: string, options?: RequestOptions): APIPromise<CalendarConnectionDeleteResponse> {
    return this._client.delete(path`/v1/connections/calendar/${connectionID}`, options);
  }

  /**
   * Re-verifies the stored credential against the provider and records the result on
   * the connection. A credential the provider rejects sets `status` to
   * INVALID_CREDENTIALS. A provider outage is a 500 and leaves the status untouched:
   * being unable to reach the provider is not evidence that the customer’s
   * credential is bad.
   *
   * @example
   * ```ts
   * const response =
   *   await client.calendarConnection.check('connectionId');
   * ```
   */
  check(connectionID: string, options?: RequestOptions): APIPromise<CalendarConnectionCheckResponse> {
    return this._client.post(path`/v1/connections/calendar/${connectionID}/check`, options);
  }

  /**
   * Only for a connection whose `capabilities.roarkOwnsBookingPolicy` is true. A
   * calendar with no scheduling of its own has nothing an agent can be pointed at,
   * so the thing a calendar tool books into is created here: the calendar, how long
   * an appointment runs, and the hours it is offered in. The policy and the hours
   * are written together, because a target with no hours offers nothing. Refused if
   * the calendar is one the account can only read.
   *
   * @example
   * ```ts
   * const response =
   *   await client.calendarConnection.createTarget(
   *     'connectionId',
   *     {
   *       calendarId: 'clinic@example.com',
   *       durationMinutes: 30,
   *       name: 'Front desk',
   *     },
   *   );
   * ```
   */
  createTarget(
    connectionID: string,
    body: CalendarConnectionCreateTargetParams,
    options?: RequestOptions,
  ): APIPromise<CalendarConnectionCreateTargetResponse> {
    return this._client.post(path`/v1/connections/calendar/${connectionID}/targets`, { body, ...options });
  }

  /**
   * Refused while a calendar tool still books into it, naming the tools. A dangling
   * binding would otherwise be found by whoever next tried to ship the agent, who is
   * not the person who deleted the target. Appointments already recorded against it
   * are kept.
   *
   * @example
   * ```ts
   * const response =
   *   await client.calendarConnection.deleteTarget('targetId', {
   *     connectionId: 'connectionId',
   *   });
   * ```
   */
  deleteTarget(
    targetID: string,
    params: CalendarConnectionDeleteTargetParams,
    options?: RequestOptions,
  ): APIPromise<CalendarConnectionDeleteTargetResponse> {
    const { connectionId } = params;
    return this._client.delete(path`/v1/connections/calendar/${connectionId}/targets/${targetID}`, options);
  }

  /**
   * Returns one calendar connection. The stored credential is never included.
   *
   * @example
   * ```ts
   * const response =
   *   await client.calendarConnection.getByID('connectionId');
   * ```
   */
  getByID(connectionID: string, options?: RequestOptions): APIPromise<CalendarConnectionGetByIDResponse> {
    return this._client.get(path`/v1/connections/calendar/${connectionID}`, options);
  }

  /**
   * The same entry as the list, plus what it demands of a booker.
   * `requiresAttendeeEmail` is the field that decides an agent’s design: the
   * attendee object itself needs only a name and a timezone, but an event type can
   * declare email required, and an agent that cannot collect one simply cannot book
   * on it. Read this when configuring a calendar tool, not after a caller is already
   * waiting. Costs one provider call more than the list, which is why the list does
   * not fold it in.
   *
   * @example
   * ```ts
   * const response = await client.calendarConnection.getTarget(
   *   'targetId',
   *   { connectionId: 'connectionId' },
   * );
   * ```
   */
  getTarget(
    targetID: string,
    params: CalendarConnectionGetTargetParams,
    options?: RequestOptions,
  ): APIPromise<CalendarConnectionGetTargetResponse> {
    const { connectionId } = params;
    return this._client.get(path`/v1/connections/calendar/${connectionId}/targets/${targetID}`, options);
  }

  /**
   * Only for a connection whose `capabilities.roarkOwnsBookingPolicy` is true: on a
   * scheduling system the bookable things already exist and `GET /targets` returns
   * them. Calendars the account can only read are left out rather than listed and
   * refused: one would answer availability perfectly well and then fail the booking,
   * mid-call, with a caller on the line.
   *
   * @example
   * ```ts
   * const response =
   *   await client.calendarConnection.listCalendars(
   *     'connectionId',
   *   );
   * ```
   */
  listCalendars(
    connectionID: string,
    options?: RequestOptions,
  ): APIPromise<CalendarConnectionListCalendarsResponse> {
    return this._client.get(path`/v1/connections/calendar/${connectionID}/calendars`, options);
  }

  /**
   * What an agent can be pointed at on this connection: Cal.com event types today,
   * Google calendars when that lands. Read live from the provider, so an event type
   * added since you connected is here without reconnecting. Each entry carries a
   * `target` ready to put on a calendar tool, so nothing has to assemble one by
   * hand.
   *
   * @example
   * ```ts
   * const response =
   *   await client.calendarConnection.listTargets(
   *     'connectionId',
   *   );
   * ```
   */
  listTargets(
    connectionID: string,
    options?: RequestOptions,
  ): APIPromise<CalendarConnectionListTargetsResponse> {
    return this._client.get(path`/v1/connections/calendar/${connectionID}/targets`, options);
  }

  /**
   * Returns a URL to open in a browser. Calendly has no credential a request body
   * can carry, so connecting one is two steps: ask for this URL, let the customer
   * consent, and Roark finishes the rest server-side (it exchanges the code,
   * verifies the credential, reads the account’s own timezone when none was given,
   * and stores the connection). Nothing is created until the customer consents, and
   * a link that is not used expires. Read the result with
   * `GET /v1/connections/calendar?provider=CALENDLY`.
   *
   * @example
   * ```ts
   * const response =
   *   await client.calendarConnection.startCalendlyOauth();
   * ```
   */
  startCalendlyOauth(
    body: CalendarConnectionStartCalendlyOauthParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CalendarConnectionStartCalendlyOauthResponse> {
    return this._client.post('/v1/connections/calendar/calendly/authorize-url', { body, ...options });
  }

  /**
   * Returns a URL to open in a browser. Google has no credential a request body can
   * carry, so connecting one is two steps: ask for this URL, let the customer
   * consent, and Roark finishes the rest server-side (it exchanges the code,
   * verifies that both calendar permissions were granted, reads the account’s own
   * timezone when none was given, and stores the connection). Nothing is created
   * until the customer consents, and a link that is not used expires. Read the
   * result with `GET /v1/connections/calendar?provider=GOOGLE`.
   *
   * @example
   * ```ts
   * const response =
   *   await client.calendarConnection.startGoogleOauth();
   * ```
   */
  startGoogleOauth(
    body: CalendarConnectionStartGoogleOauthParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CalendarConnectionStartGoogleOauthResponse> {
    return this._client.post('/v1/connections/calendar/google/authorize-url', { body, ...options });
  }

  /**
   * Changes what agents ALREADY PUBLISHED against this target book, with no new tool
   * version, the same thing editing a Cal.com event type on cal.com does. `hours`
   * replaces the whole week when present, because a rota is described as a week and
   * a partial update of one window has no meaning anybody would expect. The calendar
   * cannot be changed: it is the target’s identity for the booking ledger, so moving
   * it would orphan every appointment made on the old one.
   *
   * @example
   * ```ts
   * const response =
   *   await client.calendarConnection.updateTarget('targetId', {
   *     connectionId: 'connectionId',
   *   });
   * ```
   */
  updateTarget(
    targetID: string,
    params: CalendarConnectionUpdateTargetParams,
    options?: RequestOptions,
  ): APIPromise<CalendarConnectionUpdateTargetResponse> {
    const { connectionId, ...body } = params;
    return this._client.put(path`/v1/connections/calendar/${connectionId}/targets/${targetID}`, {
      body,
      ...options,
    });
  }
}

export interface CalendarConnectionCreateResponse {
  /**
   * A project’s credential for one calendar account, the thing a calendar tool books
   * against. The credential itself is never returned.
   */
  data: CalendarConnectionCreateResponse.Data;
}

export namespace CalendarConnectionCreateResponse {
  /**
   * A project’s credential for one calendar account, the thing a calendar tool books
   * against. The credential itself is never returned.
   */
  export interface Data {
    /**
     * Unique identifier of the calendar connection.
     */
    id: string;

    /**
     * How the provider names the connected account (a Cal.com email). Read-only.
     */
    accountLabel: string | null;

    /**
     * What a calendar provider can actually do. Read this before configuring a
     * calendar tool.
     */
    capabilities: Data.Capabilities;

    /**
     * Creation timestamp in ISO 8601 format.
     */
    createdAt: string;

    /**
     * When the credential expires, ISO 8601. Null when it does not expire.
     */
    credentialExpiresAt: string | null;

    /**
     * Customer-supplied name for this account. Unique within the project.
     */
    label: string;

    /**
     * When the credential was last verified against the provider, ISO 8601.
     */
    lastCheckedAt: string | null;

    /**
     * Who holds the calendar. CAL_COM and GO_HIGH_LEVEL are connected with a key,
     * GO_HIGH_LEVEL also needing the sub-account the key belongs to; GOOGLE and
     * CALENDLY are connected by consent, through
     * `POST /v1/connections/calendar/google/authorize-url` and
     * `POST /v1/connections/calendar/calendly/authorize-url`.
     */
    provider: 'CAL_COM' | 'GOOGLE' | 'CALENDLY' | 'GO_HIGH_LEVEL';

    /**
     * Scopes the credential carries, when the provider issues scoped credentials. Null
     * for an API key.
     */
    scopes: Array<string> | null;

    /**
     * Whether the stored credential still works, as of `lastCheckedAt`.
     * INVALID_CREDENTIALS means the provider rejected it and the connection needs a
     * new one. A provider outage never changes this.
     */
    status: 'ACTIVE' | 'INVALID_CREDENTIALS' | 'ERROR';

    /**
     * Why the status is not ACTIVE, in the provider’s words. Null when ACTIVE.
     */
    statusMessage: string | null;

    /**
     * The IANA timezone slots are offered in: the business’s, not the caller’s. A
     * clinic’s 3pm is 3pm whoever dials it.
     */
    timezone: string;

    /**
     * Last update timestamp in ISO 8601 format.
     */
    updatedAt: string;
  }

  export namespace Data {
    /**
     * What a calendar provider can actually do. Read this before configuring a
     * calendar tool.
     */
    export interface Capabilities {
      /**
       * How a credential is obtained, which is the whole of what connecting looks like:
       * API_KEY takes a key in the create body, OAUTH sends the customer to the provider
       * and Roark stores the result itself.
       */
      auth: 'API_KEY' | 'OAUTH';

      /**
       * Hard cap on the width of one availability query, in days, when the provider has
       * one.
       */
      availabilityWindowDays: number | null;

      /**
       * The operations this provider supports. An operation that is absent is never
       * registered as a tool, so the agent cannot promise it: Calendly, for example, has
       * no reschedule API, and callers wanting to move an appointment must cancel and
       * rebook.
       */
      operations: Array<
        'CHECK_AVAILABILITY' | 'BOOK' | 'LOOKUP_BOOKING' | 'RESCHEDULE' | 'CANCEL' | 'LIST_BOOKINGS'
      >;

      /**
       * Whether a booking cannot be created without an attendee email address. True for
       * every scheduling system, which decides how an agent has to identify the caller.
       */
      requiresAttendeeEmail: boolean;

      /**
       * True for a calendar that exposes only events and free/busy. Roark then owns the
       * bookable hours, duration, buffers, lead time and horizon, because the provider
       * has no notion of them. A tool on one of these is pointed at a bookable target
       * you create through this API, rather than at something that already exists on the
       * account. Read this instead of matching on the provider name.
       */
      roarkOwnsBookingPolicy: boolean;

      /**
       * Whether a slot can be held before committing. RESERVATION blocks other bookers
       * in the provider’s own UI but is not consumed by the booking that follows, so it
       * is a courtesy and not a guarantee.
       */
      slotHold: 'RESERVATION' | 'NONE';
    }
  }
}

export interface CalendarConnectionUpdateResponse {
  /**
   * A project’s credential for one calendar account, the thing a calendar tool books
   * against. The credential itself is never returned.
   */
  data: CalendarConnectionUpdateResponse.Data;
}

export namespace CalendarConnectionUpdateResponse {
  /**
   * A project’s credential for one calendar account, the thing a calendar tool books
   * against. The credential itself is never returned.
   */
  export interface Data {
    /**
     * Unique identifier of the calendar connection.
     */
    id: string;

    /**
     * How the provider names the connected account (a Cal.com email). Read-only.
     */
    accountLabel: string | null;

    /**
     * What a calendar provider can actually do. Read this before configuring a
     * calendar tool.
     */
    capabilities: Data.Capabilities;

    /**
     * Creation timestamp in ISO 8601 format.
     */
    createdAt: string;

    /**
     * When the credential expires, ISO 8601. Null when it does not expire.
     */
    credentialExpiresAt: string | null;

    /**
     * Customer-supplied name for this account. Unique within the project.
     */
    label: string;

    /**
     * When the credential was last verified against the provider, ISO 8601.
     */
    lastCheckedAt: string | null;

    /**
     * Who holds the calendar. CAL_COM and GO_HIGH_LEVEL are connected with a key,
     * GO_HIGH_LEVEL also needing the sub-account the key belongs to; GOOGLE and
     * CALENDLY are connected by consent, through
     * `POST /v1/connections/calendar/google/authorize-url` and
     * `POST /v1/connections/calendar/calendly/authorize-url`.
     */
    provider: 'CAL_COM' | 'GOOGLE' | 'CALENDLY' | 'GO_HIGH_LEVEL';

    /**
     * Scopes the credential carries, when the provider issues scoped credentials. Null
     * for an API key.
     */
    scopes: Array<string> | null;

    /**
     * Whether the stored credential still works, as of `lastCheckedAt`.
     * INVALID_CREDENTIALS means the provider rejected it and the connection needs a
     * new one. A provider outage never changes this.
     */
    status: 'ACTIVE' | 'INVALID_CREDENTIALS' | 'ERROR';

    /**
     * Why the status is not ACTIVE, in the provider’s words. Null when ACTIVE.
     */
    statusMessage: string | null;

    /**
     * The IANA timezone slots are offered in: the business’s, not the caller’s. A
     * clinic’s 3pm is 3pm whoever dials it.
     */
    timezone: string;

    /**
     * Last update timestamp in ISO 8601 format.
     */
    updatedAt: string;
  }

  export namespace Data {
    /**
     * What a calendar provider can actually do. Read this before configuring a
     * calendar tool.
     */
    export interface Capabilities {
      /**
       * How a credential is obtained, which is the whole of what connecting looks like:
       * API_KEY takes a key in the create body, OAUTH sends the customer to the provider
       * and Roark stores the result itself.
       */
      auth: 'API_KEY' | 'OAUTH';

      /**
       * Hard cap on the width of one availability query, in days, when the provider has
       * one.
       */
      availabilityWindowDays: number | null;

      /**
       * The operations this provider supports. An operation that is absent is never
       * registered as a tool, so the agent cannot promise it: Calendly, for example, has
       * no reschedule API, and callers wanting to move an appointment must cancel and
       * rebook.
       */
      operations: Array<
        'CHECK_AVAILABILITY' | 'BOOK' | 'LOOKUP_BOOKING' | 'RESCHEDULE' | 'CANCEL' | 'LIST_BOOKINGS'
      >;

      /**
       * Whether a booking cannot be created without an attendee email address. True for
       * every scheduling system, which decides how an agent has to identify the caller.
       */
      requiresAttendeeEmail: boolean;

      /**
       * True for a calendar that exposes only events and free/busy. Roark then owns the
       * bookable hours, duration, buffers, lead time and horizon, because the provider
       * has no notion of them. A tool on one of these is pointed at a bookable target
       * you create through this API, rather than at something that already exists on the
       * account. Read this instead of matching on the provider name.
       */
      roarkOwnsBookingPolicy: boolean;

      /**
       * Whether a slot can be held before committing. RESERVATION blocks other bookers
       * in the provider’s own UI but is not consumed by the booking that follows, so it
       * is a courtesy and not a guarantee.
       */
      slotHold: 'RESERVATION' | 'NONE';
    }
  }
}

export interface CalendarConnectionListResponse {
  data: Array<CalendarConnectionListResponse.Data>;

  pagination: CalendarConnectionListResponse.Pagination;
}

export namespace CalendarConnectionListResponse {
  /**
   * A project’s credential for one calendar account, the thing a calendar tool books
   * against. The credential itself is never returned.
   */
  export interface Data {
    /**
     * Unique identifier of the calendar connection.
     */
    id: string;

    /**
     * How the provider names the connected account (a Cal.com email). Read-only.
     */
    accountLabel: string | null;

    /**
     * What a calendar provider can actually do. Read this before configuring a
     * calendar tool.
     */
    capabilities: Data.Capabilities;

    /**
     * Creation timestamp in ISO 8601 format.
     */
    createdAt: string;

    /**
     * When the credential expires, ISO 8601. Null when it does not expire.
     */
    credentialExpiresAt: string | null;

    /**
     * Customer-supplied name for this account. Unique within the project.
     */
    label: string;

    /**
     * When the credential was last verified against the provider, ISO 8601.
     */
    lastCheckedAt: string | null;

    /**
     * Who holds the calendar. CAL_COM and GO_HIGH_LEVEL are connected with a key,
     * GO_HIGH_LEVEL also needing the sub-account the key belongs to; GOOGLE and
     * CALENDLY are connected by consent, through
     * `POST /v1/connections/calendar/google/authorize-url` and
     * `POST /v1/connections/calendar/calendly/authorize-url`.
     */
    provider: 'CAL_COM' | 'GOOGLE' | 'CALENDLY' | 'GO_HIGH_LEVEL';

    /**
     * Scopes the credential carries, when the provider issues scoped credentials. Null
     * for an API key.
     */
    scopes: Array<string> | null;

    /**
     * Whether the stored credential still works, as of `lastCheckedAt`.
     * INVALID_CREDENTIALS means the provider rejected it and the connection needs a
     * new one. A provider outage never changes this.
     */
    status: 'ACTIVE' | 'INVALID_CREDENTIALS' | 'ERROR';

    /**
     * Why the status is not ACTIVE, in the provider’s words. Null when ACTIVE.
     */
    statusMessage: string | null;

    /**
     * The IANA timezone slots are offered in: the business’s, not the caller’s. A
     * clinic’s 3pm is 3pm whoever dials it.
     */
    timezone: string;

    /**
     * Last update timestamp in ISO 8601 format.
     */
    updatedAt: string;
  }

  export namespace Data {
    /**
     * What a calendar provider can actually do. Read this before configuring a
     * calendar tool.
     */
    export interface Capabilities {
      /**
       * How a credential is obtained, which is the whole of what connecting looks like:
       * API_KEY takes a key in the create body, OAUTH sends the customer to the provider
       * and Roark stores the result itself.
       */
      auth: 'API_KEY' | 'OAUTH';

      /**
       * Hard cap on the width of one availability query, in days, when the provider has
       * one.
       */
      availabilityWindowDays: number | null;

      /**
       * The operations this provider supports. An operation that is absent is never
       * registered as a tool, so the agent cannot promise it: Calendly, for example, has
       * no reschedule API, and callers wanting to move an appointment must cancel and
       * rebook.
       */
      operations: Array<
        'CHECK_AVAILABILITY' | 'BOOK' | 'LOOKUP_BOOKING' | 'RESCHEDULE' | 'CANCEL' | 'LIST_BOOKINGS'
      >;

      /**
       * Whether a booking cannot be created without an attendee email address. True for
       * every scheduling system, which decides how an agent has to identify the caller.
       */
      requiresAttendeeEmail: boolean;

      /**
       * True for a calendar that exposes only events and free/busy. Roark then owns the
       * bookable hours, duration, buffers, lead time and horizon, because the provider
       * has no notion of them. A tool on one of these is pointed at a bookable target
       * you create through this API, rather than at something that already exists on the
       * account. Read this instead of matching on the provider name.
       */
      roarkOwnsBookingPolicy: boolean;

      /**
       * Whether a slot can be held before committing. RESERVATION blocks other bookers
       * in the provider’s own UI but is not consumed by the booking that follows, so it
       * is a courtesy and not a guarantee.
       */
      slotHold: 'RESERVATION' | 'NONE';
    }
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

export interface CalendarConnectionDeleteResponse {
  data: CalendarConnectionDeleteResponse.Data;
}

export namespace CalendarConnectionDeleteResponse {
  export interface Data {
    /**
     * Identifier of the deleted connection.
     */
    id: string;

    /**
     * Always true. The credential is hard-deleted, not archived.
     */
    deleted: true;
  }
}

export interface CalendarConnectionCheckResponse {
  /**
   * A project’s credential for one calendar account, the thing a calendar tool books
   * against. The credential itself is never returned.
   */
  data: CalendarConnectionCheckResponse.Data;
}

export namespace CalendarConnectionCheckResponse {
  /**
   * A project’s credential for one calendar account, the thing a calendar tool books
   * against. The credential itself is never returned.
   */
  export interface Data {
    /**
     * Unique identifier of the calendar connection.
     */
    id: string;

    /**
     * How the provider names the connected account (a Cal.com email). Read-only.
     */
    accountLabel: string | null;

    /**
     * What a calendar provider can actually do. Read this before configuring a
     * calendar tool.
     */
    capabilities: Data.Capabilities;

    /**
     * Creation timestamp in ISO 8601 format.
     */
    createdAt: string;

    /**
     * When the credential expires, ISO 8601. Null when it does not expire.
     */
    credentialExpiresAt: string | null;

    /**
     * Customer-supplied name for this account. Unique within the project.
     */
    label: string;

    /**
     * When the credential was last verified against the provider, ISO 8601.
     */
    lastCheckedAt: string | null;

    /**
     * Who holds the calendar. CAL_COM and GO_HIGH_LEVEL are connected with a key,
     * GO_HIGH_LEVEL also needing the sub-account the key belongs to; GOOGLE and
     * CALENDLY are connected by consent, through
     * `POST /v1/connections/calendar/google/authorize-url` and
     * `POST /v1/connections/calendar/calendly/authorize-url`.
     */
    provider: 'CAL_COM' | 'GOOGLE' | 'CALENDLY' | 'GO_HIGH_LEVEL';

    /**
     * Scopes the credential carries, when the provider issues scoped credentials. Null
     * for an API key.
     */
    scopes: Array<string> | null;

    /**
     * Whether the stored credential still works, as of `lastCheckedAt`.
     * INVALID_CREDENTIALS means the provider rejected it and the connection needs a
     * new one. A provider outage never changes this.
     */
    status: 'ACTIVE' | 'INVALID_CREDENTIALS' | 'ERROR';

    /**
     * Why the status is not ACTIVE, in the provider’s words. Null when ACTIVE.
     */
    statusMessage: string | null;

    /**
     * The IANA timezone slots are offered in: the business’s, not the caller’s. A
     * clinic’s 3pm is 3pm whoever dials it.
     */
    timezone: string;

    /**
     * Last update timestamp in ISO 8601 format.
     */
    updatedAt: string;
  }

  export namespace Data {
    /**
     * What a calendar provider can actually do. Read this before configuring a
     * calendar tool.
     */
    export interface Capabilities {
      /**
       * How a credential is obtained, which is the whole of what connecting looks like:
       * API_KEY takes a key in the create body, OAUTH sends the customer to the provider
       * and Roark stores the result itself.
       */
      auth: 'API_KEY' | 'OAUTH';

      /**
       * Hard cap on the width of one availability query, in days, when the provider has
       * one.
       */
      availabilityWindowDays: number | null;

      /**
       * The operations this provider supports. An operation that is absent is never
       * registered as a tool, so the agent cannot promise it: Calendly, for example, has
       * no reschedule API, and callers wanting to move an appointment must cancel and
       * rebook.
       */
      operations: Array<
        'CHECK_AVAILABILITY' | 'BOOK' | 'LOOKUP_BOOKING' | 'RESCHEDULE' | 'CANCEL' | 'LIST_BOOKINGS'
      >;

      /**
       * Whether a booking cannot be created without an attendee email address. True for
       * every scheduling system, which decides how an agent has to identify the caller.
       */
      requiresAttendeeEmail: boolean;

      /**
       * True for a calendar that exposes only events and free/busy. Roark then owns the
       * bookable hours, duration, buffers, lead time and horizon, because the provider
       * has no notion of them. A tool on one of these is pointed at a bookable target
       * you create through this API, rather than at something that already exists on the
       * account. Read this instead of matching on the provider name.
       */
      roarkOwnsBookingPolicy: boolean;

      /**
       * Whether a slot can be held before committing. RESERVATION blocks other bookers
       * in the provider’s own UI but is not consumed by the booking that follows, so it
       * is a courtesy and not a guarantee.
       */
      slotHold: 'RESERVATION' | 'NONE';
    }
  }
}

export interface CalendarConnectionCreateTargetResponse {
  /**
   * Something on a connected account an agent can be pointed at: a Cal.com event
   * type, or a bookable target on a calendar whose booking policy Roark owns.
   */
  data: CalendarConnectionCreateTargetResponse.Data;
}

export namespace CalendarConnectionCreateTargetResponse {
  /**
   * Something on a connected account an agent can be pointed at: a Cal.com event
   * type, or a bookable target on a calendar whose booking policy Roark owns.
   */
  export interface Data {
    /**
     * Identifier within this connection. Pass it back to read one target in detail.
     */
    id: string;

    /**
     * How long an appointment runs, when the provider fixes one length.
     */
    durationMinutes: number | null;

    /**
     * Other lengths this target offers, when it offers a choice. A calendar tool pins
     * one of these with `durationMinutes`; an empty list means the length is not the
     * customer’s to choose.
     */
    durationOptions: Array<number>;

    /**
     * Hidden on the provider’s own booking page. Still bookable through this API.
     */
    isHidden: boolean;

    /**
     * What the customer called it on the provider.
     */
    label: string;

    /**
     * The booking policy Roark applies, for a calendar with no scheduling of its own.
     * Null on a scheduling system, which owns its own rules, so this one field says
     * which kind of provider you are looking at without matching on the provider name.
     */
    policy: Data.Policy | null;

    /**
     * A human has to accept before it is an appointment. An agent booking one of these
     * must say "requested", never "confirmed".
     */
    requiresConfirmation: boolean;

    /**
     * Ready to put on a calendar tool, so nothing has to assemble one by hand.
     */
    target: Data.UnionMember0 | Data.UnionMember1 | Data.UnionMember2 | Data.UnionMember3;
  }

  export namespace Data {
    /**
     * The booking policy Roark applies, for a calendar with no scheduling of its own.
     * Null on a scheduling system, which owns its own rules, so this one field says
     * which kind of provider you are looking at without matching on the provider name.
     */
    export interface Policy {
      /**
       * Whether an all-day event closes the day. On by default: a calendar marks all-day
       * events free unless their creator says otherwise, so a public holiday entered as
       * one would otherwise still be bookable.
       */
      allDayEventsBlock: boolean;

      bufferAfterMinutes: number;

      /**
       * Dead time before an appointment, counted as busy.
       */
      bufferBeforeMinutes: number;

      durationMinutes: number;

      /**
       * How far ahead appointments may be made.
       */
      horizonDays: number;

      hours: Array<Policy.Hour>;

      /**
       * How soon from now an appointment may be made.
       */
      minNoticeMinutes: number;

      /**
       * The grid slots are offered on, measured from each bookable window’s own start
       * rather than the hour.
       */
      slotIntervalMinutes: number;
    }

    export namespace Policy {
      /**
       * One window of the week appointments are offered in. A window that runs past
       * midnight is two entries on two weekdays; a day the business is closed is simply
       * absent.
       */
      export interface Hour {
        endMinute: number;

        /**
         * Minutes from local midnight, in the connection’s timezone.
         */
        startMinute: number;

        /**
         * ISO weekday: Monday is 1, Sunday is 7.
         */
        weekday: number;
      }
    }

    export interface UnionMember0 {
      eventTypeId: number;

      provider: 'CAL_COM';
    }

    export interface UnionMember1 {
      calendarId: string;

      provider: 'GOOGLE';

      targetId: string;
    }

    export interface UnionMember2 {
      /**
       * The event type, by URI rather than by id: Calendly names every resource with an
       * absolute URL and its own API takes that URL back.
       */
      eventTypeUri: string;

      provider: 'CALENDLY';
    }

    export interface UnionMember3 {
      /**
       * The calendar, by its own GoHighLevel id.
       */
      goHighLevelCalendar: string;

      provider: 'GO_HIGH_LEVEL';

      /**
       * The length to book, for a calendar offering the booker a choice. GoHighLevel
       * takes it on the availability read, so it decides which slots are offered. Omit
       * to use the calendar’s own length.
       */
      durationMinutes?: number;
    }
  }
}

export interface CalendarConnectionDeleteTargetResponse {
  data: CalendarConnectionDeleteTargetResponse.Data;
}

export namespace CalendarConnectionDeleteTargetResponse {
  export interface Data {
    /**
     * Identifier of the deleted target.
     */
    id: string;

    deleted: true;
  }
}

export interface CalendarConnectionGetByIDResponse {
  /**
   * A project’s credential for one calendar account, the thing a calendar tool books
   * against. The credential itself is never returned.
   */
  data: CalendarConnectionGetByIDResponse.Data;
}

export namespace CalendarConnectionGetByIDResponse {
  /**
   * A project’s credential for one calendar account, the thing a calendar tool books
   * against. The credential itself is never returned.
   */
  export interface Data {
    /**
     * Unique identifier of the calendar connection.
     */
    id: string;

    /**
     * How the provider names the connected account (a Cal.com email). Read-only.
     */
    accountLabel: string | null;

    /**
     * What a calendar provider can actually do. Read this before configuring a
     * calendar tool.
     */
    capabilities: Data.Capabilities;

    /**
     * Creation timestamp in ISO 8601 format.
     */
    createdAt: string;

    /**
     * When the credential expires, ISO 8601. Null when it does not expire.
     */
    credentialExpiresAt: string | null;

    /**
     * Customer-supplied name for this account. Unique within the project.
     */
    label: string;

    /**
     * When the credential was last verified against the provider, ISO 8601.
     */
    lastCheckedAt: string | null;

    /**
     * Who holds the calendar. CAL_COM and GO_HIGH_LEVEL are connected with a key,
     * GO_HIGH_LEVEL also needing the sub-account the key belongs to; GOOGLE and
     * CALENDLY are connected by consent, through
     * `POST /v1/connections/calendar/google/authorize-url` and
     * `POST /v1/connections/calendar/calendly/authorize-url`.
     */
    provider: 'CAL_COM' | 'GOOGLE' | 'CALENDLY' | 'GO_HIGH_LEVEL';

    /**
     * Scopes the credential carries, when the provider issues scoped credentials. Null
     * for an API key.
     */
    scopes: Array<string> | null;

    /**
     * Whether the stored credential still works, as of `lastCheckedAt`.
     * INVALID_CREDENTIALS means the provider rejected it and the connection needs a
     * new one. A provider outage never changes this.
     */
    status: 'ACTIVE' | 'INVALID_CREDENTIALS' | 'ERROR';

    /**
     * Why the status is not ACTIVE, in the provider’s words. Null when ACTIVE.
     */
    statusMessage: string | null;

    /**
     * The IANA timezone slots are offered in: the business’s, not the caller’s. A
     * clinic’s 3pm is 3pm whoever dials it.
     */
    timezone: string;

    /**
     * Last update timestamp in ISO 8601 format.
     */
    updatedAt: string;
  }

  export namespace Data {
    /**
     * What a calendar provider can actually do. Read this before configuring a
     * calendar tool.
     */
    export interface Capabilities {
      /**
       * How a credential is obtained, which is the whole of what connecting looks like:
       * API_KEY takes a key in the create body, OAUTH sends the customer to the provider
       * and Roark stores the result itself.
       */
      auth: 'API_KEY' | 'OAUTH';

      /**
       * Hard cap on the width of one availability query, in days, when the provider has
       * one.
       */
      availabilityWindowDays: number | null;

      /**
       * The operations this provider supports. An operation that is absent is never
       * registered as a tool, so the agent cannot promise it: Calendly, for example, has
       * no reschedule API, and callers wanting to move an appointment must cancel and
       * rebook.
       */
      operations: Array<
        'CHECK_AVAILABILITY' | 'BOOK' | 'LOOKUP_BOOKING' | 'RESCHEDULE' | 'CANCEL' | 'LIST_BOOKINGS'
      >;

      /**
       * Whether a booking cannot be created without an attendee email address. True for
       * every scheduling system, which decides how an agent has to identify the caller.
       */
      requiresAttendeeEmail: boolean;

      /**
       * True for a calendar that exposes only events and free/busy. Roark then owns the
       * bookable hours, duration, buffers, lead time and horizon, because the provider
       * has no notion of them. A tool on one of these is pointed at a bookable target
       * you create through this API, rather than at something that already exists on the
       * account. Read this instead of matching on the provider name.
       */
      roarkOwnsBookingPolicy: boolean;

      /**
       * Whether a slot can be held before committing. RESERVATION blocks other bookers
       * in the provider’s own UI but is not consumed by the booking that follows, so it
       * is a courtesy and not a guarantee.
       */
      slotHold: 'RESERVATION' | 'NONE';
    }
  }
}

export interface CalendarConnectionGetTargetResponse {
  /**
   * Something on a connected account an agent can be pointed at: a Cal.com event
   * type, or a bookable target on a calendar whose booking policy Roark owns.
   */
  data: CalendarConnectionGetTargetResponse.Data;
}

export namespace CalendarConnectionGetTargetResponse {
  /**
   * Something on a connected account an agent can be pointed at: a Cal.com event
   * type, or a bookable target on a calendar whose booking policy Roark owns.
   */
  export interface Data {
    /**
     * Identifier within this connection. Pass it back to read one target in detail.
     */
    id: string;

    /**
     * How long an appointment runs, when the provider fixes one length.
     */
    durationMinutes: number | null;

    /**
     * Other lengths this target offers, when it offers a choice. A calendar tool pins
     * one of these with `durationMinutes`; an empty list means the length is not the
     * customer’s to choose.
     */
    durationOptions: Array<number>;

    /**
     * Hidden on the provider’s own booking page. Still bookable through this API.
     */
    isHidden: boolean;

    /**
     * What the customer called it on the provider.
     */
    label: string;

    /**
     * The booking policy Roark applies, for a calendar with no scheduling of its own.
     * Null on a scheduling system, which owns its own rules, so this one field says
     * which kind of provider you are looking at without matching on the provider name.
     */
    policy: Data.Policy | null;

    /**
     * What a booking is refused without, as the provider names it (`email`, `name`, or
     * a Calendly event type’s own required questions). On Cal.com the attendee object
     * itself needs only a name and a timezone, so this is the only place that says
     * whether an agent has to collect an email; on Calendly both are always required.
     */
    requiredBookingFields: Array<string>;

    /**
     * The common case of the above, lifted out because it decides the agent’s design:
     * an agent that cannot collect an email cannot book on a target that demands one.
     */
    requiresAttendeeEmail: boolean;

    /**
     * A human has to accept before it is an appointment. An agent booking one of these
     * must say "requested", never "confirmed".
     */
    requiresConfirmation: boolean;

    /**
     * Ready to put on a calendar tool, so nothing has to assemble one by hand.
     */
    target: Data.UnionMember0 | Data.UnionMember1 | Data.UnionMember2 | Data.UnionMember3;
  }

  export namespace Data {
    /**
     * The booking policy Roark applies, for a calendar with no scheduling of its own.
     * Null on a scheduling system, which owns its own rules, so this one field says
     * which kind of provider you are looking at without matching on the provider name.
     */
    export interface Policy {
      /**
       * Whether an all-day event closes the day. On by default: a calendar marks all-day
       * events free unless their creator says otherwise, so a public holiday entered as
       * one would otherwise still be bookable.
       */
      allDayEventsBlock: boolean;

      bufferAfterMinutes: number;

      /**
       * Dead time before an appointment, counted as busy.
       */
      bufferBeforeMinutes: number;

      durationMinutes: number;

      /**
       * How far ahead appointments may be made.
       */
      horizonDays: number;

      hours: Array<Policy.Hour>;

      /**
       * How soon from now an appointment may be made.
       */
      minNoticeMinutes: number;

      /**
       * The grid slots are offered on, measured from each bookable window’s own start
       * rather than the hour.
       */
      slotIntervalMinutes: number;
    }

    export namespace Policy {
      /**
       * One window of the week appointments are offered in. A window that runs past
       * midnight is two entries on two weekdays; a day the business is closed is simply
       * absent.
       */
      export interface Hour {
        endMinute: number;

        /**
         * Minutes from local midnight, in the connection’s timezone.
         */
        startMinute: number;

        /**
         * ISO weekday: Monday is 1, Sunday is 7.
         */
        weekday: number;
      }
    }

    export interface UnionMember0 {
      eventTypeId: number;

      provider: 'CAL_COM';
    }

    export interface UnionMember1 {
      calendarId: string;

      provider: 'GOOGLE';

      targetId: string;
    }

    export interface UnionMember2 {
      /**
       * The event type, by URI rather than by id: Calendly names every resource with an
       * absolute URL and its own API takes that URL back.
       */
      eventTypeUri: string;

      provider: 'CALENDLY';
    }

    export interface UnionMember3 {
      /**
       * The calendar, by its own GoHighLevel id.
       */
      goHighLevelCalendar: string;

      provider: 'GO_HIGH_LEVEL';

      /**
       * The length to book, for a calendar offering the booker a choice. GoHighLevel
       * takes it on the availability read, so it decides which slots are offered. Omit
       * to use the calendar’s own length.
       */
      durationMinutes?: number;
    }
  }
}

export interface CalendarConnectionListCalendarsResponse {
  data: Array<CalendarConnectionListCalendarsResponse.Data>;
}

export namespace CalendarConnectionListCalendarsResponse {
  /**
   * A calendar on the connected account that a bookable target can be created on.
   */
  export interface Data {
    /**
     * Pass this as `calendarId` when creating a target.
     */
    id: string;

    /**
     * Always true: a calendar that cannot be written to is not listed.
     */
    canWrite: boolean;

    isPrimary: boolean;

    /**
     * What the calendar is called on the account.
     */
    label: string;

    /**
     * The calendar’s own timezone, when it reports one.
     */
    timezone: string | null;
  }
}

export interface CalendarConnectionListTargetsResponse {
  data: Array<CalendarConnectionListTargetsResponse.Data>;
}

export namespace CalendarConnectionListTargetsResponse {
  /**
   * Something on a connected account an agent can be pointed at: a Cal.com event
   * type, or a bookable target on a calendar whose booking policy Roark owns.
   */
  export interface Data {
    /**
     * Identifier within this connection. Pass it back to read one target in detail.
     */
    id: string;

    /**
     * How long an appointment runs, when the provider fixes one length.
     */
    durationMinutes: number | null;

    /**
     * Other lengths this target offers, when it offers a choice. A calendar tool pins
     * one of these with `durationMinutes`; an empty list means the length is not the
     * customer’s to choose.
     */
    durationOptions: Array<number>;

    /**
     * Hidden on the provider’s own booking page. Still bookable through this API.
     */
    isHidden: boolean;

    /**
     * What the customer called it on the provider.
     */
    label: string;

    /**
     * The booking policy Roark applies, for a calendar with no scheduling of its own.
     * Null on a scheduling system, which owns its own rules, so this one field says
     * which kind of provider you are looking at without matching on the provider name.
     */
    policy: Data.Policy | null;

    /**
     * A human has to accept before it is an appointment. An agent booking one of these
     * must say "requested", never "confirmed".
     */
    requiresConfirmation: boolean;

    /**
     * Ready to put on a calendar tool, so nothing has to assemble one by hand.
     */
    target: Data.UnionMember0 | Data.UnionMember1 | Data.UnionMember2 | Data.UnionMember3;
  }

  export namespace Data {
    /**
     * The booking policy Roark applies, for a calendar with no scheduling of its own.
     * Null on a scheduling system, which owns its own rules, so this one field says
     * which kind of provider you are looking at without matching on the provider name.
     */
    export interface Policy {
      /**
       * Whether an all-day event closes the day. On by default: a calendar marks all-day
       * events free unless their creator says otherwise, so a public holiday entered as
       * one would otherwise still be bookable.
       */
      allDayEventsBlock: boolean;

      bufferAfterMinutes: number;

      /**
       * Dead time before an appointment, counted as busy.
       */
      bufferBeforeMinutes: number;

      durationMinutes: number;

      /**
       * How far ahead appointments may be made.
       */
      horizonDays: number;

      hours: Array<Policy.Hour>;

      /**
       * How soon from now an appointment may be made.
       */
      minNoticeMinutes: number;

      /**
       * The grid slots are offered on, measured from each bookable window’s own start
       * rather than the hour.
       */
      slotIntervalMinutes: number;
    }

    export namespace Policy {
      /**
       * One window of the week appointments are offered in. A window that runs past
       * midnight is two entries on two weekdays; a day the business is closed is simply
       * absent.
       */
      export interface Hour {
        endMinute: number;

        /**
         * Minutes from local midnight, in the connection’s timezone.
         */
        startMinute: number;

        /**
         * ISO weekday: Monday is 1, Sunday is 7.
         */
        weekday: number;
      }
    }

    export interface UnionMember0 {
      eventTypeId: number;

      provider: 'CAL_COM';
    }

    export interface UnionMember1 {
      calendarId: string;

      provider: 'GOOGLE';

      targetId: string;
    }

    export interface UnionMember2 {
      /**
       * The event type, by URI rather than by id: Calendly names every resource with an
       * absolute URL and its own API takes that URL back.
       */
      eventTypeUri: string;

      provider: 'CALENDLY';
    }

    export interface UnionMember3 {
      /**
       * The calendar, by its own GoHighLevel id.
       */
      goHighLevelCalendar: string;

      provider: 'GO_HIGH_LEVEL';

      /**
       * The length to book, for a calendar offering the booker a choice. GoHighLevel
       * takes it on the availability read, so it decides which slots are offered. Omit
       * to use the calendar’s own length.
       */
      durationMinutes?: number;
    }
  }
}

export interface CalendarConnectionStartCalendlyOauthResponse {
  data: CalendarConnectionStartCalendlyOauthResponse.Data;
}

export namespace CalendarConnectionStartCalendlyOauthResponse {
  export interface Data {
    /**
     * Open this in a browser. After the customer consents, the provider returns to
     * Roark, which exchanges the code, verifies the credential and stores the
     * connection. Read the result with `GET /v1/connections/calendar?provider=…`.
     */
    authorizeUrl: string;

    /**
     * When the link stops working, ISO 8601. Start again after that.
     */
    expiresAt: string;

    /**
     * The opaque single-use value this flow is identified by, echoed so a caller can
     * correlate its own UI. Not a credential and not accepted anywhere as one.
     */
    state: string;
  }
}

export interface CalendarConnectionStartGoogleOauthResponse {
  data: CalendarConnectionStartGoogleOauthResponse.Data;
}

export namespace CalendarConnectionStartGoogleOauthResponse {
  export interface Data {
    /**
     * Open this in a browser. After the customer consents, the provider returns to
     * Roark, which exchanges the code, verifies the credential and stores the
     * connection. Read the result with `GET /v1/connections/calendar?provider=…`.
     */
    authorizeUrl: string;

    /**
     * When the link stops working, ISO 8601. Start again after that.
     */
    expiresAt: string;

    /**
     * The opaque single-use value this flow is identified by, echoed so a caller can
     * correlate its own UI. Not a credential and not accepted anywhere as one.
     */
    state: string;
  }
}

export interface CalendarConnectionUpdateTargetResponse {
  /**
   * Something on a connected account an agent can be pointed at: a Cal.com event
   * type, or a bookable target on a calendar whose booking policy Roark owns.
   */
  data: CalendarConnectionUpdateTargetResponse.Data;
}

export namespace CalendarConnectionUpdateTargetResponse {
  /**
   * Something on a connected account an agent can be pointed at: a Cal.com event
   * type, or a bookable target on a calendar whose booking policy Roark owns.
   */
  export interface Data {
    /**
     * Identifier within this connection. Pass it back to read one target in detail.
     */
    id: string;

    /**
     * How long an appointment runs, when the provider fixes one length.
     */
    durationMinutes: number | null;

    /**
     * Other lengths this target offers, when it offers a choice. A calendar tool pins
     * one of these with `durationMinutes`; an empty list means the length is not the
     * customer’s to choose.
     */
    durationOptions: Array<number>;

    /**
     * Hidden on the provider’s own booking page. Still bookable through this API.
     */
    isHidden: boolean;

    /**
     * What the customer called it on the provider.
     */
    label: string;

    /**
     * The booking policy Roark applies, for a calendar with no scheduling of its own.
     * Null on a scheduling system, which owns its own rules, so this one field says
     * which kind of provider you are looking at without matching on the provider name.
     */
    policy: Data.Policy | null;

    /**
     * A human has to accept before it is an appointment. An agent booking one of these
     * must say "requested", never "confirmed".
     */
    requiresConfirmation: boolean;

    /**
     * Ready to put on a calendar tool, so nothing has to assemble one by hand.
     */
    target: Data.UnionMember0 | Data.UnionMember1 | Data.UnionMember2 | Data.UnionMember3;
  }

  export namespace Data {
    /**
     * The booking policy Roark applies, for a calendar with no scheduling of its own.
     * Null on a scheduling system, which owns its own rules, so this one field says
     * which kind of provider you are looking at without matching on the provider name.
     */
    export interface Policy {
      /**
       * Whether an all-day event closes the day. On by default: a calendar marks all-day
       * events free unless their creator says otherwise, so a public holiday entered as
       * one would otherwise still be bookable.
       */
      allDayEventsBlock: boolean;

      bufferAfterMinutes: number;

      /**
       * Dead time before an appointment, counted as busy.
       */
      bufferBeforeMinutes: number;

      durationMinutes: number;

      /**
       * How far ahead appointments may be made.
       */
      horizonDays: number;

      hours: Array<Policy.Hour>;

      /**
       * How soon from now an appointment may be made.
       */
      minNoticeMinutes: number;

      /**
       * The grid slots are offered on, measured from each bookable window’s own start
       * rather than the hour.
       */
      slotIntervalMinutes: number;
    }

    export namespace Policy {
      /**
       * One window of the week appointments are offered in. A window that runs past
       * midnight is two entries on two weekdays; a day the business is closed is simply
       * absent.
       */
      export interface Hour {
        endMinute: number;

        /**
         * Minutes from local midnight, in the connection’s timezone.
         */
        startMinute: number;

        /**
         * ISO weekday: Monday is 1, Sunday is 7.
         */
        weekday: number;
      }
    }

    export interface UnionMember0 {
      eventTypeId: number;

      provider: 'CAL_COM';
    }

    export interface UnionMember1 {
      calendarId: string;

      provider: 'GOOGLE';

      targetId: string;
    }

    export interface UnionMember2 {
      /**
       * The event type, by URI rather than by id: Calendly names every resource with an
       * absolute URL and its own API takes that URL back.
       */
      eventTypeUri: string;

      provider: 'CALENDLY';
    }

    export interface UnionMember3 {
      /**
       * The calendar, by its own GoHighLevel id.
       */
      goHighLevelCalendar: string;

      provider: 'GO_HIGH_LEVEL';

      /**
       * The length to book, for a calendar offering the booker a choice. GoHighLevel
       * takes it on the availability read, so it decides which slots are offered. Omit
       * to use the calendar’s own length.
       */
      durationMinutes?: number;
    }
  }
}

export interface CalendarConnectionCreateParams {
  /**
   * The provider account’s API key. For CAL*COM, a Cal.com API key (starts with
   * `cal*`). For GO_HIGH_LEVEL, a sub-account Private Integration Token, which must carry the `calendars.readonly`, `calendars/events.readonly`, `calendars/events.write`, `contacts.readonly`, `contacts.write`and`locations.readonly`
   * scopes. It is verified against the provider before anything is stored, so an
   * invalid key is a 400 and no connection is created. Stored encrypted and never
   * returned.
   */
  apiKey: string;

  /**
   * Customer-facing name for this account, unique within the project. Required.
   */
  label: string;

  /**
   * Who holds the calendar. CAL_COM and GO_HIGH_LEVEL are connected with a key,
   * GO_HIGH_LEVEL also needing the sub-account the key belongs to; GOOGLE and
   * CALENDLY are connected by consent, through
   * `POST /v1/connections/calendar/google/authorize-url` and
   * `POST /v1/connections/calendar/calendly/authorize-url`.
   */
  provider: 'CAL_COM' | 'GOOGLE' | 'CALENDLY' | 'GO_HIGH_LEVEL';

  /**
   * Required for GO_HIGH_LEVEL and ignored by every other provider: the sub-account
   * the token belongs to, for example `ve9EPM428h8vShlRW1KT`. A Private Integration
   * Token does not name its own sub-account and every calendar call needs one, so
   * the two are stored and verified together: a token minted in a different
   * sub-account is a 400.
   */
  goHighLevelLocation?: string | null;

  /**
   * The named IANA timezone to offer slots in, for example `America/Los_Angeles`.
   * Omit to adopt the provider account’s own timezone. A fixed offset such as
   * `-08:00` is rejected: it does not observe DST.
   */
  timezone?: string | null;
}

export interface CalendarConnectionUpdateParams {
  /**
   * Rotate the credential. The new key is verified before it is stored, and a
   * verified key returns the connection to ACTIVE, which is how a connection
   * recovers from INVALID_CREDENTIALS.
   */
  apiKey?: string | null;

  /**
   * Only with `apiKey`, and only for GO_HIGH_LEVEL: the sub-account the rotated
   * token belongs to. Required there because the token and the sub-account are one
   * credential, so a rotation has to name both.
   */
  goHighLevelLocation?: string | null;

  /**
   * Rename the connection.
   */
  label?: string | null;

  /**
   * Change the named IANA timezone slots are offered in.
   */
  timezone?: string | null;
}

export interface CalendarConnectionListParams {
  /**
   * Who holds the calendar. CAL_COM and GO_HIGH_LEVEL are connected with a key,
   * GO_HIGH_LEVEL also needing the sub-account the key belongs to; GOOGLE and
   * CALENDLY are connected by consent, through
   * `POST /v1/connections/calendar/google/authorize-url` and
   * `POST /v1/connections/calendar/calendly/authorize-url`.
   */
  provider?: 'CAL_COM' | 'GOOGLE' | 'CALENDLY' | 'GO_HIGH_LEVEL';
}

export interface CalendarConnectionCreateTargetParams {
  /**
   * The calendar to write appointments to, from
   * `GET /v1/connections/calendar/{connectionId}/calendars`. `primary` is accepted
   * and stored as the account’s own id.
   */
  calendarId: string;

  durationMinutes: number;

  /**
   * Unique within the connection, and how a config file refers to this target.
   * Letters, digits, spaces, \_ or -.
   */
  name: string;

  /**
   * Whether an all-day event closes the day. Defaults to true, because a calendar
   * marks all-day events free unless their creator says otherwise and a public
   * holiday entered as one would otherwise be bookable.
   */
  allDayEventsBlock?: boolean | null;

  bufferAfterMinutes?: number | null;

  /**
   * Dead time before an appointment, counted as busy when a slot is offered.
   * Defaults to 0.
   */
  bufferBeforeMinutes?: number | null;

  /**
   * How far ahead appointments may be made. Defaults to 30.
   */
  horizonDays?: number | null;

  /**
   * The windows of the week appointments are offered in. Omit to adopt Monday to
   * Friday, 09:00 to 17:00. A target with no windows offers nothing at all, which
   * reads to a caller as a permanently full diary.
   */
  hours?: Array<CalendarConnectionCreateTargetParams.Hour> | null;

  /**
   * How soon from now an appointment may be made. Defaults to 120.
   */
  minNoticeMinutes?: number | null;

  /**
   * The grid slots are offered on. Defaults to the duration, which gives
   * back-to-back appointments.
   */
  slotIntervalMinutes?: number | null;
}

export namespace CalendarConnectionCreateTargetParams {
  /**
   * One window of the week appointments are offered in. A window that runs past
   * midnight is two entries on two weekdays; a day the business is closed is simply
   * absent.
   */
  export interface Hour {
    endMinute: number;

    /**
     * Minutes from local midnight, in the connection’s timezone.
     */
    startMinute: number;

    /**
     * ISO weekday: Monday is 1, Sunday is 7.
     */
    weekday: number;
  }
}

export interface CalendarConnectionDeleteTargetParams {
  /**
   * Calendar connection ID
   */
  connectionId: string;
}

export interface CalendarConnectionGetTargetParams {
  /**
   * Calendar connection ID
   */
  connectionId: string;
}

export interface CalendarConnectionStartCalendlyOauthParams {
  /**
   * Reconnect an existing connection instead of creating one: the consent screen
   * replaces that connection’s credential in place, so every tool bound to it keeps
   * working. Use this when a connection reports `INVALID_CREDENTIALS`. The
   * connection’s existing name and timezone are kept, so `label` is ignored when
   * this is set.
   */
  calendarConnectionId?: string | null;

  /**
   * Customer-facing name for the connection, unique within the project. Required
   * unless `calendarConnectionId` is set, and decided now because the consent screen
   * has nowhere to carry it.
   */
  label?: string | null;

  /**
   * The named IANA timezone to offer slots in, for example `America/Los_Angeles`.
   * Omit to adopt the Calendly account’s own. A fixed offset such as `-08:00` is
   * rejected: it does not observe DST.
   */
  timezone?: string | null;
}

export interface CalendarConnectionStartGoogleOauthParams {
  /**
   * Reconnect an existing connection instead of creating one: the consent screen
   * replaces that connection’s credential in place, so every tool bound to it keeps
   * working. Use this when a connection reports `INVALID_CREDENTIALS`. The
   * connection’s existing name and timezone are kept, so `label` is ignored when
   * this is set.
   */
  calendarConnectionId?: string | null;

  /**
   * Customer-facing name for the connection, unique within the project. Required
   * unless `calendarConnectionId` is set, and decided now because the consent screen
   * has nowhere to carry it.
   */
  label?: string | null;

  /**
   * The Google account to preselect on the consent screen. A hint only: it is
   * ignored if the user is signed into another account, and nothing is authorized by
   * it.
   */
  loginHint?: string | null;

  /**
   * The named IANA timezone to offer slots in, for example `America/Los_Angeles`.
   * Omit to adopt the Google account’s own. A fixed offset such as `-08:00` is
   * rejected: it does not observe DST.
   */
  timezone?: string | null;
}

export interface CalendarConnectionUpdateTargetParams {
  /**
   * Path param: Calendar connection ID
   */
  connectionId: string;

  /**
   * Body param: Whether an all-day event closes the day. Defaults to true, because a
   * calendar marks all-day events free unless their creator says otherwise and a
   * public holiday entered as one would otherwise be bookable.
   */
  allDayEventsBlock?: boolean | null;

  /**
   * Body param
   */
  bufferAfterMinutes?: number | null;

  /**
   * Body param: Dead time before an appointment, counted as busy when a slot is
   * offered. Defaults to 0.
   */
  bufferBeforeMinutes?: number | null;

  /**
   * Body param
   */
  durationMinutes?: number;

  /**
   * Body param: How far ahead appointments may be made. Defaults to 30.
   */
  horizonDays?: number | null;

  /**
   * Body param: The windows of the week appointments are offered in. Omit to adopt
   * Monday to Friday, 09:00 to 17:00. A target with no windows offers nothing at
   * all, which reads to a caller as a permanently full diary.
   */
  hours?: Array<CalendarConnectionUpdateTargetParams.Hour> | null;

  /**
   * Body param: How soon from now an appointment may be made. Defaults to 120.
   */
  minNoticeMinutes?: number | null;

  /**
   * Body param: Unique within the connection, and how a config file refers to this
   * target. Letters, digits, spaces, \_ or -.
   */
  name?: string;

  /**
   * Body param: The grid slots are offered on. Defaults to the duration, which gives
   * back-to-back appointments.
   */
  slotIntervalMinutes?: number | null;
}

export namespace CalendarConnectionUpdateTargetParams {
  /**
   * One window of the week appointments are offered in. A window that runs past
   * midnight is two entries on two weekdays; a day the business is closed is simply
   * absent.
   */
  export interface Hour {
    endMinute: number;

    /**
     * Minutes from local midnight, in the connection’s timezone.
     */
    startMinute: number;

    /**
     * ISO weekday: Monday is 1, Sunday is 7.
     */
    weekday: number;
  }
}

export declare namespace CalendarConnection {
  export {
    type CalendarConnectionCreateResponse as CalendarConnectionCreateResponse,
    type CalendarConnectionUpdateResponse as CalendarConnectionUpdateResponse,
    type CalendarConnectionListResponse as CalendarConnectionListResponse,
    type CalendarConnectionDeleteResponse as CalendarConnectionDeleteResponse,
    type CalendarConnectionCheckResponse as CalendarConnectionCheckResponse,
    type CalendarConnectionCreateTargetResponse as CalendarConnectionCreateTargetResponse,
    type CalendarConnectionDeleteTargetResponse as CalendarConnectionDeleteTargetResponse,
    type CalendarConnectionGetByIDResponse as CalendarConnectionGetByIDResponse,
    type CalendarConnectionGetTargetResponse as CalendarConnectionGetTargetResponse,
    type CalendarConnectionListCalendarsResponse as CalendarConnectionListCalendarsResponse,
    type CalendarConnectionListTargetsResponse as CalendarConnectionListTargetsResponse,
    type CalendarConnectionStartCalendlyOauthResponse as CalendarConnectionStartCalendlyOauthResponse,
    type CalendarConnectionStartGoogleOauthResponse as CalendarConnectionStartGoogleOauthResponse,
    type CalendarConnectionUpdateTargetResponse as CalendarConnectionUpdateTargetResponse,
    type CalendarConnectionCreateParams as CalendarConnectionCreateParams,
    type CalendarConnectionUpdateParams as CalendarConnectionUpdateParams,
    type CalendarConnectionListParams as CalendarConnectionListParams,
    type CalendarConnectionCreateTargetParams as CalendarConnectionCreateTargetParams,
    type CalendarConnectionDeleteTargetParams as CalendarConnectionDeleteTargetParams,
    type CalendarConnectionGetTargetParams as CalendarConnectionGetTargetParams,
    type CalendarConnectionStartCalendlyOauthParams as CalendarConnectionStartCalendlyOauthParams,
    type CalendarConnectionStartGoogleOauthParams as CalendarConnectionStartGoogleOauthParams,
    type CalendarConnectionUpdateTargetParams as CalendarConnectionUpdateTargetParams,
  };
}
