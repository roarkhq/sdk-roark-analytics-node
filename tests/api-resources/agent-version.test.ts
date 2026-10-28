// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agentVersion', () => {
  test('list', async () => {
    const responsePromise = client.agentVersion.list('agentId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agentVersion.list(
        'agentId',
        {
          after: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          limit: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('getByID: only required params', async () => {
    const responsePromise = client.agentVersion.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getByID: required and optional params', async () => {
    const response = await client.agentVersion.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('restore: only required params', async () => {
    const responsePromise = client.agentVersion.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('restore: required and optional params', async () => {
    const response = await client.agentVersion.restore('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      expectedLiveVersionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      summary: 'x',
    });
  });
});
