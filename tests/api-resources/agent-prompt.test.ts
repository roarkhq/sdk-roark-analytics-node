// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agentPrompt', () => {
  test('update: only required params', async () => {
    const responsePromise = client.agentPrompt.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      prompt: 'x',
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
    const response = await client.agentPrompt.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { prompt: 'x' });
  });

  test('list', async () => {
    const responsePromise = client.agentPrompt.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listVersions: only required params', async () => {
    const responsePromise = client.agentPrompt.listVersions('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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

  test('listVersions: required and optional params', async () => {
    const response = await client.agentPrompt.listVersions('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
