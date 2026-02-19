# Health

Types:

- <code><a href="./src/resources/health.ts">HealthGetResponse</a></code>

Methods:

- <code title="get /health">client.health.<a href="./src/resources/health.ts">get</a>() -> HealthGetResponse</code>

# Evaluation

Types:

- <code><a href="./src/resources/evaluation.ts">EvaluationCreateEvaluatorResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationCreateJobResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationGetEvaluatorByIDResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationGetJobResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationListEvaluatorsResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationListJobRunsResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationUpdateEvaluatorResponse</a></code>

Methods:

- <code title="post /v1/evaluation/evaluators">client.evaluation.<a href="./src/resources/evaluation.ts">createEvaluator</a>({ ...params }) -> EvaluationCreateEvaluatorResponse</code>
- <code title="post /v1/evaluation/job">client.evaluation.<a href="./src/resources/evaluation.ts">createJob</a>({ ...params }) -> EvaluationCreateJobResponse</code>
- <code title="get /v1/evaluation/evaluators/{evaluatorId}">client.evaluation.<a href="./src/resources/evaluation.ts">getEvaluatorByID</a>(evaluatorID) -> EvaluationGetEvaluatorByIDResponse</code>
- <code title="get /v1/evaluation/job/{jobId}">client.evaluation.<a href="./src/resources/evaluation.ts">getJob</a>(jobID) -> EvaluationGetJobResponse</code>
- <code title="get /v1/evaluation/evaluators">client.evaluation.<a href="./src/resources/evaluation.ts">listEvaluators</a>({ ...params }) -> EvaluationListEvaluatorsResponse</code>
- <code title="get /v1/evaluation/job/{jobId}/runs">client.evaluation.<a href="./src/resources/evaluation.ts">listJobRuns</a>(jobID, { ...params }) -> EvaluationListJobRunsResponse</code>
- <code title="put /v1/evaluation/evaluators/{evaluatorId}">client.evaluation.<a href="./src/resources/evaluation.ts">updateEvaluator</a>(evaluatorID, { ...params }) -> EvaluationUpdateEvaluatorResponse</code>

# Call

Types:

- <code><a href="./src/resources/call.ts">CallCreateResponse</a></code>
- <code><a href="./src/resources/call.ts">CallListResponse</a></code>
- <code><a href="./src/resources/call.ts">CallGetByIDResponse</a></code>
- <code><a href="./src/resources/call.ts">CallGetTranscriptResponse</a></code>
- <code><a href="./src/resources/call.ts">CallListEvaluationRunsResponse</a></code>
- <code><a href="./src/resources/call.ts">CallListMetricsResponse</a></code>
- <code><a href="./src/resources/call.ts">CallListSentimentRunsResponse</a></code>

Methods:

- <code title="post /v1/call">client.call.<a href="./src/resources/call.ts">create</a>({ ...params }) -> CallCreateResponse</code>
- <code title="get /v1/call">client.call.<a href="./src/resources/call.ts">list</a>({ ...params }) -> CallListResponse</code>
- <code title="get /v1/call/{callId}">client.call.<a href="./src/resources/call.ts">getByID</a>(callID) -> CallGetByIDResponse</code>
- <code title="get /v1/call/{callId}/transcript">client.call.<a href="./src/resources/call.ts">getTranscript</a>(callID, { ...params }) -> CallGetTranscriptResponse</code>
- <code title="get /v1/call/{callId}/evaluation-run">client.call.<a href="./src/resources/call.ts">listEvaluationRuns</a>(callID) -> CallListEvaluationRunsResponse</code>
- <code title="get /v1/call/{callId}/metrics">client.call.<a href="./src/resources/call.ts">listMetrics</a>(callID, { ...params }) -> CallListMetricsResponse</code>
- <code title="get /v1/call/{callId}/sentiment-run">client.call.<a href="./src/resources/call.ts">listSentimentRuns</a>(callID) -> CallListSentimentRunsResponse</code>

# Metric

Types:

- <code><a href="./src/resources/metric.ts">MetricListDefinitionsResponse</a></code>

Methods:

- <code title="get /v1/metric/definitions">client.metric.<a href="./src/resources/metric.ts">listDefinitions</a>() -> MetricListDefinitionsResponse</code>

# Integrations

Types:

- <code><a href="./src/resources/integrations.ts">IntegrationCreateRetellCallResponse</a></code>
- <code><a href="./src/resources/integrations.ts">IntegrationCreateVapiCallResponse</a></code>

Methods:

- <code title="post /v1/retell/call">client.integrations.<a href="./src/resources/integrations.ts">createRetellCall</a>({ ...params }) -> IntegrationCreateRetellCallResponse</code>
- <code title="post /v1/vapi/call">client.integrations.<a href="./src/resources/integrations.ts">createVapiCall</a>({ ...params }) -> IntegrationCreateVapiCallResponse</code>

# SimulationJob

Types:

- <code><a href="./src/resources/simulation-job.ts">SimulationJobGetByIDResponse</a></code>
- <code><a href="./src/resources/simulation-job.ts">SimulationJobLookupResponse</a></code>

Methods:

- <code title="get /v1/simulation/job/{jobId}">client.simulationJob.<a href="./src/resources/simulation-job.ts">getByID</a>(jobID) -> SimulationJobGetByIDResponse</code>
- <code title="get /v1/simulation/job/lookup">client.simulationJob.<a href="./src/resources/simulation-job.ts">lookup</a>({ ...params }) -> SimulationJobLookupResponse</code>

# SimulationRunPlan

Types:

- <code><a href="./src/resources/simulation-run-plan.ts">SimulationRunPlanCreateResponse</a></code>
- <code><a href="./src/resources/simulation-run-plan.ts">SimulationRunPlanUpdateResponse</a></code>
- <code><a href="./src/resources/simulation-run-plan.ts">SimulationRunPlanListResponse</a></code>
- <code><a href="./src/resources/simulation-run-plan.ts">SimulationRunPlanDeleteResponse</a></code>
- <code><a href="./src/resources/simulation-run-plan.ts">SimulationRunPlanGetByIDResponse</a></code>

Methods:

- <code title="post /v1/simulation/plan">client.simulationRunPlan.<a href="./src/resources/simulation-run-plan.ts">create</a>({ ...params }) -> SimulationRunPlanCreateResponse</code>
- <code title="put /v1/simulation/plan/{planId}">client.simulationRunPlan.<a href="./src/resources/simulation-run-plan.ts">update</a>(planID, { ...params }) -> SimulationRunPlanUpdateResponse</code>
- <code title="get /v1/simulation/plan">client.simulationRunPlan.<a href="./src/resources/simulation-run-plan.ts">list</a>({ ...params }) -> SimulationRunPlanListResponse</code>
- <code title="delete /v1/simulation/plan/{planId}">client.simulationRunPlan.<a href="./src/resources/simulation-run-plan.ts">delete</a>(planID) -> SimulationRunPlanDeleteResponse</code>
- <code title="get /v1/simulation/plan/{planId}">client.simulationRunPlan.<a href="./src/resources/simulation-run-plan.ts">getByID</a>(planID) -> SimulationRunPlanGetByIDResponse</code>

# SimulationRunPlanJob

Types:

- <code><a href="./src/resources/simulation-run-plan-job.ts">SimulationRunPlanJobListResponse</a></code>
- <code><a href="./src/resources/simulation-run-plan-job.ts">SimulationRunPlanJobGetByIDResponse</a></code>
- <code><a href="./src/resources/simulation-run-plan-job.ts">SimulationRunPlanJobStartResponse</a></code>

Methods:

- <code title="get /v1/simulation/plan/jobs">client.simulationRunPlanJob.<a href="./src/resources/simulation-run-plan-job.ts">list</a>({ ...params }) -> SimulationRunPlanJobListResponse</code>
- <code title="get /v1/simulation/plan/job/{jobId}">client.simulationRunPlanJob.<a href="./src/resources/simulation-run-plan-job.ts">getByID</a>(jobID) -> SimulationRunPlanJobGetByIDResponse</code>
- <code title="post /v1/simulation/plan/{planId}/job">client.simulationRunPlanJob.<a href="./src/resources/simulation-run-plan-job.ts">start</a>(planID) -> SimulationRunPlanJobStartResponse</code>

# SimulationScenario

Types:

- <code><a href="./src/resources/simulation-scenario.ts">SimulationScenarioCreateResponse</a></code>
- <code><a href="./src/resources/simulation-scenario.ts">SimulationScenarioUpdateResponse</a></code>
- <code><a href="./src/resources/simulation-scenario.ts">SimulationScenarioListResponse</a></code>
- <code><a href="./src/resources/simulation-scenario.ts">SimulationScenarioDeleteResponse</a></code>
- <code><a href="./src/resources/simulation-scenario.ts">SimulationScenarioGetByIDResponse</a></code>

Methods:

- <code title="post /v1/simulation/scenario">client.simulationScenario.<a href="./src/resources/simulation-scenario.ts">create</a>({ ...params }) -> SimulationScenarioCreateResponse</code>
- <code title="put /v1/simulation/scenario/{scenarioId}">client.simulationScenario.<a href="./src/resources/simulation-scenario.ts">update</a>(scenarioID, { ...params }) -> SimulationScenarioUpdateResponse</code>
- <code title="get /v1/simulation/scenario">client.simulationScenario.<a href="./src/resources/simulation-scenario.ts">list</a>({ ...params }) -> SimulationScenarioListResponse</code>
- <code title="delete /v1/simulation/scenario/{scenarioId}">client.simulationScenario.<a href="./src/resources/simulation-scenario.ts">delete</a>(scenarioID) -> SimulationScenarioDeleteResponse</code>
- <code title="get /v1/simulation/scenario/{scenarioId}">client.simulationScenario.<a href="./src/resources/simulation-scenario.ts">getByID</a>(scenarioID) -> SimulationScenarioGetByIDResponse</code>

# SimulationPersona

Types:

- <code><a href="./src/resources/simulation-persona.ts">SimulationPersonaCreateResponse</a></code>
- <code><a href="./src/resources/simulation-persona.ts">SimulationPersonaUpdateResponse</a></code>
- <code><a href="./src/resources/simulation-persona.ts">SimulationPersonaListResponse</a></code>
- <code><a href="./src/resources/simulation-persona.ts">SimulationPersonaGetByIDResponse</a></code>

Methods:

- <code title="post /v1/persona">client.simulationPersona.<a href="./src/resources/simulation-persona.ts">create</a>({ ...params }) -> SimulationPersonaCreateResponse</code>
- <code title="put /v1/persona/{personaId}">client.simulationPersona.<a href="./src/resources/simulation-persona.ts">update</a>(personaID, { ...params }) -> SimulationPersonaUpdateResponse</code>
- <code title="get /v1/persona">client.simulationPersona.<a href="./src/resources/simulation-persona.ts">list</a>({ ...params }) -> SimulationPersonaListResponse</code>
- <code title="get /v1/persona/{personaId}">client.simulationPersona.<a href="./src/resources/simulation-persona.ts">getByID</a>(personaID) -> SimulationPersonaGetByIDResponse</code>

# Agent

Types:

- <code><a href="./src/resources/agent.ts">AgentCreateResponse</a></code>
- <code><a href="./src/resources/agent.ts">AgentUpdateResponse</a></code>
- <code><a href="./src/resources/agent.ts">AgentListResponse</a></code>
- <code><a href="./src/resources/agent.ts">AgentGetByIDResponse</a></code>

Methods:

- <code title="post /v1/agent">client.agent.<a href="./src/resources/agent.ts">create</a>({ ...params }) -> AgentCreateResponse</code>
- <code title="put /v1/agent/{agentId}">client.agent.<a href="./src/resources/agent.ts">update</a>(agentID, { ...params }) -> AgentUpdateResponse</code>
- <code title="get /v1/agent">client.agent.<a href="./src/resources/agent.ts">list</a>({ ...params }) -> AgentListResponse</code>
- <code title="get /v1/agent/{agentId}">client.agent.<a href="./src/resources/agent.ts">getByID</a>(agentID) -> AgentGetByIDResponse</code>

# AgentEndpoint

Types:

- <code><a href="./src/resources/agent-endpoint.ts">AgentEndpointCreateResponse</a></code>
- <code><a href="./src/resources/agent-endpoint.ts">AgentEndpointUpdateResponse</a></code>
- <code><a href="./src/resources/agent-endpoint.ts">AgentEndpointListResponse</a></code>
- <code><a href="./src/resources/agent-endpoint.ts">AgentEndpointGetByIDResponse</a></code>

Methods:

- <code title="post /v1/agent/endpoint">client.agentEndpoint.<a href="./src/resources/agent-endpoint.ts">create</a>({ ...params }) -> AgentEndpointCreateResponse</code>
- <code title="put /v1/agent/endpoint/{endpointId}">client.agentEndpoint.<a href="./src/resources/agent-endpoint.ts">update</a>(endpointID, { ...params }) -> AgentEndpointUpdateResponse</code>
- <code title="get /v1/agent/endpoint">client.agentEndpoint.<a href="./src/resources/agent-endpoint.ts">list</a>({ ...params }) -> AgentEndpointListResponse</code>
- <code title="get /v1/agent/endpoint/{endpointId}">client.agentEndpoint.<a href="./src/resources/agent-endpoint.ts">getByID</a>(endpointID) -> AgentEndpointGetByIDResponse</code>

# HTTPRequestDefinition

Types:

- <code><a href="./src/resources/http-request-definition.ts">HTTPRequestDefinitionCreateResponse</a></code>
- <code><a href="./src/resources/http-request-definition.ts">HTTPRequestDefinitionUpdateResponse</a></code>
- <code><a href="./src/resources/http-request-definition.ts">HTTPRequestDefinitionListResponse</a></code>
- <code><a href="./src/resources/http-request-definition.ts">HTTPRequestDefinitionGetByIDResponse</a></code>

Methods:

- <code title="post /v1/http-request-definition">client.httpRequestDefinition.<a href="./src/resources/http-request-definition.ts">create</a>({ ...params }) -> HTTPRequestDefinitionCreateResponse</code>
- <code title="put /v1/http-request-definition/{definitionId}">client.httpRequestDefinition.<a href="./src/resources/http-request-definition.ts">update</a>(definitionID, { ...params }) -> HTTPRequestDefinitionUpdateResponse</code>
- <code title="get /v1/http-request-definition">client.httpRequestDefinition.<a href="./src/resources/http-request-definition.ts">list</a>({ ...params }) -> HTTPRequestDefinitionListResponse</code>
- <code title="get /v1/http-request-definition/{definitionId}">client.httpRequestDefinition.<a href="./src/resources/http-request-definition.ts">getByID</a>(definitionID) -> HTTPRequestDefinitionGetByIDResponse</code>

# Webhook

Types:

- <code><a href="./src/resources/webhook.ts">WebhookCreateResponse</a></code>
- <code><a href="./src/resources/webhook.ts">WebhookListResponse</a></code>
- <code><a href="./src/resources/webhook.ts">WebhookDeleteResponse</a></code>
- <code><a href="./src/resources/webhook.ts">WebhookGetByIDResponse</a></code>

Methods:

- <code title="post /v1/webhook">client.webhook.<a href="./src/resources/webhook.ts">create</a>({ ...params }) -> WebhookCreateResponse</code>
- <code title="get /v1/webhook">client.webhook.<a href="./src/resources/webhook.ts">list</a>({ ...params }) -> WebhookListResponse</code>
- <code title="delete /v1/webhook/{webhookId}">client.webhook.<a href="./src/resources/webhook.ts">delete</a>(webhookID) -> WebhookDeleteResponse</code>
- <code title="get /v1/webhook/{webhookId}">client.webhook.<a href="./src/resources/webhook.ts">getByID</a>(webhookID) -> WebhookGetByIDResponse</code>
