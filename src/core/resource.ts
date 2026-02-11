// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Roark } from '../client';

export abstract class APIResource {
  protected _client: Roark;

  constructor(client: Roark) {
    this._client = client;
  }
}
