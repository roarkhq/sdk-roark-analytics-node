// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.health.get',
    fullyQualifiedName: 'health.get',
    httpMethod: 'get',
    httpPath: '/health',
  },
  {
    clientCallName: 'client.evaluation.createJob',
    fullyQualifiedName: 'evaluation.createJob',
    httpMethod: 'post',
    httpPath: '/v1/evaluation/job',
  },
  {
    clientCallName: 'client.evaluation.getEvaluatorByID',
    fullyQualifiedName: 'evaluation.getEvaluatorByID',
    httpMethod: 'get',
    httpPath: '/v1/evaluation/evaluators/{evaluatorId}',
  },
  {
    clientCallName: 'client.evaluation.getJob',
    fullyQualifiedName: 'evaluation.getJob',
    httpMethod: 'get',
    httpPath: '/v1/evaluation/job/{jobId}',
  },
  {
    clientCallName: 'client.evaluation.listEvaluators',
    fullyQualifiedName: 'evaluation.listEvaluators',
    httpMethod: 'get',
    httpPath: '/v1/evaluation/evaluators',
  },
  {
    clientCallName: 'client.evaluation.listJobRuns',
    fullyQualifiedName: 'evaluation.listJobRuns',
    httpMethod: 'get',
    httpPath: '/v1/evaluation/job/{jobId}/runs',
  },
  {
    clientCallName: 'client.call.create',
    fullyQualifiedName: 'call.create',
    httpMethod: 'post',
    httpPath: '/v1/call',
  },
  {
    clientCallName: 'client.call.list',
    fullyQualifiedName: 'call.list',
    httpMethod: 'get',
    httpPath: '/v1/call',
  },
  {
    clientCallName: 'client.call.getByID',
    fullyQualifiedName: 'call.getByID',
    httpMethod: 'get',
    httpPath: '/v1/call/{callId}',
  },
  {
    clientCallName: 'client.call.listEvaluationRuns',
    fullyQualifiedName: 'call.listEvaluationRuns',
    httpMethod: 'get',
    httpPath: '/v1/call/{callId}/evaluation-run',
  },
  {
    clientCallName: 'client.call.listMetrics',
    fullyQualifiedName: 'call.listMetrics',
    httpMethod: 'get',
    httpPath: '/v1/call/{callId}/metrics',
  },
  {
    clientCallName: 'client.call.listSentimentRuns',
    fullyQualifiedName: 'call.listSentimentRuns',
    httpMethod: 'get',
    httpPath: '/v1/call/{callId}/sentiment-run',
  },
  {
    clientCallName: 'client.metric.listDefinitions',
    fullyQualifiedName: 'metric.listDefinitions',
    httpMethod: 'get',
    httpPath: '/v1/metric/definitions',
  },
  {
    clientCallName: 'client.integrations.createRetellCall',
    fullyQualifiedName: 'integrations.createRetellCall',
    httpMethod: 'post',
    httpPath: '/v1/retell/call',
  },
  {
    clientCallName: 'client.integrations.createVapiCall',
    fullyQualifiedName: 'integrations.createVapiCall',
    httpMethod: 'post',
    httpPath: '/v1/vapi/call',
  },
  {
    clientCallName: 'client.simulation.getRunPlanJob',
    fullyQualifiedName: 'simulation.getRunPlanJob',
    httpMethod: 'get',
    httpPath: '/v1/simulation/plan/job/{jobId}',
  },
  {
    clientCallName: 'client.simulation.getSimulationJobByID',
    fullyQualifiedName: 'simulation.getSimulationJobByID',
    httpMethod: 'get',
    httpPath: '/v1/simulation/job/{jobId}',
  },
  {
    clientCallName: 'client.simulation.listRunPlanJobs',
    fullyQualifiedName: 'simulation.listRunPlanJobs',
    httpMethod: 'get',
    httpPath: '/v1/simulation/plan/jobs',
  },
  {
    clientCallName: 'client.simulation.listScenarios',
    fullyQualifiedName: 'simulation.listScenarios',
    httpMethod: 'get',
    httpPath: '/v1/simulation/scenario',
  },
  {
    clientCallName: 'client.simulation.lookupSimulationJob',
    fullyQualifiedName: 'simulation.lookupSimulationJob',
    httpMethod: 'get',
    httpPath: '/v1/simulation/job/lookup',
  },
  {
    clientCallName: 'client.simulation.startRunPlanJob',
    fullyQualifiedName: 'simulation.startRunPlanJob',
    httpMethod: 'post',
    httpPath: '/v1/simulation/plan/{planId}/job',
  },
  {
    clientCallName: 'client.persona.create',
    fullyQualifiedName: 'persona.create',
    httpMethod: 'post',
    httpPath: '/v1/persona',
  },
  {
    clientCallName: 'client.persona.update',
    fullyQualifiedName: 'persona.update',
    httpMethod: 'put',
    httpPath: '/v1/persona/{personaId}',
  },
  {
    clientCallName: 'client.persona.list',
    fullyQualifiedName: 'persona.list',
    httpMethod: 'get',
    httpPath: '/v1/persona',
  },
  {
    clientCallName: 'client.persona.getByID',
    fullyQualifiedName: 'persona.getByID',
    httpMethod: 'get',
    httpPath: '/v1/persona/{personaId}',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
