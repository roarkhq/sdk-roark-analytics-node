// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agentDraft', () => {
  test('create', async () => {
    const responsePromise = client.agentDraft.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
      client.agentDraft.create(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          fromVersionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('update: only required params', async () => {
    const responsePromise = client.agentDraft.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      settings: {},
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.agentDraft.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      settings: {
        backgroundNoise: 'NONE',
        backgroundNoiseUrl: 'https://example.com',
        backgroundNoiseVolume: 0,
        callMaxDurationSeconds: 30,
        callSilenceTimeoutSeconds: 5,
        chatInactivityTimeoutSeconds: 60,
        chatMaxDurationSeconds: 30,
        endCallGoodbyeMessage: 'x',
        endDetectionPhrases: ['x'],
        endDetectionReasons: ['x'],
        firstMessage: 'x',
        firstMessageAudioUrl: 'https://example.com',
        firstMessageMode: 'SPEAK_TEXT',
        idleMaxCount: 1,
        idleMessages: ['x'],
        idleTimeoutSeconds: 1,
        interruptionMode: 'ALLOW',
        language: 'xx',
        llmBackendModel: 'x',
        llmMaxTokens: 1,
        llmModel: 'x',
        llmProvider: 'OPENAI',
        llmTemperature: 0,
        llmVoice: 'x',
        modalities: ['call'],
        sttEndpointingMs: 10,
        sttKeyterms: ['x'],
        sttModel: 'x',
        sttProvider: 'DEEPGRAM',
        sttSmartFormat: true,
        sttTurnDetection: 'pipeline',
        subAgents: [
          {
            handoffs: [{ description: 'x', history: 'SHARED', note: 'x', once: true, to: 'main' }],
            isInitial: true,
            key: 'main',
            name: 'x',
            systemPrompt: 'x',
            tools: [{ pinnedVersion: 1, toolDefinitionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
            ttsModel: 'x',
            ttsProvider: 'CARTESIA',
            ttsSimilarityBoost: 0,
            ttsSpeed: 0.5,
            ttsStability: 0,
            ttsVoiceId: 'x',
          },
        ],
        vadStartSecs: 0,
        vadStopSecs: 0,
      },
      expectedRevision: 1,
    });
  });

  test('delete', async () => {
    const responsePromise = client.agentDraft.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('get', async () => {
    const responsePromise = client.agentDraft.get('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('publish: only required params', async () => {
    const responsePromise = client.agentDraft.publish('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: 1,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('publish: required and optional params', async () => {
    const response = await client.agentDraft.publish('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      expectedRevision: 1,
      summary: 'x',
    });
  });
});
