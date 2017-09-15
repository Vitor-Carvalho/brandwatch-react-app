import sinon from 'sinon';
import uuid from 'uuid';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as Api from '../api/brandwatch';
import { notificationsAddNotification } from '../store/notifications';
import {
  PROFILE_CHANGE_PASSWORD_REQUESTED,
  profileChangePasswordFailed,
  profileCloseChangePasswordDialog,
  emailSelector,
} from '../store/profile';
import { changePassword, watchChangePassword } from './profile';

const email = 'test@brandwatch.com';
const currentPassword = 'currentPassw0rd!';
const newPassword = 'newPassw0rd?';
const notificationId = 1234;

describe('profile sagas', () => {
  const sandbox = sinon.sandbox.create();

  beforeEach(() => {
    sandbox.stub(uuid, 'v4').returns(notificationId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('changePassword', () => {
    test('it handles a successful api call', () => {
      const gen = changePassword({ payload: { currentPassword, newPassword } });

      expect(gen.next().value)
        .toEqual(select(emailSelector));

      expect(gen.next(email).value)
        .toEqual(call(Api.apiChangePassword, email, currentPassword, newPassword));

      expect(gen.next().value).toEqual(put(profileCloseChangePasswordDialog()));
      expect(gen.next().value).toEqual(put(notificationsAddNotification({
        type: 'success',
        message: 'Your password has been changed successfully 🔒',
      })));
    });

    test('it handles an unsuccessful api call', () => {
      const gen = changePassword({ payload: { currentPassword, newPassword } });
      const message = 'Error occurred changing password';

      expect(gen.next().value)
        .toEqual(select(emailSelector));

      expect(gen.next(email).value)
        .toEqual(call(Api.apiChangePassword, email, currentPassword, newPassword));

      expect(gen.throw({ message }).value)
        .toEqual(put(profileChangePasswordFailed({ message })));
    });
  });

  describe('watchChangePassword saga', () => {
    test('it takes every result of the changePassword saga', () => {
      const gen = watchChangePassword();
      expect(gen.next().value)
        .toEqual(takeEvery(PROFILE_CHANGE_PASSWORD_REQUESTED, changePassword));
    });
  });
});
