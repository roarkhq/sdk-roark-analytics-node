# Health

Types:

- <code><a href="./src/resources/health.ts">HealthGetResponse</a></code>

Methods:

- <code title="get /health">client.health.<a href="./src/resources/health.ts">get</a>() -> HealthGetResponse</code>

# Evaluation

Types:

- <code><a href="./src/resources/evaluation.ts">EvaluationCreateJobResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationGetJobResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationGetJobRunsResponse</a></code>

Methods:

- <code title="post /v1/evaluation/job">client.evaluation.<a href="./src/resources/evaluation.ts">createJob</a>({ ...params }) -> EvaluationCreateJobResponse</code>
- <code title="get /v1/evaluation/job/{jobId}">client.evaluation.<a href="./src/resources/evaluation.ts">getJob</a>(jobId) -> unknown</code>
- <code title="get /v1/evaluation/job/{jobId}/runs">client.evaluation.<a href="./src/resources/evaluation.ts">getJobRuns</a>(jobId, { ...params }) -> unknown</code>

# Call

# Integrations
