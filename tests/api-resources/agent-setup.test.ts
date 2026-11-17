// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agentSetup', () => {
  test('create', async () => {
    const responsePromise = client.agentSetup.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agentSetup.create(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          agentEndpointId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          capabilities: ['APPOINTMENT_BOOKING'],
          explore: { enabled: true, maxConversationMinutes: 1, maxConversations: 1 },
          industry: 'HEALTHCARE',
          testingInstructions: 'testingInstructions',
          websiteUrl: 'https://example.com',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('answerQuestion: only required params', async () => {
    const responsePromise = client.agentSetup.answerQuestion('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      text: 'x',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('answerQuestion: required and optional params', async () => {
    const response = await client.agentSetup.answerQuestion('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      text: 'x',
    });
  });

  test('cancel: only required params', async () => {
    const responsePromise = client.agentSetup.cancel('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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

  test('cancel: required and optional params', async () => {
    const response = await client.agentSetup.cancel('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('getByID: only required params', async () => {
    const responsePromise = client.agentSetup.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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
    const response = await client.agentSetup.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('getLatest', async () => {
    const responsePromise = client.agentSetup.getLatest('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('sendGuidance: only required params', async () => {
    const responsePromise = client.agentSetup.sendGuidance('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      text: 'x',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('sendGuidance: required and optional params', async () => {
    const response = await client.agentSetup.sendGuidance('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      text: 'x',
    });
  });
});
