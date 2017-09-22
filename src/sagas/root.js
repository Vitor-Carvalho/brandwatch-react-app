import { all, fork } from 'redux-saga/effects';
import { watchInitialiseFeatures } from './features';
import { watchChangePassword } from './profile';

export default function* rootSaga() {
  yield all([
    fork(watchInitialiseFeatures),
    fork(watchChangePassword),
  ]);
}
