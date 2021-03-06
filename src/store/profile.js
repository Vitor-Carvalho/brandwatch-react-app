import { createAction, handleActions } from 'redux-actions';

export const PROFILE_CHANGE_PASSWORD_REQUESTED = 'change password requested';
export const PROFILE_CHANGE_PASSWORD_FAILED = 'change password failed';
export const PROFILE_CHANGE_PASSWORD_SUCCEEDED = 'change password succeeded';
export const PROFILE_DATA_RETRIEVED = 'profile received';
export const PROFILE_OPEN_CHANGE_PASSWORD_DIALOG = 'ui open change password dialog';
export const PROFILE_CLOSE_CHANGE_PASSWORD_DIALOG = 'ui close change password dialog';

const initialState = {
  changePasswordError: '',
  email: null,
  firstName: null,
  id: null,
  imageUrl: null,
  isChangePasswordDialogOpen: false,
  lastName: null,
};

export const emailSelector = ({ profile }) => profile.email;
export const productsSelector = ({ profile }) => profile.products;

export const profileChangePasswordFailed = createAction(PROFILE_CHANGE_PASSWORD_FAILED, null, () => ({ mixpanel: { eventName: 'Change password failed' } }));
export const profileChangePasswordRequested = createAction(PROFILE_CHANGE_PASSWORD_REQUESTED);
export const profileChangePasswordSucceeded = createAction(PROFILE_CHANGE_PASSWORD_SUCCEEDED, null, () => ({ mixpanel: { eventName: 'Change password succeeded' } }));
export const profileFetchSucceeded = createAction(
  PROFILE_DATA_RETRIEVED,
  ({ email, firstName, imageUrl, lastName, sub: id, modules }) => ({
    email,
    id,
    firstName,
    imageUrl,
    lastName,
    products: modules,
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
    isSubmittingPassword: false,
  }),
  [PROFILE_CHANGE_PASSWORD_REQUESTED]: (state) => ({
    ...state,
    isSubmittingPassword: true,
  }),
  [PROFILE_CHANGE_PASSWORD_SUCCEEDED]: (state) => ({
    ...state,
    isSubmittingPassword: false,
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
