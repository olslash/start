/* eslint-disable import/order */
import { fork, all } from 'redux-saga/effects';

import { saga as clock } from './clock';
import { saga as explorer } from './explorer';

export default function* root() {
  yield all([fork(clock), fork(explorer)]);
}
