// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource config', () => {
  test('apply: only required params', async () => {
    const responsePromise = client.config.apply({ resources: [{ kind: 'agent', name: 'name' }] });
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
          name: 'name',
          customId: 'customId',
          description: 'description',
          endpoints: [
            {
              direction: 'INCOMING',
              name: 'name',
              value: 'x',
              environment: 'environment',
            },
          ],
        },
      ],
      prune: true,
    });
  });

  test('diff: only required params', async () => {
    const responsePromise = client.config.diff({ resources: [{ kind: 'agent', name: 'name' }] });
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
          name: 'name',
          customId: 'customId',
          description: 'description',
          endpoints: [
            {
              direction: 'INCOMING',
              name: 'name',
              value: 'x',
              environment: 'environment',
            },
          ],
        },
      ],
      prune: true,
    });
  });
});
