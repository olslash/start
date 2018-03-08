import { combineReducers } from 'redux';

import { reducer as clock } from './clock';
import { reducer as explorer } from './explorer';

export default combineReducers({
  clock,
  explorer
});
