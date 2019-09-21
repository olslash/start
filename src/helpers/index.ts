import { find, flatten, partition } from 'lodash';
import { eventChannel } from 'redux-saga';

// export function createReducer<State>(
//   initialState: State,
//   handlers: { [action: string]: (state: State, action) => State }
// ) {
//   return function reducer(state = initialState, action) {
//     if (handlers.hasOwnProperty(action.type)) {
//       return handlers[action.type](state, action);
//     } else {
//       return state;
//     }
//   };
// }

export function intervalChan(timeMs: number) {
  return eventChannel(emitter => {
    const iv = setInterval(() => emitter(true), timeMs);
    return () => clearInterval(iv);
  });
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4()}-${s4()}`;
}

export function treeFind(tree, pattern) {
  const result = find(tree, pattern);

  if (result) {
    return result;
  }

  for (const { children } of tree) {
    const result = treeFind(children, pattern);

    if (result) {
      return result;
    }
  }
}

export function moveOrPrependToFront(array, searchString) {
  const ordered = flatten(partition(array, o => o === searchString));

  return ordered[0] === searchString ? ordered : [searchString, ...ordered];
}
