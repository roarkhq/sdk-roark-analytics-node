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
      direction: 'INBOUND',
      sourceRecordingUrl: 'https://example.com/recording.mp3',
      startedAt: '2025-02-07T02:33:10.378Z',
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
      direction: 'INBOUND',
      sourceRecordingUrl: 'https://example.com/recording.mp3',
      startedAt: '2025-02-07T02:33:10.378Z',
      agent: { name: 'Sales Agent', phoneNumber: '+15551234567' },
      agentSpokeFirst: true,
      customer: { name: 'John Doe', phoneNumber: '+15557654321' },
      isTest: false,
      stereoRecordingUrl: 'https://example.com',
    });
  });
});
