import { createReducer } from '../helpers/index';

const OPEN_START_MENU = 'OPEN_START_MENU';
const CLOSE_START_MENU = 'CLOSE_START_MENU';

export const reducer = createReducer(
  {
    startMenuOpen: false
  },
  {
    [OPEN_START_MENU](state) {
      return {
        ...state,
        startMenuOpen: true
      };
    },
    [CLOSE_START_MENU](state) {
      return {
        ...state,
        startMenuOpen: false
      };
    }
  }
);

// export function* saga() {}

export function openStartMenu() {
  return {
    type: OPEN_START_MENU
  };
}

export function closeStartMenu() {
  return {
    type: CLOSE_START_MENU
  };
}

function local(state) {
  return state.explorer;
}

export function startMenuOpen(state) {
  return local(state).startMenuOpen;
}
