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
      callDirection: 'INBOUND',
      interfaceType: 'PHONE',
      recordingUrl: 'https://example.com',
      startedAt: 'startedAt',
      agent: {
        roarkId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        endpoint: { id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
        prompt: { resolvedPrompt: 'resolvedPrompt' },
      },
      agents: [
        {
          roarkId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          endpoint: { id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
          prompt: { resolvedPrompt: 'resolvedPrompt' },
        },
      ],
      customer: { phoneNumberE164: 'phoneNumberE164', label: 'label' },
      customers: [{ phoneNumberE164: 'phoneNumberE164', label: 'label' }],
      endedStatus: 'PARTICIPANTS_DID_NOT_SPEAK',
      properties: { foo: 'bar' },
      stereoRecordingUrl: 'https://example.com',
      toolInvocations: [
        {
          name: 'name',
          parameters: {
            foo: {
              description: 'description',
              type: 'string',
              value: {},
            },
          },
          result: 'string',
          startOffsetMs: 0,
          agent: { customId: 'customId', roarkId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
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

  test('list', async () => {
    const responsePromise = client.call.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.call.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(Roark.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.call.list(
        {
          after:
            'eyJpZCI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMTVUMTA6MDA6MDAuMDAwWiJ9',
          limit: 20,
          searchText: 'billing inquiry',
          sortBy: 'createdAt',
          sortDirection: 'desc',
          status: 'ENDED',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
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

  test('listEvaluationRuns', async () => {
    const responsePromise = client.call.listEvaluationRuns('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listEvaluationRuns: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.call.listEvaluationRuns('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('listMetrics', async () => {
    const responsePromise = client.call.listMetrics('callId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listMetrics: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.call.listMetrics('callId', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Roark.NotFoundError,
    );
  });

  test('listMetrics: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.call.listMetrics('callId', { flatten: 'flatten' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('listSentimentRuns', async () => {
    const responsePromise = client.call.listSentimentRuns('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listSentimentRuns: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.call.listSentimentRuns('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Roark.NotFoundError);
  });
});
