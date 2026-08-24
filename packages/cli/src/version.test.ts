import { version } from './version';

/**
 * `roark --version` shipped 2.31.0 out of a 0.1.0 package, because
 * `src/version.ts` was maintained by hand and the bump missed it. The build now
 * syncs the two, and this fails if that ever stops happening.
 */
describe('version', () => {
  it('matches the version this package publishes', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { version: published } = require('../package.json');
    expect(version).toBe(published);
  });
});
