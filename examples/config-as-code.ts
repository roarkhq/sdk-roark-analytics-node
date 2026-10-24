#!/usr/bin/env -S npm run tsn -T
// Code-first config authoring: define an agent + its tools in TypeScript and
// ship them, instead of hand-writing config YAML.
//
//   $ chmod +x examples/config-as-code.ts
//   $ ROARK_BEARER_TOKEN=... pnpm tsn -T examples/config-as-code.ts

import Roark from '@roarkanalytics/sdk';
import { defineAgent, defineConfig, defineTool } from '@roarkanalytics/sdk/lib/config';

const client = new Roark();

// Define the agent once. Tools reference it by the construct, not a magic string,
// so a typo is a type error. Prompts are plain strings here: write one inline, or
// `readFileSync('./prompts/front-desk.md', 'utf8')` — no `file://` sentinel.
const frontDesk = defineAgent({
  name: 'front-desk',
  displayName: 'Front Desk',
  description: 'Books appointments and answers insurance questions',
  prompt: 'You are the front desk at Acme Clinic. Greet the caller warmly and keep answers concise.',
  endpoints: [{ value: '+14155550142', type: 'PHONE', direction: 'INCOMING' }],
});

const bookAppointment = defineTool({
  name: 'book-appointment',
  agent: frontDesk, // typed reference → resolved to the agent's name on build
  description: 'Book a slot in the scheduling system',
  parameters: { date: 'string', time: 'string', patientId: 'string' },
  invocationCriteria: 'Call once the caller confirms a specific date and time.',
  expectedResult: 'A confirmation id and the booked time.',
});

const config = defineConfig({ resources: [frontDesk, bookAppointment] });

async function main() {
  // Preview the changes first (no writes), then apply.
  const diff = await client.config.diff(config);
  console.log('Planned changes:', diff.data.summary);

  const applied = await client.config.apply(config);
  console.log('Applied:', applied.data.summary);
}

main();
