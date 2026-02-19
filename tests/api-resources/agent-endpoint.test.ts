// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agentEndpoint', () => {
  test('create: only required params', async () => {
    const responsePromise = client.agentEndpoint.create({
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      direction: 'INCOMING',
      value: 'value',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.agentEndpoint.create({
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      direction: 'INCOMING',
      value: 'value',
      environment: 'environment',
      outboundDialHttpRequestDefinitionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      outboundDialType: 'NONE',
    });
  });

  test('update', async () => {
    const responsePromise = client.agentEndpoint.update('endpointId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agentEndpoint.update(
        'endpointId',
        {
          environment: 'environment',
          outboundDialHttpRequestDefinitionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          outboundDialType: 'NONE',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.agentEndpoint.list();
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
      client.agentEndpoint.list(
        {
          after: 'after',
          agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          limit: 1,
          searchText: 'searchText',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('getByID', async () => {
    const responsePromise = client.agentEndpoint.getByID('endpointId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
