import { combineReducers } from 'redux';

import { reducer as clock } from './clock';
import { reducer as explorer } from './explorer';
import { reducer as remoteFile } from './remoteFile';

export default combineReducers({
  clock,
  explorer,
  remoteFile
});
