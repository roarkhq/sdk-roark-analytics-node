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
      startedAt: '2025-02-08T08:16:31.547Z',
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
        { role: 'AGENT', name: 'Sales Agent', phoneNumber: '+15551234567', spokeFirst: true },
        { role: 'AGENT', name: 'John Doe', phoneNumber: '+15557654321', spokeFirst: false },
      ],
      recordingUrl: 'https://example.com/recording.wav',
      startedAt: '2025-02-08T08:16:31.547Z',
      endedReason: 'endedReason',
      isTest: false,
      stereoRecordingUrl: 'https://example.com/recording_stereo.wav',
    });
  });
});
