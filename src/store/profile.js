import { createAction, handleActions } from 'redux-actions';

export const PROFILE_CHANGE_PASSWORD_REQUESTED = 'change password requested';
export const PROFILE_CHANGE_PASSWORD_FAILED = 'change password failed';
export const PROFILE_DATA_RETRIEVED = 'profile received';
export const PROFILE_OPEN_CHANGE_PASSWORD_DIALOG = 'ui open change password dialog';
export const PROFILE_CLOSE_CHANGE_PASSWORD_DIALOG = 'ui close change password dialog';

const initialState = {
  changePasswordError: '',
  email: null,
  id: null,
  isChangePasswordDialogOpen: false,
  name: null,
  imageUrl: null,
};

export const emailSelector = ({ profile }) => profile.email;

export const profileChangePasswordFailed = createAction(PROFILE_CHANGE_PASSWORD_FAILED);
export const profileChangePasswordRequested = createAction(PROFILE_CHANGE_PASSWORD_REQUESTED);
export const profileFetchSucceeded = createAction(
  PROFILE_DATA_RETRIEVED,
  ({ email, name, imageUrl, sub: id }) => ({
    email,
    id,
    name,
    imageUrl,
  }),
  () => ({ mixpanel: { eventName: 'App loaded' } })
);
export const profileOpenChangePasswordDialog = createAction(PROFILE_OPEN_CHANGE_PASSWORD_DIALOG);
export const profileCloseChangePasswordDialog = createAction(PROFILE_CLOSE_CHANGE_PASSWORD_DIALOG);

export default handleActions({
  [PROFILE_DATA_RETRIEVED]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [PROFILE_CHANGE_PASSWORD_FAILED]: (state, { payload }) => ({
    ...state,
    changePasswordError: payload.message,
  }),
  [PROFILE_CLOSE_CHANGE_PASSWORD_DIALOG]: (state) => ({
    ...state,
    changePasswordError: initialState.changePasswordError,
    isChangePasswordDialogOpen: false,
  }),
  [PROFILE_OPEN_CHANGE_PASSWORD_DIALOG]: (state) => ({
    ...state,
    isChangePasswordDialogOpen: true,
  }),
}, initialState);
