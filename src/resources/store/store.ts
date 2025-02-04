// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Shared from '../shared';
import * as OrderAPI from './order';
import { Order } from './order';
import { APIPromise } from '../../api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Store extends APIResource {
  order: OrderAPI.Order = new OrderAPI.Order(this._client);

  /**
   * Place a new order in the store
   */
  createOrder(
    body: StoreCreateOrderParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Shared.Order> {
    return this._client.post('/store/order', { body, ...options });
  }

  /**
   * Returns a map of status codes to quantities
   */
  inventory(options?: RequestOptions): APIPromise<StoreInventoryResponse> {
    return this._client.get('/store/inventory', options);
  }
}

export type StoreInventoryResponse = Record<string, number>;

export interface StoreCreateOrderParams {
  id?: number;

  complete?: boolean;

  petId?: number;

  quantity?: number;

  shipDate?: string;

  /**
   * Order Status
   */
  status?: 'placed' | 'approved' | 'delivered';
}

Store.Order = Order;

export declare namespace Store {
  export {
    type StoreInventoryResponse as StoreInventoryResponse,
    type StoreCreateOrderParams as StoreCreateOrderParams,
  };

  export { Order as Order };
}
