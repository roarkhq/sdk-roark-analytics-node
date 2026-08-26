---
name: roark-cli
description: 'Command line interface for the Roark Analytics API, published as @roarkanalytics/cli. Use when calling the API from a shell, a script or a CI job: installing it, authenticating, and invoking operations.'
---

# roark CLI

Generated CLI for the Roark Analytics API. Prefer it over hand-written `curl`: it handles
authentication, retries and error reporting, and its command names are checked against
the spec.

## Install

```sh
npm install -g @roarkanalytics/cli
```

## Authenticate

Set `ROARK_API_BEARER_TOKEN`, or run `roark auth login`. Never pass a token
as a flag in a script: it lands in shell history and in the process table.

## Shape of a command

```sh
roark <resource> [<sub-resource>...] <verb> [<id>...] [--flags]
```

Verbs are `list`, `get`, `create`, `update`, `delete`, plus a few genuinely different
operations (`run`, `start`, `lookup`, `promote`, `replace`). There is no `post`,
`put` or `retrieve`. Identifiers are positional; everything else is a flag.

## Rules

- Output is JSON on stdout and errors are on stderr. Pipe to `jq` freely.
- Exit codes: 0 ok, 1 API error, 2 usage, 3 auth, 4 not found, 5 connection.
- `delete` prompts unless `--yes` is given; always pass `--yes` in a script.
- A whole request body can be given with `--data @file.json` or on stdin, and
  individual flags override what it contains.
- Do not guess command names or flags. They are listed below; anything not listed
  is reachable through `roark api <method> <path>`.

## Commands

- `roark agent create --name <value>` - Create a new agent
- `roark agent endpoint create --agent-id <value> --value <value> --direction <value>` - Create a new agent endpoint
- `roark agent endpoint get <endpoint-id>` - Get agent endpoint by ID
- `roark agent endpoint list` - List agent endpoints
- `roark agent endpoint update <endpoint-id>` - Update an agent endpoint
- `roark agent get <agent-id>` - Get agent by ID
- `roark agent list` - List agents
- `roark agent update <agent-id>` - Update an agent
- `roark call create --recording-url <value> --started-at <value> --interface-type <value> --call-direction <value> --customer.phone-number-e164 <value>` - Create a call
- `roark call get <call-id>` - Get a call by ID
- `roark call list` - List calls
- `roark call metric list <call-id>` - List call metrics
- `roark call sentiment-run list <call-id>` - List call sentiment runs
- `roark call transcript get <call-id>` - Get call transcript
- `roark config apply [dir]` - Reconcile the project to a config directory (or bundle). Previews and confirms first.
- `roark config diff [dir]` - Preview the changes a config directory (or bundle) would make. No writes.
- `roark customer-flow create --data '{...}'` - Create a customer flow
- `roark customer-flow delete <flow-id>` - Delete a customer flow
- `roark customer-flow edge-case create <flow-id> --title <value>` - Add an edge case
- `roark customer-flow edge-case delete <flow-id> <edge-case-id>` - Remove an edge case
- `roark customer-flow edge-case promote <flow-id> <edge-case-id>` - Promote an edge case to the happy path
- `roark customer-flow edge-case update <flow-id> <edge-case-id>` - Update an edge case
- `roark customer-flow get <flow-id>` - Get customer flow by ID
- `roark customer-flow graph replace <flow-id> --graph <value>` - Replace a scripted flow's steps
- `roark customer-flow happy-path update <flow-id>` - Update a flow's happy path
- `roark customer-flow list` - List customer flows
- `roark customer-flow update <flow-id>` - Update a customer flow
- `roark health` - Get API health status
- `roark http-request-definition create --scope <value> --url <value>` - Create HTTP request definition
- `roark http-request-definition get <definition-id>` - Get HTTP request definition by ID
- `roark http-request-definition list` - List HTTP request definitions
- `roark http-request-definition update <definition-id>` - Update HTTP request definition
- `roark metric collection-job create --metrics <value>` - Create and run a metric collection job
- `roark metric collection-job get <job-id>` - Get metric collection job by ID
- `roark metric collection-job list` - List metric collection jobs
- `roark metric definition create --data '{...}'` - Create custom metric definition
- `roark metric definition list` - List metric definitions
- `roark metric policy create --name <value> --modality <value> --metrics <value>` - Create a metric policy
- `roark metric policy delete <policy-id>` - Delete a metric policy
- `roark metric policy get <policy-id>` - Get metric policy by ID
- `roark metric policy list` - List metric policies
- `roark metric policy update <policy-id>` - Update a metric policy
- `roark simulation environment get <environment-id>` - Get environment by ID
- `roark simulation environment list` - List environments
- `roark simulation job get <job-id>` - Get simulation by ID
- `roark simulation job lookup --roark-phone-number <value>` - Lookup by phone number
- `roark simulation persona create --name <value> --language <value> --accent <value> --gender <value>` - Create a new persona
- `roark simulation persona get <persona-id>` - Get persona by ID
- `roark simulation persona list` - List personas
- `roark simulation persona update <persona-id>` - Update a persona
- `roark simulation plan create --name <value> --direction <value> --max-simulation-duration-seconds <value> --agent-endpoints <value> --metrics <value>` - Create a run plan
- `roark simulation plan delete <plan-id>` - Delete a run plan
- `roark simulation plan get <plan-id>` - Get run plan by ID
- `roark simulation plan job get <job-id>` - Get simulation plan job
- `roark simulation plan job list` - List simulation plan jobs
- `roark simulation plan job start <plan-id>` - Run a simulation plan
- `roark simulation plan list` - List run plans
- `roark simulation plan update <plan-id>` - Update a run plan
- `roark simulation run --data '{...}'` - Run a simulation
- `roark webhook create --url <value> --events <value>` - Create webhook
- `roark webhook delete <webhook-id>` - Delete webhook
- `roark webhook get <webhook-id>` - Get webhook by ID
- `roark webhook list` - List webhooks

## Optional flags

Run `roark <command> --help` for the full flag list of any command, including
types, allowed values and which are repeatable.
