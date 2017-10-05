import createRunner from '../createRunner';
import createPath from '../createPath';
import { AxiomSelectors, ReactAppSelectors } from '../selectors';
import whenLoggedIn from '../fixtures/whenLoggedIn';

const incorrectCurrentPassword = 'Automation10!';
const newPassword = 'Brandwatch10!';
const invalidPassword = 'Brandwatch';

describe('Changing Password', () => {

  let runner;

  beforeEach(() => {
    runner = whenLoggedIn(createRunner())
      .goto(createPath())
      .wait(AxiomSelectors.UserMenu.activate)
      .click(AxiomSelectors.UserMenu.activate)
      .click(ReactAppSelectors.UserMenu.changePassword)
  });

  test('current password is incorrect', () =>
    runner
      .insert(AxiomSelectors.ChangePassword.currentPassword, incorrectCurrentPassword)
      .insert(AxiomSelectors.ChangePassword.newPassword, newPassword)
      .insert(AxiomSelectors.ChangePassword.confirmPassword, newPassword)
      .click(AxiomSelectors.ChangePassword.submit)
      .wait(AxiomSelectors.ChangePassword.error)
      .exists(AxiomSelectors.ChangePassword.error)
      .end()
      .then(exists => expect(exists).toBe(true))
  );

  test('new password is same as the old password', () =>
    runner
      .insert(AxiomSelectors.ChangePassword.currentPassword, process.env.AT_LOGIN_PASSWORD)
      .insert(AxiomSelectors.ChangePassword.newPassword, process.env.AT_LOGIN_PASSWORD)
      .insert(AxiomSelectors.ChangePassword.confirmPassword, process.env.AT_LOGIN_PASSWORD)
      .exists(`${ AxiomSelectors.ChangePassword.submit }[disabled]`)
      .end()
      .then(exists => expect(exists).toBe(true))
  );

  test('confirm password does not match new password', () =>
    runner
      .insert(AxiomSelectors.ChangePassword.currentPassword, process.env.AT_LOGIN_PASSWORD)
      .insert(AxiomSelectors.ChangePassword.newPassword, newPassword)
      .insert(AxiomSelectors.ChangePassword.confirmPassword, incorrectCurrentPassword)
      .exists(`${ AxiomSelectors.ChangePassword.submit }[disabled]`)
      .end()
      .then(exists => expect(exists).toBe(true))
  );

  test('invalid password is entered', () =>
    runner
      .insert(AxiomSelectors.ChangePassword.currentPassword, process.env.AT_LOGIN_PASSWORD)
      .insert(AxiomSelectors.ChangePassword.newPassword, invalidPassword)
      .insert(AxiomSelectors.ChangePassword.confirmPassword, invalidPassword)
      .exists(`${ AxiomSelectors.ChangePassword.submit }[disabled]`)
      .end()
      .then(exists => expect(exists).toBe(true))
  );

  test('form is entered correctly', () =>
    runner
      .insert(AxiomSelectors.ChangePassword.currentPassword, process.env.AT_LOGIN_PASSWORD)
      .insert(AxiomSelectors.ChangePassword.newPassword, newPassword)
      .insert(AxiomSelectors.ChangePassword.confirmPassword, newPassword)
      .exists(`${ AxiomSelectors.ChangePassword.submit }[disabled]`)
      .end()
      .then(exists => expect(exists).toBe(false))
  );
});
