#!/usr/bin/env node

import { run } from './index';

// Set rather than passed to `process.exit`, so buffered stdout is flushed before
// the process ends. `process.exit` truncates output on a piped stdout.
run()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((error: unknown) => {
    process.stderr.write(`roark: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
