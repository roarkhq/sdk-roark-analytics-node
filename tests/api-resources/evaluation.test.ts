// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';
import { Response } from 'node-fetch';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource evaluation', () => {
  test('createJob: only required params', async () => {
    const responsePromise = client.evaluation.createJob({ evaluators: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createJob: required and optional params', async () => {
    const response = await client.evaluation.createJob({
      evaluators: ['string'],
      call: {
        callDirection: 'INBOUND',
        interfaceType: 'PHONE',
        participants: [
          {
            role: 'AGENT',
            isSimulated: true,
            name: 'x',
            participantId: 'participantId',
            phoneNumber: 'xxx',
            spokeFirst: true,
          },
        ],
        recordingUrl: 'https://example.com',
        startedAt: 'startedAt',
        endedReason: 'endedReason',
        endedStatus: 'PARTICIPANTS_DID_NOT_SPEAK',
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
      callId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      dataset: {
        calls: [
          {
            callDirection: 'INBOUND',
            interfaceType: 'PHONE',
            participants: [
              {
                role: 'AGENT',
                isSimulated: true,
                name: 'x',
                participantId: 'participantId',
                phoneNumber: 'xxx',
                spokeFirst: true,
              },
            ],
            recordingUrl: 'https://example.com',
            startedAt: 'startedAt',
            endedReason: 'endedReason',
            endedStatus: 'PARTICIPANTS_DID_NOT_SPEAK',
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

  test('getEvaluatorById', async () => {
    const responsePromise = client.evaluation.getEvaluatorById('evaluatorId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getEvaluatorById: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.evaluation.getEvaluatorById('evaluatorId', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('getJob', async () => {
    const responsePromise = client.evaluation.getJob('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getJob: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.evaluation.getJob('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('listEvaluators', async () => {
    const responsePromise = client.evaluation.listEvaluators();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listEvaluators: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.evaluation.listEvaluators({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Roark.NotFoundError,
    );
  });

  test('listEvaluators: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.evaluation.listEvaluators({ after: 'after', limit: '20' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('listJobRuns', async () => {
    const responsePromise = client.evaluation.listJobRuns('jobId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listJobRuns: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.evaluation.listJobRuns('jobId', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('listJobRuns: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.evaluation.listJobRuns(
        'jobId',
        { limit: '10', nextCursor: 'nextCursor' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });
});
