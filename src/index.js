import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import BrandwatchReactAuth from 'brandwatch-react-auth';
import configureStore from './store/configure';
import App from './components/App';
import { setTokenStore } from './api/';

const history = createHistory();
const store = configureStore(history);

function render(AppComponent) {
  ReactDOM.render(
    <BrandwatchReactAuth
        audience={ process.env.AUTH_AUDIENCE }
        domain={ process.env.AUTH_DOMAIN }
        onCreateStore={ setTokenStore }>
      <AppContainer>
        <Provider store={ store }>
          <ConnectedRouter history={ history }>
            <AppComponent />
          </ConnectedRouter>
        </Provider>
      </AppContainer>
    </BrandwatchReactAuth>,
    document.getElementById('root')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => render(App));
}
