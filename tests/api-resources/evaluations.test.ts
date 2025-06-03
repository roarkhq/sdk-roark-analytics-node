// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';
import { Response } from 'node-fetch';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource evaluations', () => {
  test('create: only required params', async () => {
    const responsePromise = client.evaluations.create({ evaluators: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.evaluations.create({
      evaluators: ['string'],
      call: {
        callDirection: 'INBOUND',
        interfaceType: 'PHONE',
        participants: [
          { role: 'AGENT', isSimulated: true, name: 'x', phoneNumber: 'xxx', spokeFirst: true },
          { role: 'AGENT', isSimulated: true, name: 'x', phoneNumber: 'xxx', spokeFirst: true },
        ],
        recordingUrl: 'https://example.com',
        startedAt: 'startedAt',
        endedReason: 'endedReason',
        endedStatus: 'AGENT_ENDED_CALL',
        isTest: true,
        properties: { foo: 'bar' },
        retellCallId: 'retellCallId',
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
        vapiCallId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      },
      dataset: {
        calls: [
          {
            callDirection: 'INBOUND',
            interfaceType: 'PHONE',
            participants: [
              { role: 'AGENT', isSimulated: true, name: 'x', phoneNumber: 'xxx', spokeFirst: true },
              { role: 'AGENT', isSimulated: true, name: 'x', phoneNumber: 'xxx', spokeFirst: true },
            ],
            recordingUrl: 'https://example.com',
            startedAt: 'startedAt',
            endedReason: 'endedReason',
            endedStatus: 'AGENT_ENDED_CALL',
            isTest: true,
            properties: { foo: 'bar' },
            retellCallId: 'retellCallId',
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
            vapiCallId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          },
        ],
        name: 'name',
      },
    });
  });
});
