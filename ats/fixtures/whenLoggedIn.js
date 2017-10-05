import fetch from 'electron-fetch';
let token;

beforeAll(() => {
  return fetch(`${ process.env.AUTH_DOMAIN }/auth/login`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: process.env.AT_LOGIN_USERNAME,
      password: process.env.AT_LOGIN_PASSWORD,
      audience: process.env.AUTH_AUDIENCE,
    })
  })
  .then((res) => res.json())
  .then(json => {
    token = json[`id_token:${ process.env.AUTH_AUDIENCE }`]
  })
  .catch(() => {
    /* eslint-disable no-console */
    console.log(`failed to retrieve token from Auth service, check the following\n
      - ❔ ${ process.env.AT_BASE_URL } is the correct base url and is working\n
      - ❔ ${ process.env.AUTH_DOMAIN } is the correct auth domain and is working\n
      - ❔ you have correctly defined details for your AT user '${ process.env.AT_LOGIN_USERNAME }'\n
    `);
    /* eslint-disable no-console */
  });
})

export default (runner) => {
  expect(token).toBeDefined();
  return runner
  .goto(`${ process.env.AUTH_DOMAIN }/store`)
  .evaluate(t => window.localStorage.setItem('id_token:brandwatch.com', t), token);
};
