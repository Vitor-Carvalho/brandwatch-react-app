import createRunner from '../createRunner';
import createPath from '../createPath';
import { ReactAppSelectors } from '../selectors';
import whenLoggedIn from '../fixtures/whenLoggedIn';

describe('Status 404', () => {
  test('redirecting to 404 page when an incorrect url is entered', () =>
    whenLoggedIn(createRunner())
      .goto(createPath('page-that-doesnt-exist'))
      .wait(ReactAppSelectors.Status404.oops)
      .exists(ReactAppSelectors.Status404.oops)
      .end()
      .then(exist => expect(exist).toBe(true))
  );
});
