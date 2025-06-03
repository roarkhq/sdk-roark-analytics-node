# Health

Types:

- <code><a href="./src/resources/health.ts">HealthGetResponse</a></code>

Methods:

- <code title="get /health">client.health.<a href="./src/resources/health.ts">get</a>() -> HealthGetResponse</code>

# Evaluations

Types:

- <code><a href="./src/resources/evaluations.ts">EvaluationCreateResponse</a></code>
- <code><a href="./src/resources/evaluations.ts">EvaluationRetrieveResponse</a></code>
- <code><a href="./src/resources/evaluations.ts">EvaluationGetRunsResponse</a></code>

Methods:

- <code title="post /v1/evaluations">client.evaluations.<a href="./src/resources/evaluations.ts">create</a>({ ...params }) -> EvaluationCreateResponse</code>
- <code title="get /v1/evaluations/{jobId}">client.evaluations.<a href="./src/resources/evaluations.ts">retrieve</a>(jobId) -> unknown</code>
- <code title="get /v1/evaluations/{jobId}/runs">client.evaluations.<a href="./src/resources/evaluations.ts">getRuns</a>(jobId, { ...params }) -> unknown</code>
