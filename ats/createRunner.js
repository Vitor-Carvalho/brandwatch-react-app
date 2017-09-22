import Nightmare from 'nightmare';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

export default (options) => new Nightmare(Object.assign({}, options, {
  show: !process.env.AT_RUN_IN_BACKGROUND,
}));
