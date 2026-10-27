# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, Cursor, etc.) working in this repository.

## Generated code and hand-written code

Most of this SDK is generated from the Roark API's OpenAPI spec by
[`app-agent-codegen`](https://github.com/roarkhq/app-agent-codegen), which opens a PR here when the API
changes. Don't hand-edit generated files: the next generation overwrites them. Only `src/lib/` and
`examples/` are hand-written and never touched by codegen (see `CONTRIBUTING.md`).

## Config-as-code helpers (`src/lib/config.ts`)

The `define*` helpers (`defineAgent`, `defineMetric`, `defineScriptedFlow`, ...) are hand-written. Their
input types are derived from the generated `ConfigApplyParams`, so:

- **A new field on an existing resource type** reaches TypeScript on the next codegen with no change here.
- **A new resource type does not.** A new `kind`, or a new variant of an existing kind (a second
  `kind: metric` shape such as an API check with `calculationType: HTTP_REQUEST`, a second flow `type`),
  arrives in `ConfigApplyParams` as a new type that no helper accepts. YAML supports it, and `define*`
  doesn't type-check.

When a codegen PR adds a resource type to `ConfigApplyParams['resources']`, add in the same PR:

1. A friendly alias next to the others (`export type XConfig = ConfigApplyParams.XConfig;`).
2. A `define*` helper that fills in `kind` and every fixed discriminator (`type`, `template`,
   `calculationType`), following `defineScriptedFlow` and `defineQaSimulationPlan`.
3. The helper's return type in `DefinedResource` in `tests/lib/config.test.ts`, plus a test that it fills
   in its discriminators.

`tests/lib/config.test.ts` enforces this at type-check time: a resource type without a helper fails `tsc`
with an error naming the type, which turns the codegen PR red until the helper exists.
