import { all, fork } from 'redux-saga/effects';
import {
  watchChangePassword,
} from './profile';

export default function* rootSaga() {
  yield all([
    fork(watchChangePassword),
  ]);
}
