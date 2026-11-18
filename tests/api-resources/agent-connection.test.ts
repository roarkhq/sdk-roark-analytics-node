// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agentConnection', () => {
  test('create: only required params', async () => {
    const responsePromise = client.agentConnection.create({
      apiKey: 'x',
      name: 'Production Retell',
      provider: 'RETELL',
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
    const response = await client.agentConnection.create({
      apiKey: 'x',
      name: 'Production Retell',
      provider: 'RETELL',
      agentIds: ['x'],
      agentNames: ['x'],
      agentScope: 'ALL',
      capabilities: ['PULL_AGENTS'],
      samplingRate: 1,
    });
  });

  test('update: only required params', async () => {
    const responsePromise = client.agentConnection.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      provider: 'RETELL',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.agentConnection.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      provider: 'RETELL',
      agentIds: ['x'],
      agentNames: ['x'],
      agentScope: 'ALL',
      apiKey: 'x',
      capabilities: ['PULL_AGENTS'],
      name: 'Production Retell',
      samplingRate: 1,
      status: 'ACTIVE',
    });
  });

  test('list', async () => {
    const responsePromise = client.agentConnection.list();
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
      client.agentConnection.list({ provider: 'RETELL' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.agentConnection.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('cancelBackfill: only required params', async () => {
    const responsePromise = client.agentConnection.cancelBackfill('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      connectionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('cancelBackfill: required and optional params', async () => {
    const response = await client.agentConnection.cancelBackfill('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      connectionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('createBackfill: only required params', async () => {
    const responsePromise = client.agentConnection.createBackfill('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      maxCalls: 250,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createBackfill: required and optional params', async () => {
    const response = await client.agentConnection.createBackfill('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      maxCalls: 250,
    });
  });

  test('discover: only required params', async () => {
    const responsePromise = client.agentConnection.discover({ apiKey: 'x', provider: 'RETELL' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('discover: required and optional params', async () => {
    const response = await client.agentConnection.discover({ apiKey: 'x', provider: 'RETELL' });
  });

  test('getByID', async () => {
    const responsePromise = client.agentConnection.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listBackfills', async () => {
    const responsePromise = client.agentConnection.listBackfills('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listProviders', async () => {
    const responsePromise = client.agentConnection.listProviders();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
