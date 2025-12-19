// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';
import { Response } from 'node-fetch';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource call', () => {
  test('create: only required params', async () => {
    const responsePromise = client.call.create({
      agent: { roarkId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
      callDirection: 'INBOUND',
      interfaceType: 'PHONE',
      recordingUrl: 'https://example.com',
      startedAt: 'startedAt',
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
    const response = await client.call.create({
      agent: {
        roarkId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        endpoint: { id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
        prompt: { resolvedPrompt: 'resolvedPrompt' },
      },
      callDirection: 'INBOUND',
      interfaceType: 'PHONE',
      recordingUrl: 'https://example.com',
      startedAt: 'startedAt',
      customer: { phoneNumberE164: 'phoneNumberE164', label: 'label' },
      endedStatus: 'PARTICIPANTS_DID_NOT_SPEAK',
      properties: { foo: 'bar' },
      stereoRecordingUrl: 'https://example.com',
      toolInvocations: [
        {
          name: 'name',
          parameters: { foo: 'value' },
          result: 'string',
          startOffsetMs: 0,
          description: 'description',
          endOffsetMs: 0,
        },
      ],
      transcript: [
        {
          endOffsetMs: 0,
          role: 'AGENT',
          startOffsetMs: 0,
          text: 'x',
          agent: { customId: 'customId', roarkId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
          languageCode: 'languageCode',
        },
      ],
    });
  });

  test('getById', async () => {
    const responsePromise = client.call.getById('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getById: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.call.getById('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('getEvaluationRuns', async () => {
    const responsePromise = client.call.getEvaluationRuns('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getEvaluationRuns: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.call.getEvaluationRuns('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('getMetrics', async () => {
    const responsePromise = client.call.getMetrics('callId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getMetrics: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.call.getMetrics('callId', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Roark.NotFoundError,
    );
  });

  test('getMetrics: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.call.getMetrics('callId', { flatten: 'flatten' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('getSentimentRuns', async () => {
    const responsePromise = client.call.getSentimentRuns('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getSentimentRuns: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.call.getSentimentRuns('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Roark.NotFoundError);
  });
});
