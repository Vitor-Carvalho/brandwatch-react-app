import createRunner from '../createRunner';
import { /*AxiomSelectors,*/ ReactAppSelectors } from '../selectors';
import whenLoggedIn from '../fixtures/whenLoggedIn';

describe('Logging into ReactApp', () => {
  let runner;

  beforeEach(() => {
    runner = createRunner();
  });

/**
 * Waiting on
 * https://github.com/BrandwatchLtd/vizia-platform-auth/pull/56
 */

  // describe('without any credentials', () => {
  //   test('errors with a message', () =>
  //     runner
  //       .goto(createPath())
  //       .click(AxiomSelectors.Login.submit)
  //       .wait(AxiomSelectors.Login.error)
  //       .exists(AxiomSelectors.Login.error)
  //       .end()
  //       .then((exists) => expect(exists).toBe(true))
  //   );
  // });

  // describe('with incorrect credentials', () => {
  //   test('errors with a message', () =>
  //     runner
  //       .goto(createPath())
  //       .type(AxiomSelectors.Login.username, 'INCORRECT')
  //       .type(AxiomSelectors.Login.password, 'INCORRECT')
  //       .click(AxiomSelectors.Login.submit)
  //       .wait(AxiomSelectors.Login.error)
  //       .exists(AxiomSelectors.Login.error)
  //       .end()
  //       .then((exists) => expect(exists).toBe(true))
  //   );
  // });

  describe('with correct credentials', () => {
    test('submitting form', () =>
      whenLoggedIn(runner)
        .exists(ReactAppSelectors.App.root)
        .end()
        .then((exists) => expect(exists).toBe(true))
    );
  });
});
