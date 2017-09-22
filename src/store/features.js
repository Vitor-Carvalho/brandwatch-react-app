import { createAction, handleActions } from 'redux-actions';

export const FEATURES = {
  enableAccountAdministration: 'enable-account-administration',
};

export const FEATURES_INIT_REQUESTED = 'features initialized requested';
export const FEATURES_INIT_SUCCEEDED = 'features initialized succeeded';
export const FEATURES_CHANGED = 'features changed';

const initialState = {
  [FEATURES.enableAccountAdministration]: false,
};

export const featuresInitRequested = createAction(FEATURES_INIT_REQUESTED);
export const featuresInitSucceeded = createAction(FEATURES_INIT_SUCCEEDED);
export const featuresChanged = createAction(FEATURES_CHANGED, ({ features }) => features);

export default handleActions({
  [FEATURES_INIT_SUCCEEDED]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [FEATURES_CHANGED]: (state, { payload }) => ({
    ...state,
    ...Object.entries(payload).reduce((features, [key, { current }]) => ({
      ...features,
      [key]: current,
    }), {}),
  }),
}, initialState);
