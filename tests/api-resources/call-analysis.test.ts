// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';
import { Response } from 'node-fetch';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource callAnalysis', () => {
  test('create: only required params', async () => {
    const responsePromise = client.callAnalysis.create({
      callDirection: 'INBOUND',
      interfaceType: 'PHONE',
      participants: [{ role: 'AGENT' }, { role: 'AGENT' }],
      recordingUrl: 'https://example.com/recording.wav',
      startedAt: '2025-03-13T22:11:28.700Z',
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
    const response = await client.callAnalysis.create({
      callDirection: 'INBOUND',
      interfaceType: 'PHONE',
      participants: [
        {
          role: 'AGENT',
          isSimulated: true,
          name: 'Sales Agent',
          phoneNumber: '+15551234567',
          spokeFirst: true,
        },
        {
          role: 'AGENT',
          isSimulated: true,
          name: 'John Doe',
          phoneNumber: '+15557654321',
          spokeFirst: false,
        },
      ],
      recordingUrl: 'https://example.com/recording.wav',
      startedAt: '2025-03-13T22:11:28.700Z',
      endedReason: 'endedReason',
      isTest: false,
      properties: { business_name: 'bar', business_id: 'bar' },
      retellCallId: 'retellCallId',
      stereoRecordingUrl: 'https://example.com',
      vapiCallId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.callAnalysis.retrieve('jobId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.callAnalysis.retrieve('jobId', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Roark.NotFoundError,
    );
  });
});
