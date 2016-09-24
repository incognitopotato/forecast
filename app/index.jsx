import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import { App } from './components';

const logger = createLogger();
let store;

// apply logger to dev env
if (window.env === 'prod') {
  store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
} else {
  store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('mountPoint')
);
