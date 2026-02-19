// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource evaluation', () => {
  test('createEvaluator: only required params', async () => {
    const responsePromise = client.evaluation.createEvaluator({
      blocks: [
        {
          blockType: 'CUSTOM_PROMPT',
          metricName: 'metricName',
          name: 'name',
          prompt: 'prompt',
        },
      ],
      name: 'x',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createEvaluator: required and optional params', async () => {
    const response = await client.evaluation.createEvaluator({
      blocks: [
        {
          blockType: 'CUSTOM_PROMPT',
          metricName: 'metricName',
          name: 'name',
          prompt: 'prompt',
          description: 'description',
          inputDimensions: ['string'],
          orderIndex: 0,
          skipCondition: 'skipCondition',
          threshold: 0,
          weight: 0,
        },
      ],
      name: 'x',
      description: 'description',
    });
  });

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

  test('getEvaluatorByID', async () => {
    const responsePromise = client.evaluation.getEvaluatorByID('evaluatorId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
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

  test('updateEvaluator', async () => {
    const responsePromise = client.evaluation.updateEvaluator('evaluatorId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateEvaluator: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.evaluation.updateEvaluator(
        'evaluatorId',
        {
          blocks: [
            {
              blockType: 'CUSTOM_PROMPT',
              metricName: 'metricName',
              name: 'name',
              prompt: 'prompt',
              id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
              description: 'description',
              inputDimensions: ['string'],
              orderIndex: 0,
              skipCondition: 'skipCondition',
              threshold: 0,
              weight: 0,
            },
          ],
          description: 'description',
          name: 'x',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });
});
