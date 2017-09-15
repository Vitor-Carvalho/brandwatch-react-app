import { compose, createStore, applyMiddleware } from 'redux';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import sagas from '../sagas/root';
import reducers from './root';

export default (history) => {
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = createRouterMiddleware(history);
  const middlewares = [sagaMiddleware, routerMiddleware];
  middlewares.push(createSagaMiddleware());

  if (typeof document !== 'undefined' && process.env.MIXPANEL_TOKEN) {
    middlewares.push(require('remimi')(process.env.MIXPANEL_TOKEN, {
      uniqueIdSelector: ({ profile }) => profile.id,
      personSelector: ({ profile }) => ({
        clientId: profile.id,
        clientName: null,
        salesForceId: null,
        $first_name: profile.name,
        $last_name: null,
        $email: profile.email,
      }),
    }));
  }

  const finalCompose = process.env.NODE_ENV === 'production' ? compose : composeWithDevTools;

  const store = createStore(
    reducers,
    finalCompose(
      applyMiddleware(...middlewares)
    ),
  );

  sagaMiddleware.run(sagas);

  return store;
};
