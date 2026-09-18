// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource autoimproveFix', () => {
  test('create: only required params', async () => {
    const responsePromise = client.autoimproveFix.create({
      agentId: 'b3b0c8e2-4c1d-4f6a-9e2b-1a2b3c4d5e6f',
      objectiveLabel: 'Consent collection should pass',
      objectiveMetricDefinitionId: 'f2f0c8e2-4c1d-4f6a-9e2b-1a2b3c4d5e6f',
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
    const response = await client.autoimproveFix.create({
      agentId: 'b3b0c8e2-4c1d-4f6a-9e2b-1a2b3c4d5e6f',
      objectiveLabel: 'Consent collection should pass',
      objectiveMetricDefinitionId: 'f2f0c8e2-4c1d-4f6a-9e2b-1a2b3c4d5e6f',
      customerIntegrationId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      maxIterations: 1,
      maxSimCalls: 1,
      stagingAgentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      targetValue: 90,
      validationRunPlanId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('list', async () => {
    const responsePromise = client.autoimproveFix.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('answerQuestion: only required params', async () => {
    const responsePromise = client.autoimproveFix.answerQuestion('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      text: 'Keep the current voice; focus on the closing confirmation.',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('answerQuestion: required and optional params', async () => {
    const response = await client.autoimproveFix.answerQuestion('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      text: 'Keep the current voice; focus on the closing confirmation.',
    });
  });

  test('cancel', async () => {
    const responsePromise = client.autoimproveFix.cancel('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('dismiss', async () => {
    const responsePromise = client.autoimproveFix.dismiss('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getByID', async () => {
    const responsePromise = client.autoimproveFix.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('promote', async () => {
    const responsePromise = client.autoimproveFix.promote('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('sendGuidance: only required params', async () => {
    const responsePromise = client.autoimproveFix.sendGuidance('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      text: 'Keep the current voice; focus on the closing confirmation.',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('sendGuidance: required and optional params', async () => {
    const response = await client.autoimproveFix.sendGuidance('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      text: 'Keep the current voice; focus on the closing confirmation.',
    });
  });
});
