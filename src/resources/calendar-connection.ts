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
    return this._client.post('/v1/calendar-connection', { body, ...options });
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
    return this._client.patch(path`/v1/calendar-connection/${connectionID}`, { body, ...options });
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
    return this._client.get('/v1/calendar-connection', { query, ...options });
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
    return this._client.delete(path`/v1/calendar-connection/${connectionID}`, options);
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
    return this._client.post(path`/v1/calendar-connection/${connectionID}/check`, options);
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
    return this._client.get(path`/v1/calendar-connection/${connectionID}`, options);
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
    return this._client.get(path`/v1/calendar-connection/${connectionId}/targets/${targetID}`, options);
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
    return this._client.get(path`/v1/calendar-connection/${connectionID}/targets`, options);
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
     * Who holds the calendar. CAL_COM is the only provider that can be connected
     * today; GOOGLE and CALENDLY are described by `capabilities` but not yet
     * connectable.
     */
    provider: 'CAL_COM' | 'GOOGLE' | 'CALENDLY';

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
       * How this provider is authenticated.
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
       * True for a raw calendar, which exposes only events and free/busy. Roark then
       * owns bookable hours, duration, buffers, lead time and horizon, because the
       * provider has no notion of them.
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
     * Who holds the calendar. CAL_COM is the only provider that can be connected
     * today; GOOGLE and CALENDLY are described by `capabilities` but not yet
     * connectable.
     */
    provider: 'CAL_COM' | 'GOOGLE' | 'CALENDLY';

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
       * How this provider is authenticated.
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
       * True for a raw calendar, which exposes only events and free/busy. Roark then
       * owns bookable hours, duration, buffers, lead time and horizon, because the
       * provider has no notion of them.
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
     * Who holds the calendar. CAL_COM is the only provider that can be connected
     * today; GOOGLE and CALENDLY are described by `capabilities` but not yet
     * connectable.
     */
    provider: 'CAL_COM' | 'GOOGLE' | 'CALENDLY';

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
       * How this provider is authenticated.
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
       * True for a raw calendar, which exposes only events and free/busy. Roark then
       * owns bookable hours, duration, buffers, lead time and horizon, because the
       * provider has no notion of them.
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
     * Who holds the calendar. CAL_COM is the only provider that can be connected
     * today; GOOGLE and CALENDLY are described by `capabilities` but not yet
     * connectable.
     */
    provider: 'CAL_COM' | 'GOOGLE' | 'CALENDLY';

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
       * How this provider is authenticated.
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
       * True for a raw calendar, which exposes only events and free/busy. Roark then
       * owns bookable hours, duration, buffers, lead time and horizon, because the
       * provider has no notion of them.
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
     * Who holds the calendar. CAL_COM is the only provider that can be connected
     * today; GOOGLE and CALENDLY are described by `capabilities` but not yet
     * connectable.
     */
    provider: 'CAL_COM' | 'GOOGLE' | 'CALENDLY';

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
       * How this provider is authenticated.
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
       * True for a raw calendar, which exposes only events and free/busy. Roark then
       * owns bookable hours, duration, buffers, lead time and horizon, because the
       * provider has no notion of them.
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
   * type today, a Google calendar when that lands.
   */
  data: CalendarConnectionGetTargetResponse.Data;
}

export namespace CalendarConnectionGetTargetResponse {
  /**
   * Something on a connected account an agent can be pointed at: a Cal.com event
   * type today, a Google calendar when that lands.
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
     * Slugs a booking is refused without, as the provider names them (`email`,
     * `name`). The attendee object itself needs only a name and a timezone, so this is
     * the only place that says whether an agent has to collect an email.
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
    target: Data.Target;
  }

  export namespace Data {
    /**
     * Ready to put on a calendar tool, so nothing has to assemble one by hand.
     */
    export interface Target {
      eventTypeId: number;

      provider: 'CAL_COM';
    }
  }
}

export interface CalendarConnectionListTargetsResponse {
  data: Array<CalendarConnectionListTargetsResponse.Data>;
}

export namespace CalendarConnectionListTargetsResponse {
  /**
   * Something on a connected account an agent can be pointed at: a Cal.com event
   * type today, a Google calendar when that lands.
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
     * A human has to accept before it is an appointment. An agent booking one of these
     * must say "requested", never "confirmed".
     */
    requiresConfirmation: boolean;

    /**
     * Ready to put on a calendar tool, so nothing has to assemble one by hand.
     */
    target: Data.Target;
  }

  export namespace Data {
    /**
     * Ready to put on a calendar tool, so nothing has to assemble one by hand.
     */
    export interface Target {
      eventTypeId: number;

      provider: 'CAL_COM';
    }
  }
}

export interface CalendarConnectionCreateParams {
  /**
   * For CAL*COM: a Cal.com API key (starts with `cal*`). It is verified against
   * Cal.com before anything is stored, so an invalid key is a 400 and no connection
   * is created. Stored encrypted and never returned.
   */
  apiKey: string;

  /**
   * Customer-facing name for this account, unique within the project. Required.
   */
  label: string;

  /**
   * Who holds the calendar. CAL_COM is the only provider that can be connected
   * today; GOOGLE and CALENDLY are described by `capabilities` but not yet
   * connectable.
   */
  provider: 'CAL_COM' | 'GOOGLE' | 'CALENDLY';

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
   * Who holds the calendar. CAL_COM is the only provider that can be connected
   * today; GOOGLE and CALENDLY are described by `capabilities` but not yet
   * connectable.
   */
  provider?: 'CAL_COM' | 'GOOGLE' | 'CALENDLY';
}

export interface CalendarConnectionGetTargetParams {
  /**
   * Calendar connection ID
   */
  connectionId: string;
}

export declare namespace CalendarConnection {
  export {
    type CalendarConnectionCreateResponse as CalendarConnectionCreateResponse,
    type CalendarConnectionUpdateResponse as CalendarConnectionUpdateResponse,
    type CalendarConnectionListResponse as CalendarConnectionListResponse,
    type CalendarConnectionDeleteResponse as CalendarConnectionDeleteResponse,
    type CalendarConnectionCheckResponse as CalendarConnectionCheckResponse,
    type CalendarConnectionGetByIDResponse as CalendarConnectionGetByIDResponse,
    type CalendarConnectionGetTargetResponse as CalendarConnectionGetTargetResponse,
    type CalendarConnectionListTargetsResponse as CalendarConnectionListTargetsResponse,
    type CalendarConnectionCreateParams as CalendarConnectionCreateParams,
    type CalendarConnectionUpdateParams as CalendarConnectionUpdateParams,
    type CalendarConnectionListParams as CalendarConnectionListParams,
    type CalendarConnectionGetTargetParams as CalendarConnectionGetTargetParams,
  };
}
