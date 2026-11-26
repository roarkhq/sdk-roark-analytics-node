// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agent', () => {
  test('create: only required params', async () => {
    const responsePromise = client.agent.create({ name: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.agent.create({
      name: 'x',
      capabilities: ['APPOINTMENT_BOOKING'],
      customId: 'customId',
      description: 'description',
      endpoint: {
        direction: 'INCOMING',
        environment: 'environment',
        outboundDialHttpRequestDefinitionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        outboundDialType: 'NONE',
        value: 'value',
      },
      industry: 'HEALTHCARE',
      industryDescription: 'industryDescription',
      prompt: 'x',
      websiteUrl: 'https://example.com',
    });
  });

  test('update', async () => {
    const responsePromise = client.agent.update('agentId');
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
      client.agent.update(
        'agentId',
        {
          capabilities: ['APPOINTMENT_BOOKING'],
          description: 'description',
          industry: 'HEALTHCARE',
          industryDescription: 'industryDescription',
          name: 'x',
          websiteUrl: 'https://example.com',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.agent.list();
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
      client.agent.list(
        {
          after: 'after',
          limit: 1,
          searchText: 'searchText',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('build: only required params', async () => {
    const responsePromise = client.agent.build({ jobDescription: 'x', name: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('build: required and optional params', async () => {
    const response = await client.agent.build({
      jobDescription: 'x',
      name: 'x',
      capabilities: ['APPOINTMENT_BOOKING'],
      industry: 'HEALTHCARE',
      industryDescription: 'industryDescription',
      llm: { model: 'x', provider: 'OPENAI' },
      stt: { model: 'x', provider: 'DEEPGRAM' },
      tts: { provider: 'CARTESIA', voiceId: 'x', model: 'x' },
      voice: 'voice',
      websiteUrl: 'https://example.com',
    });
  });

  test('getByID', async () => {
    const responsePromise = client.agent.getByID('agentId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
