import reducer, {
  profileChangePasswordFailed,
  profileChangePasswordSucceeded,
  profileFetchSucceeded,
  profileCloseChangePasswordDialog,
} from './profile';

export const profile = {
  email: 'a@b.cd',
  firstName: 'Ace',
  imageUrl: 'http://a.png',
  lastName: 'Spades',
};

describe('profile', () => {
  test('receiving the profile', () => {
    expect(reducer(null, profileFetchSucceeded(profile)))
      .toEqual({
        email: profile.email,
        firstName: profile.firstName,
        imageUrl: profile.imageUrl,
        lastName: profile.lastName,
      });
  });

  test('failed to change password', () => {
    expect(reducer({ isSubmittingPassword: true }, profileChangePasswordFailed({ message: 'Error!' })))
      .toEqual({
        changePasswordError: 'Error!',
        isSubmittingPassword: false,
      });
  });

  test('successfully changed password', () => {
    expect(reducer({ isSubmittingPassword: true }, profileChangePasswordSucceeded()))
      .toEqual({
        isSubmittingPassword: false,
      });
  });

  test('when opening the change password dialog', () => {
    expect(reducer({ changePasswordError: 'Error!' }, profileCloseChangePasswordDialog()))
      .toEqual({
        changePasswordError: '',
        isChangePasswordDialogOpen: false,
      });
  });
});
