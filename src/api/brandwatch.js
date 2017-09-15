import { tokenStore } from './';

class ApiRequestFailedError extends Error {
  constructor(message = '') {
    super(message);
    this.name = 'ApiRequestFailedError';
    this.message = message;
  }
}


export function callBrandwatchApi(method, url, body) {
  return tokenStore.getToken({ aud: process.env.AUTH_AUDIENCE }).then(token => {
    return fetch(`${process.env.BW_DOMAIN}/${url}`, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      method,
    })
    .then(response => {
      if (response.status !== 200 ) {
        return response.json().then(({ errors }) => {
          throw new ApiRequestFailedError(errors.map(({ message }) => message).join('. '));
        });
      }
    });
  });
}

export function apiChangePassword(username, oldPassword, newPassword) {
  return callBrandwatchApi('PUT', 'user/changePassword', { newPassword, oldPassword, username });
}
