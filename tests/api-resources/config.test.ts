// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource config', () => {
  test('apply: only required params', async () => {
    const responsePromise = client.config.apply({ resources: [{ kind: 'agent', name: 'x' }] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('apply: required and optional params', async () => {
    const response = await client.config.apply({
      resources: [
        {
          kind: 'agent',
          name: 'x',
          customId: 'customId',
          description: 'description',
          displayName: 'displayName',
          endpoints: [
            {
              direction: 'INCOMING',
              environment: 'environment',
              outboundDialHttpRequestDefinition: 'x',
              outboundDialType: 'NONE',
              type: 'PHONE',
              value: 'x',
            },
          ],
          greeting: 'x',
          jobDescription: 'x',
          llm: { model: 'x', provider: 'OPENAI' },
          prompt: 'prompt',
          provider: 'roark',
          stt: { model: 'x', provider: 'DEEPGRAM' },
          tts: { provider: 'CARTESIA', voiceId: 'x', model: 'x' },
          voice: 'x',
        },
      ],
      prune: true,
    });
  });

  test('diff: only required params', async () => {
    const responsePromise = client.config.diff({ resources: [{ kind: 'agent', name: 'x' }] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('diff: required and optional params', async () => {
    const response = await client.config.diff({
      resources: [
        {
          kind: 'agent',
          name: 'x',
          customId: 'customId',
          description: 'description',
          displayName: 'displayName',
          endpoints: [
            {
              direction: 'INCOMING',
              environment: 'environment',
              outboundDialHttpRequestDefinition: 'x',
              outboundDialType: 'NONE',
              type: 'PHONE',
              value: 'x',
            },
          ],
          greeting: 'x',
          jobDescription: 'x',
          llm: { model: 'x', provider: 'OPENAI' },
          prompt: 'prompt',
          provider: 'roark',
          stt: { model: 'x', provider: 'DEEPGRAM' },
          tts: { provider: 'CARTESIA', voiceId: 'x', model: 'x' },
          voice: 'x',
        },
      ],
      prune: true,
    });
  });
});
