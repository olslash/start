import * as React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import Windows from './components/Windows';

import rootReducer from './state/rootReducer';
import rootSaga from './state/rootSaga';

const actionsBlacklist = ['CLOCK_TICK'];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist,
    })
  : compose;

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({
  predicate(_, action) {
    return !actionsBlacklist.includes(action.type);
  },
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, thunk, logger))
);
sagaMiddleware.run(rootSaga);

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

render(
  <Provider store={store}>
    <Windows />
  </Provider>,
  root
);
