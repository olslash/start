import { fork, all } from 'redux-saga/effects';

import { saga as clock } from './clock';

export default function* root() {
  yield all([fork(clock)]);
}
