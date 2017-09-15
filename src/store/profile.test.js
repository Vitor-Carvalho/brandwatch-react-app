import reducer, {
  profileChangePasswordFailed,
  profileFetchSucceeded,
  profileCloseChangePasswordDialog,
} from './profile';

export const profile = {
  email: 'a@b.co',
  name: 'Ace',
  imageUrl: 'http://a.png',
};

describe('profile', () => {
  test('receiving the profile', () => {
    expect(reducer(null, profileFetchSucceeded(profile)))
      .toEqual({
        email: profile.email,
        name: profile.name,
        imageUrl: profile.imageUrl,
      });
  });

  test('failed to change password', () => {
    expect(reducer(null, profileChangePasswordFailed({ message: 'Error!' })))
      .toEqual({
        changePasswordError: 'Error!',
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
