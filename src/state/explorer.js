import { createReducer } from '../helpers/index';

const OPEN_START_MENU = 'Open the start menu';
const CLOSE_START_MENU = 'Close the start menu';
const SET_START_MENU_ACTIVE_FOLDER_PATH =
  'Set the active path of the start menu as the user navigates';
const SELECT_ITEM = 'Select a desktop/folder item';
const DESELECT_ITEM = 'Deselect a desktop/folder item';

export const active_folder_state = 'active';
export const inactive_folder_state = 'inactive';

export const reducer = createReducer(
  {
    startMenuOpen: false,
    startMenuActiveFolderPath: [],
    // pane means folder/desktop or other entities that can be active (taskbar)
    activePaneId: null,
    // which item within each folder/the desktop is currently selected?
    // (primary selection, not including multi-select)
    primarySelectedFolderItemByFolderId: {},
    // Does the current folder have an active selection, or is it inactive?
    // (once an item has been selected in a folder, it can't actually be
    // de-selected; clicking the folder background makes the selection
    // "inactive" but the previous selection remains half-selected in the UI)
    // folders start "inactive", move to "active" when an item is selected,
    // and back to "inactive" when the folder BG is clicked.
    folderSelectionStateByFolderId: {}
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
    [SET_START_MENU_ACTIVE_FOLDER_PATH](state, { payload: { depth, index } }) {
      if (depth > state.startMenuActiveFolderPath.length) {
        console.warn('depth is out of bounds');
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
    [SELECT_ITEM](state, { payload: { itemId, folderId } }) {
      return {
        ...state,
        primarySelectedFolderItemByFolderId: {
          ...state.primarySelectedFolderItemByFolderId,
          [folderId]: itemId
        },
        folderSelectionStateByFolderId: {
          ...state.folderSelectionStateByFolderId,
          [folderId]: active_folder_state
        }
      };
    },
    [DESELECT_ITEM](state, { payload: { folderId } }) {
      return {
        ...state,
        // item not actually deselected, just go back to inactive folder state
        folderSelectionStateByFolderId: {
          ...state.folderSelectionStateByFolderId,
          [folderId]: inactive_folder_state
        }
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

export function selectItem({ folderId, itemId }) {
  return {
    type: SELECT_ITEM,
    payload: { folderId, itemId }
  };
}

export function deselectItem(folderId) {
  return {
    type: DESELECT_ITEM,
    payload: { folderId }
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

export function primarySelectedItemIdForFolder(state, folderId) {
  // fixme: this needs to be the *first* folder item by default if none exists
  return local(state).primarySelectedFolderItemByFolderId[folderId];
}

export function folderSelectionState(state, folderId) {
  return (
    local(state).folderSelectionStateByFolderId[folderId] ||
    inactive_folder_state
  );
}
