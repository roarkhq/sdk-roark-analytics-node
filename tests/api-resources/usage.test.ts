// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource usage', () => {
  test('get: only required params', async () => {
    const responsePromise = client.usage.get({ from: '2026-09-01T00:00:00Z', to: '2026-10-01T00:00:00Z' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('get: required and optional params', async () => {
    const response = await client.usage.get({
      from: '2026-09-01T00:00:00Z',
      to: '2026-10-01T00:00:00Z',
      projectId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
