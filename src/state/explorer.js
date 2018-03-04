import { createReducer } from '../helpers/index';

const OPEN_START_MENU = 'OPEN_START_MENU';
const CLOSE_START_MENU = 'CLOSE_START_MENU';
const DESKTOP_CLICK = 'DESKTOP_CLICK';
const TASKBAR_CLICK = 'TASKBAR_CLICK';

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
    },
    [DESKTOP_CLICK](state) {
      return {
        ...state,
        // click-away handler for start menu
        startMenuOpen: false
      }
    },
    [TASKBAR_CLICK](state) {
      return {
        ...state,
        // click-away handler for start menu
        startMenuOpen: false
      }
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

export function desktopClick() {
  return {
    type: DESKTOP_CLICK
  };
}

export function taskbarClick() {
  return {
    type: TASKBAR_CLICK
  };
}

function local(state) {
  return state.explorer;
}

export function startMenuOpen(state) {
  return local(state).startMenuOpen;
}
