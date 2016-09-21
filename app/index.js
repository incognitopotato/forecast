import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import { App } from './components';

const isomorphicState = window.__PRELOADED_STATE__ || false;
const logger = createLogger();
let store;

if (isomorphicState) {
  store = createStore(
    rootReducer,
    isomorphicState,
    applyMiddleware(thunk, logger) // logger has to come last!
  );
} else {
  store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger) // logger has to come last!
  );
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('mountPoint')
);
