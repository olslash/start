import { eventChannel, END } from 'redux-saga';

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export function intervalChan(timeMs) {
  return eventChannel(emitter => {
    const iv = setInterval(() => emitter(true), timeMs);
    return () => clearInterval(iv);
  });
}
