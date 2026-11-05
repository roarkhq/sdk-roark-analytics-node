// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tool', () => {
  test('create: only required params', async () => {
    const responsePromise = client.tool.create({ description: 'x', name: 'book_appointment' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.tool.create({
      description: 'x',
      name: 'book_appointment',
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      expectedResult: 'expectedResult',
      inputs: [{ name: 'date', type: 'string', description: 'description', required: true }],
      invocationCriteria: 'invocationCriteria',
      runtime: {
        request: {
          url: 'https://example.com',
          body: 'x',
          headers: [{ name: 'X-Api-Version', value: '2026-10-01' }],
          method: 'POST',
          timeoutMs: 1000,
        },
        changesData: true,
        messages: { before: 'before', failure: 'failure', slow: 'slow' },
        responseFields: ['x'],
      },
    });
  });

  test('update: only required params', async () => {
    const responsePromise = client.tool.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      description: 'x',
      name: 'book_appointment',
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
    const response = await client.tool.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      description: 'x',
      name: 'book_appointment',
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      expectedResult: 'expectedResult',
      inputs: [{ name: 'date', type: 'string', description: 'description', required: true }],
      invocationCriteria: 'invocationCriteria',
      runtime: {
        request: {
          url: 'https://example.com',
          body: 'x',
          headers: [{ name: 'X-Api-Version', value: '2026-10-01' }],
          method: 'POST',
          timeoutMs: 1000,
        },
        changesData: true,
        messages: { before: 'before', failure: 'failure', slow: 'slow' },
        responseFields: ['x'],
      },
    });
  });

  test('list', async () => {
    const responsePromise = client.tool.list();
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
      client.tool.list(
        {
          agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          includeBuiltIn: 'true',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.tool.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getByID', async () => {
    const responsePromise = client.tool.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
