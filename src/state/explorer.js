import { pickBy, mapValues, pick } from 'lodash';

import { createReducer } from '../helpers/index';
import { uuid, treeFind } from '../helpers';

import {
  fileTree as initialFileTree,
  itemsById as initialItemsByID
} from '../initialHDDState';

const OPEN_START_MENU = 'Open the start menu';
const CLOSE_START_MENU = 'Close the start menu';
const SET_START_MENU_ACTIVE_FOLDER_PATH =
  'Set the active path of the start menu as the user navigates';
const SELECT_ITEM = 'Select a desktop/folder item';
const FOCUS_PANE = 'Focus a folder, the desktop, the taskbar, etc';
const CLICK_FOLDER_ITEM_GRID_BACKGROUND =
  'The item grid of a folder was' + ' clicked';
const TOGGLE_MINIMIZE_PANE = 'minimize a pane (toggle)';
const TOGGLE_MAXIMIZE_PANE = 'maximize a pane (toggle)';
const OPEN_PANE = 'create a new open pane for an item';
const CLOSE_PANE = 'close a pane';

export const active_folder_state = 'active';
export const inactive_folder_state = 'inactive';

export const file_item_type = 'file';
export const folder_item_type = 'folder';

export function item({ type, id = uuid(), title, icon }) {
  return {
    type,
    id,
    title,
    icon
  };
}

const defaultPaneState = {
  open: false,
  minimized: false,
  maximized: false,
  width: 200,
  height: 200,
  left: 50,
  top: 50
};

export const reducer = createReducer(
  {
    startMenuOpen: false,
    startMenuActiveFolderPath: [],
    itemsById: initialItemsByID,
    fileTree: initialFileTree,
    paneStateByItemId: {
      // fixme -- delete after testing
      // myComputer: { ...defaultPaneState, open: true }
    },
    // pane means folder/app or other special entities that can be
    // active (taskbar, desktop)
    focusedPaneId: 'desktop',
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

    [CLICK_FOLDER_ITEM_GRID_BACKGROUND](state, { payload: { folderId } }) {
      const folderIsFocused = state.focusedPaneId === folderId;

      if (folderIsFocused) {
        // if the folder is focused move to inactive mode
        return {
          ...state,
          folderSelectionStateByFolderId: {
            ...state.folderSelectionStateByFolderId,
            [folderId]: inactive_folder_state
          }
        };
      } else {
        // if the folder is unfocused, focus the pane
        return {
          ...state,
          focusedPaneId: folderId
        };
      }
    },
    [FOCUS_PANE](state, { payload: { id } }) {
      return {
        ...state,
        focusedPaneId: id
      };
    },
    [TOGGLE_MINIMIZE_PANE](state, { payload: { id } }) {
      return {
        ...state,
        paneStateByItemId: {
          ...state.paneStateByItemId,
          [id]: {
            ...state.paneStateByItemId[id],
            minimized: true
          }
        }
      };
    },
    [TOGGLE_MAXIMIZE_PANE](state, { payload: { id } }) {
      return {
        ...state,
        paneStateByItemId: {
          ...state.paneStateByItemId,
          [id]: {
            ...state.paneStateByItemId[id],
            maximized: !state.paneStateByItemId[id].maximized
          }
        }
      };
    },

    [OPEN_PANE](state, { payload: { id, openerId } }) {
      const openerPaneState = state.paneStateByItemId[openerId] || {};
      const openerPanePosition = pick(openerPaneState, [
        'height',
        'width',
        'top',
        'left',
        'maximized'
      ]);

      return {
        ...state,
        focusedPaneId: id,
        paneStateByItemId: {
          ...state.paneStateByItemId,
          [openerId]: {
            ...state.paneStateByItemId[openerId],
            // while navigating between folders, use the "same" window by
            // closing the opener and replacing it with the new pane, inheriting
            // the previous position
            // fixme -- this state needs to be transient
            open: false
          },
          [id]: {
            ...defaultPaneState,
            ...state.paneStateByItemId[id],

            open: true,
            minimized: false,

            // inherit size/position of opener if it exists
            ...openerPanePosition
          }
        }
      };
    },

    [CLOSE_PANE](state, { payload: { id } }) {
      return {
        ...state,
        paneStateByItemId: {
          ...state.paneStateByItemId,
          [id]: {
            ...state.paneStateByItemId[id],
            open: false
          }
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

export function clickFolderItemGridBackground(folderId) {
  return {
    type: CLICK_FOLDER_ITEM_GRID_BACKGROUND,
    payload: { folderId }
  };
}

export function focusPane(id) {
  return {
    type: FOCUS_PANE,
    payload: { id }
  };
}

export function minimizePane(id) {
  return {
    type: TOGGLE_MINIMIZE_PANE,
    payload: { id }
  };
}

export function maximizePane(id) {
  return {
    type: TOGGLE_MAXIMIZE_PANE,
    payload: { id }
  };
}

export function openPane(id, openerId) {
  return {
    type: OPEN_PANE,
    payload: { id, openerId }
  };
}

export function closePane(id) {
  return {
    type: CLOSE_PANE,
    payload: { id }
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

export function focusedPaneId(state) {
  return local(state).focusedPaneId;
}

export function itemById(state, itemId) {
  return local(state).itemsById[itemId];
}

export function itemsForFolder(state, folderId) {
  const treeResult = treeFind(local(state).fileTree, { id: folderId });

  if (!treeResult) {
    console.warn('Folder', folderId, 'was not found in state');
    return null;
  }
  // populate first-level children
  return treeResult.children.map(child => itemById(state, child.id));
}

export function openPaneItems(state) {
  const openPanes = pickBy(local(state).paneStateByItemId, {
    open: true
  });

  return mapValues(openPanes, (pane, id) => ({
    ...pane,
    ...itemById(state, id)
  }));
}
