import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import * as Api from '../api/commits';
import {
  commitsFetchedSucceded,
  commitsFetchFailed,
  COMMITS_FETCH_REQUESTED,
} from '../store/commits';
import {
  notificationsAddNotification,
} from '../store/notifications';

export function* fetchCommits() {
  try {
    const commits = yield call(Api.fetchCommits);
    yield put(commitsFetchedSucceded(commits));
    yield put(notificationsAddNotification({
      type: 'success',
      message: 'Get your ☂ it\'s raining commits!',
    }));
  } catch ({ message }) {
    yield put(commitsFetchFailed(message));
    yield put(notificationsAddNotification({
      type: 'error',
      message,
    }));
  }
}

export function* watchFetchCommits() {
  yield takeEvery(COMMITS_FETCH_REQUESTED, fetchCommits);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchCommits),
  ]);
}
