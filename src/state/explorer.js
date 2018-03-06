import { createReducer } from '../helpers/index';

const OPEN_START_MENU = 'OPEN_START_MENU';
const CLOSE_START_MENU = 'CLOSE_START_MENU';
const SET_START_MENU_ACTIVE_FOLDER_PATH = 'SET_START_MENU_ACTIVE_FOLDER_PATH';
const SELECT_DESKTOP_ITEM = 'SELECT_DESKTOP_ITEM';
const DESKTOP_CLICK = 'DESKTOP_CLICK';

export const reducer = createReducer(
  {
    startMenuOpen: false,
    startMenuActiveFolderPath: [],
    selectedDesktopItemId: null
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
        startMenuOpen: false,
        startMenuActiveFolderPath: []
      };
    },
    [SET_START_MENU_ACTIVE_FOLDER_PATH](state, action) {
      const { payload: { depth, index } } = action;

      if (depth > state.startMenuActiveFolderPath.length) {
        console.warn('depth is out of bounds');
        debugger;
        return state;
      }

      return {
        ...state,
        startMenuActiveFolderPath:
          depth <= state.startMenuActiveFolderPath.length - 1
            ? // up-tree path changed, prune
              [...state.startMenuActiveFolderPath.slice(0, depth), index]
            : // add depth at index
              [...state.startMenuActiveFolderPath, index]
      };
    },
    [SELECT_DESKTOP_ITEM](state, action) {
      return {
        ...state,
        selectedDesktopItemId: action.payload.id
      };
    },
    [DESKTOP_CLICK](state) {
      return {
        ...state,
        selectedDesktopItemId: null
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

export function setStartMenuActiveFolderPath({ depth, index }) {
  return {
    type: SET_START_MENU_ACTIVE_FOLDER_PATH,
    payload: { depth, index }
  };
}

export function selectDesktopItem(id) {
  return {
    type: SELECT_DESKTOP_ITEM,
    payload: { id }
  };
}

export function desktopClick() {
  return {
    type: DESKTOP_CLICK
  };
}

function local(state) {
  return state.explorer;
}

export function startMenuOpen(state) {
  return local(state).startMenuOpen;
}

export function startMenuActiveFolderPath(state) {
  return local(state).startMenuActiveFolderPath;
}

export function selectedDesktopItemId(state) {
  return local(state).selectedDesktopItemId;
}
