import { combineReducers } from 'redux';

import { reducer as clock } from './clock';
import { reducer as explorer } from './explorer';
import { reducer as remoteFile } from './remoteFile';

import { GlobalState } from './globalState';

export default combineReducers<GlobalState>({
  clock,
  explorer,
  remoteFile
});
