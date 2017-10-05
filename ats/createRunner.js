import Nightmare from 'nightmare';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

export default (options) => new Nightmare(Object.assign({}, options, {
  show: !process.env.AT_RUN_IN_BACKGROUND,
  switches: {
    'ignore-certificate-errors': process.env.AT_IGNORE_CERT_ERRORS || false,
  },
}));
