import Express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack/dev.server.config.js';
import React from 'react';
import thunk from 'redux-thunk';
import createNodeLogger from 'redux-node-logger';
import appReducers from '../reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { App } from '../components';

const app = new Express();
const port = 3000;

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
  const rootReducer = combineReducers(appReducers);

  // TODO: All settings should go in config objects
  const logger = createNodeLogger({
    messageColor: 'bright-yellow',
    prevColor: 'white',
    actionColor: 'bright-blue',
    nextColor: 'green',
  });
  let store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );

  // Render the component to a string
  // Error handling if error, send to client
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const finalState = store.getState();
  res.send(renderFullPage(html, finalState));
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="mountPoint">${html}</div>
        <script>
          window.__CLIENT__ = true;
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="main.js"></script>
      </body>
    </html>
  `;
}

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
})