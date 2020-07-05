import * as React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/App';

import rootReducer from './state/rootReducer';
import rootSaga from './state/rootSaga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist: ['CLOCK_TICK'],
    })
  : compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, thunk))
);
sagaMiddleware.run(rootSaga);

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
