// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';
import { Response } from 'node-fetch';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource persona', () => {
  test('create: only required params', async () => {
    const responsePromise = client.persona.create({
      accent: 'US',
      gender: 'MALE',
      language: 'EN',
      name: 'name',
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
    const response = await client.persona.create({
      accent: 'US',
      gender: 'MALE',
      language: 'EN',
      name: 'name',
      backgroundNoise: 'NONE',
      backstoryPrompt: 'A busy professional calling during lunch break',
      baseEmotion: 'NEUTRAL',
      confirmationStyle: 'EXPLICIT',
      hasDisfluencies: true,
      intentClarity: 'CLEAR',
      memoryReliability: 'HIGH',
      properties: { age: 'bar', zipCode: 'bar', occupation: 'bar' },
      secondaryLanguage: 'EN',
      speechClarity: 'CLEAR',
      speechPace: 'SLOW',
    });
  });

  test('update', async () => {
    const responsePromise = client.persona.update('personaId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.persona.update('personaId', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Roark.NotFoundError,
    );
  });

  test('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.persona.update(
        'personaId',
        {
          accent: 'US',
          backgroundNoise: 'NONE',
          backstoryPrompt: 'A busy professional calling during lunch break',
          baseEmotion: 'NEUTRAL',
          confirmationStyle: 'EXPLICIT',
          gender: 'MALE',
          hasDisfluencies: true,
          intentClarity: 'CLEAR',
          language: 'EN',
          memoryReliability: 'HIGH',
          name: 'name',
          properties: { age: 'bar', zipCode: 'bar', occupation: 'bar' },
          secondaryLanguage: 'EN',
          speechClarity: 'CLEAR',
          speechPace: 'SLOW',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('findAll', async () => {
    const responsePromise = client.persona.findAll();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('findAll: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.persona.findAll({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Roark.NotFoundError,
    );
  });

  test('findAll: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.persona.findAll(
        { after: 'after', limit: 1, searchText: 'searchText' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('getById', async () => {
    const responsePromise = client.persona.getById('personaId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getById: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.persona.getById('personaId', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Roark.NotFoundError,
    );
  });
});
