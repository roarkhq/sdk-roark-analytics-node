// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource metric', () => {
  test('createDefinition: only required params', async () => {
    const responsePromise = client.metric.createDefinition({
      analysisPackageId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      name: 'Customer Satisfaction',
      outputType: 'BOOLEAN',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createDefinition: required and optional params', async () => {
    const response = await client.metric.createDefinition({
      analysisPackageId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      name: 'Customer Satisfaction',
      outputType: 'BOOLEAN',
      booleanFalseLabel: 'Not Satisfied',
      booleanTrueLabel: 'Satisfied',
      classificationOptions: [
        {
          description: 'description',
          displayOrder: 0,
          label: 'label',
        },
      ],
      llmPrompt: 'Evaluate whether the customer expressed satisfaction with the service provided.',
      maxClassifications: 1,
      metricId: 'customer_satisfaction',
      participantRole: 'AGENT',
      scaleLabels: [
        {
          displayOrder: 0,
          label: 'label',
          rangeMax: 0,
          rangeMin: 0,
          colorHex: 'colorHex',
          description: 'description',
        },
      ],
      scaleMax: 5,
      scaleMin: 1,
      scope: 'GLOBAL',
      supportedContexts: ['CALL'],
    });
  });

  test('listDefinitions', async () => {
    const responsePromise = client.metric.listDefinitions();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
