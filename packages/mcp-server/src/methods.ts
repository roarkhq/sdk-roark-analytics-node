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
    clientCallName: 'client.call.getTranscript',
    fullyQualifiedName: 'call.getTranscript',
    httpMethod: 'get',
    httpPath: '/v1/call/{callId}/transcript',
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
    clientCallName: 'client.simulationJob.getByID',
    fullyQualifiedName: 'simulationJob.getByID',
    httpMethod: 'get',
    httpPath: '/v1/simulation/job/{jobId}',
  },
  {
    clientCallName: 'client.simulationJob.lookup',
    fullyQualifiedName: 'simulationJob.lookup',
    httpMethod: 'get',
    httpPath: '/v1/simulation/job/lookup',
  },
  {
    clientCallName: 'client.simulationRunPlan.create',
    fullyQualifiedName: 'simulationRunPlan.create',
    httpMethod: 'post',
    httpPath: '/v1/simulation/plan',
  },
  {
    clientCallName: 'client.simulationRunPlan.update',
    fullyQualifiedName: 'simulationRunPlan.update',
    httpMethod: 'put',
    httpPath: '/v1/simulation/plan/{planId}',
  },
  {
    clientCallName: 'client.simulationRunPlan.list',
    fullyQualifiedName: 'simulationRunPlan.list',
    httpMethod: 'get',
    httpPath: '/v1/simulation/plan',
  },
  {
    clientCallName: 'client.simulationRunPlan.delete',
    fullyQualifiedName: 'simulationRunPlan.delete',
    httpMethod: 'delete',
    httpPath: '/v1/simulation/plan/{planId}',
  },
  {
    clientCallName: 'client.simulationRunPlan.getByID',
    fullyQualifiedName: 'simulationRunPlan.getByID',
    httpMethod: 'get',
    httpPath: '/v1/simulation/plan/{planId}',
  },
  {
    clientCallName: 'client.simulationRunPlanJob.list',
    fullyQualifiedName: 'simulationRunPlanJob.list',
    httpMethod: 'get',
    httpPath: '/v1/simulation/plan/jobs',
  },
  {
    clientCallName: 'client.simulationRunPlanJob.getByID',
    fullyQualifiedName: 'simulationRunPlanJob.getByID',
    httpMethod: 'get',
    httpPath: '/v1/simulation/plan/job/{jobId}',
  },
  {
    clientCallName: 'client.simulationRunPlanJob.start',
    fullyQualifiedName: 'simulationRunPlanJob.start',
    httpMethod: 'post',
    httpPath: '/v1/simulation/plan/{planId}/job',
  },
  {
    clientCallName: 'client.simulationScenario.create',
    fullyQualifiedName: 'simulationScenario.create',
    httpMethod: 'post',
    httpPath: '/v1/simulation/scenario',
  },
  {
    clientCallName: 'client.simulationScenario.update',
    fullyQualifiedName: 'simulationScenario.update',
    httpMethod: 'put',
    httpPath: '/v1/simulation/scenario/{scenarioId}',
  },
  {
    clientCallName: 'client.simulationScenario.list',
    fullyQualifiedName: 'simulationScenario.list',
    httpMethod: 'get',
    httpPath: '/v1/simulation/scenario',
  },
  {
    clientCallName: 'client.simulationScenario.delete',
    fullyQualifiedName: 'simulationScenario.delete',
    httpMethod: 'delete',
    httpPath: '/v1/simulation/scenario/{scenarioId}',
  },
  {
    clientCallName: 'client.simulationScenario.getByID',
    fullyQualifiedName: 'simulationScenario.getByID',
    httpMethod: 'get',
    httpPath: '/v1/simulation/scenario/{scenarioId}',
  },
  {
    clientCallName: 'client.simulationPersona.create',
    fullyQualifiedName: 'simulationPersona.create',
    httpMethod: 'post',
    httpPath: '/v1/persona',
  },
  {
    clientCallName: 'client.simulationPersona.update',
    fullyQualifiedName: 'simulationPersona.update',
    httpMethod: 'put',
    httpPath: '/v1/persona/{personaId}',
  },
  {
    clientCallName: 'client.simulationPersona.list',
    fullyQualifiedName: 'simulationPersona.list',
    httpMethod: 'get',
    httpPath: '/v1/persona',
  },
  {
    clientCallName: 'client.simulationPersona.getByID',
    fullyQualifiedName: 'simulationPersona.getByID',
    httpMethod: 'get',
    httpPath: '/v1/persona/{personaId}',
  },
  {
    clientCallName: 'client.agent.create',
    fullyQualifiedName: 'agent.create',
    httpMethod: 'post',
    httpPath: '/v1/agent',
  },
  {
    clientCallName: 'client.agent.update',
    fullyQualifiedName: 'agent.update',
    httpMethod: 'put',
    httpPath: '/v1/agent/{agentId}',
  },
  {
    clientCallName: 'client.agent.list',
    fullyQualifiedName: 'agent.list',
    httpMethod: 'get',
    httpPath: '/v1/agent',
  },
  {
    clientCallName: 'client.agent.getByID',
    fullyQualifiedName: 'agent.getByID',
    httpMethod: 'get',
    httpPath: '/v1/agent/{agentId}',
  },
  {
    clientCallName: 'client.agentEndpoint.create',
    fullyQualifiedName: 'agentEndpoint.create',
    httpMethod: 'post',
    httpPath: '/v1/agent/endpoint',
  },
  {
    clientCallName: 'client.agentEndpoint.update',
    fullyQualifiedName: 'agentEndpoint.update',
    httpMethod: 'put',
    httpPath: '/v1/agent/endpoint/{endpointId}',
  },
  {
    clientCallName: 'client.agentEndpoint.list',
    fullyQualifiedName: 'agentEndpoint.list',
    httpMethod: 'get',
    httpPath: '/v1/agent/endpoint',
  },
  {
    clientCallName: 'client.agentEndpoint.getByID',
    fullyQualifiedName: 'agentEndpoint.getByID',
    httpMethod: 'get',
    httpPath: '/v1/agent/endpoint/{endpointId}',
  },
  {
    clientCallName: 'client.httpRequestDefinition.create',
    fullyQualifiedName: 'httpRequestDefinition.create',
    httpMethod: 'post',
    httpPath: '/v1/http-request-definition',
  },
  {
    clientCallName: 'client.httpRequestDefinition.update',
    fullyQualifiedName: 'httpRequestDefinition.update',
    httpMethod: 'put',
    httpPath: '/v1/http-request-definition/{definitionId}',
  },
  {
    clientCallName: 'client.httpRequestDefinition.list',
    fullyQualifiedName: 'httpRequestDefinition.list',
    httpMethod: 'get',
    httpPath: '/v1/http-request-definition',
  },
  {
    clientCallName: 'client.httpRequestDefinition.getByID',
    fullyQualifiedName: 'httpRequestDefinition.getByID',
    httpMethod: 'get',
    httpPath: '/v1/http-request-definition/{definitionId}',
  },
  {
    clientCallName: 'client.webhook.create',
    fullyQualifiedName: 'webhook.create',
    httpMethod: 'post',
    httpPath: '/v1/webhook',
  },
  {
    clientCallName: 'client.webhook.list',
    fullyQualifiedName: 'webhook.list',
    httpMethod: 'get',
    httpPath: '/v1/webhook',
  },
  {
    clientCallName: 'client.webhook.delete',
    fullyQualifiedName: 'webhook.delete',
    httpMethod: 'delete',
    httpPath: '/v1/webhook/{webhookId}',
  },
  {
    clientCallName: 'client.webhook.getByID',
    fullyQualifiedName: 'webhook.getByID',
    httpMethod: 'get',
    httpPath: '/v1/webhook/{webhookId}',
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
