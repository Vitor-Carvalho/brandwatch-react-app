import { call, put, select, takeEvery } from 'redux-saga/effects';
import { apiChangePassword } from '../api/brandwatch';
import {
  PROFILE_CHANGE_PASSWORD_REQUESTED,
  emailSelector,
  profileChangePasswordFailed,
  profileChangePasswordSucceeded,
  profileCloseChangePasswordDialog,
} from '../store/profile';
import { notificationsAddNotification } from '../store/notifications';

export function* watchChangePassword() {
  yield takeEvery(PROFILE_CHANGE_PASSWORD_REQUESTED, changePassword);
}

export function* changePassword({ payload }) {
  try {
    const { currentPassword, newPassword } = payload;
    const username = yield select(emailSelector);
    yield call(apiChangePassword, username, currentPassword, newPassword);
    yield put(profileChangePasswordSucceeded());
    yield put(profileCloseChangePasswordDialog());
    yield put(notificationsAddNotification({
      type: 'success',
      message: 'successful-password-change',
    }));
  } catch ({ message }) {
    yield put(profileChangePasswordFailed({ message }));
  }
}
