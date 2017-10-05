export default (path = '') => `${process.env.AT_BASE_URL}/${path}?q=${ new Date().getTime() }`;
