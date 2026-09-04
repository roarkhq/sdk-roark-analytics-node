// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource metric', () => {
  test('createDefinition: only required params', async () => {
    const responsePromise = client.metric.createDefinition({
      calculationType: 'LLM_JUDGE',
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
      calculationType: 'LLM_JUDGE',
      name: 'Customer Satisfaction',
      outputType: 'BOOLEAN',
      analysisPackageId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      booleanFalseLabel: 'booleanFalseLabel',
      booleanTrueLabel: 'booleanTrueLabel',
      classificationOptions: [{ description: 'description', displayOrder: 0, label: 'label' }],
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
      scaleMax: 0,
      scaleMin: 0,
      scope: 'GLOBAL',
      slug: 'customer_satisfaction',
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

  test('listDefinitions: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.metric.listDefinitions({ after: 'after', limit: 1 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('updateDefinition', async () => {
    const responsePromise = client.metric.updateDefinition('idOrSlug');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateDefinition: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.metric.updateDefinition(
        'idOrSlug',
        {
          analysisPackageId: 'analysisPackageId',
          booleanFalseLabel: 'booleanFalseLabel',
          booleanTrueLabel: 'booleanTrueLabel',
          calcType: 'calcType',
          changeReason: 'changeReason',
          classificationOptions: [{ description: 'description', displayOrder: 0, label: 'label' }],
          formula: 'x',
          llmPrompt: 'llmPrompt',
          maxClassifications: 1,
          metricId: 'metricId',
          name: 'x',
          organizationId: 'organizationId',
          outputType: 'outputType',
          participantRole: 'participantRole',
          projectId: 'projectId',
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
          scaleMax: 0,
          scaleMin: 0,
          scope: 'scope',
          slug: 'slug',
          source: 'source',
          sources: [
            {
              sourceMetricDefinitionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
              sourceVariantId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            },
          ],
          supportedContexts: ['CALL'],
          supportsMultipleVariants: 'supportsMultipleVariants',
          toolDefinitionIds: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });
});
