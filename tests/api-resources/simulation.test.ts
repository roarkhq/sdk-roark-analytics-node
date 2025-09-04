// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';
import { Response } from 'node-fetch';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource simulation', () => {
  test('getJobById', async () => {
    const responsePromise = client.simulation.getJobById('7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getJobById: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.simulation.getJobById('7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  // do not test lookup job - prism doesn't like camel case query params
});
