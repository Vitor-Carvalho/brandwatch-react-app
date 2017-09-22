import createPath from '../createPath';
import { AxiomSelectors, ReactAppSelectors } from '../selectors';

/**
 * Temporary selector hack.
 * https://github.com/BrandwatchLtd/vizia-platform-auth/pull/56
 */

AxiomSelectors.Login.username = 'input[type="text"]';
AxiomSelectors.Login.password = 'input[type="password"]';
AxiomSelectors.Login.submit = 'button[type="submit"]';

export default (runner) => runner
  .goto(createPath(`?q=${ new Date().getTime() }`))
  .insert(AxiomSelectors.Login.username, process.env.AT_LOGIN_USERNAME)
  .insert(AxiomSelectors.Login.password, process.env.AT_LOGIN_PASSWORD)
  .click(AxiomSelectors.Login.submit)
  .wait(ReactAppSelectors.App.root);
