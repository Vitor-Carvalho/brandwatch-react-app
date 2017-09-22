import launchDarklyClient from 'ldclient-js';
import { eventChannel } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import {
  FEATURES_INIT_REQUESTED,
  featuresChanged,
  featuresInitSucceeded,
} from '../store/features';

export const getInitialFeatures = (client) => new Promise((resolve) => {
  const getAllFeatures = () => {
    client.off('ready', getAllFeatures);
    resolve(client.allFlags());
  };

  client.on('ready', getAllFeatures);
});

export const createFeatureChannel = (client) => eventChannel((emit) => {
  const emitChanges = (features) => {
    emit({ features });
  };

  client.on('change', emitChanges);

  return () => client.off('change', emitChanges);
});

export function* watchInitialiseFeatures() {
  yield takeEvery(FEATURES_INIT_REQUESTED, intialiseLaunchDarkly);
}

export function* intialiseLaunchDarkly({ payload }) {
  const client = launchDarklyClient.initialize(process.env.LAUNCH_DARKLY_CLIENT_ID, { key: payload });
  const featureChannel = createFeatureChannel(client);

  yield put(featuresInitSucceeded(
    yield call(getInitialFeatures, client)
  ));

  while (true) {
    yield put(featuresChanged(
      yield take(featureChannel)
    ));
  }
}
