// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Shared from '../shared';
import { APIPromise } from '../../api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Order extends APIResource {
  /**
   * For valid response try integer IDs with value <= 5 or > 10. Other values will
   * generate exceptions.
   */
  retrieve(orderID: number, options?: RequestOptions): APIPromise<Shared.Order> {
    return this._client.get(`/store/order/${orderID}`, options);
  }

  /**
   * For valid response try integer IDs with value < 1000. Anything above 1000 or
   * nonintegers will generate API errors
   */
  deleteOrder(orderID: number, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(`/store/order/${orderID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}
