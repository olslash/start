import { mapValues, pick, pickBy, range, sample, union, without } from 'lodash';
import { put, select, takeEvery } from 'redux-saga/effects'; // eslint-disable-line
import { Apps, Pane, PaneState, WindowType, Position } from 'start/types';
import { moveOrPrependToFront, treeFind } from '../helpers';
import {
  fileTree as initialFileTree,
  itemsByName as initialItemsByName,
} from '../initialHDDState';
import { GlobalState } from './globalState';
import { fetchTextFile } from './remoteFile';

const OPEN_START_MENU = 'Open the start menu';
const CLOSE_START_MENU = 'Close the start menu';
const SET_START_MENU_ACTIVE_FOLDER_PATH =
  'Set the active path of the start menu as the user navigates';
const SELECT_ITEM = 'Select a desktop/folder item';
const ADD_ITEM_TO_MULTI_SELECT =
  'Add an item to the selection created by dragging a selection box';
const REMOVE_ITEM_FROM_MULTI_SELECT =
  'Remove an item from the selection created by dragging a selection box';
const FOCUS_PANE = 'Focus a folder, the desktop, the taskbar, etc';
const CLICK_FOLDER_ITEM_GRID_BACKGROUND =
  'The item grid of a folder was clicked';
const TOGGLE_MINIMIZE_PANE = 'minimize a pane (toggle)';
const TOGGLE_MAXIMIZE_PANE = 'maximize a pane (toggle)';
const OPEN_PANE = 'create a new open pane for an item';
const CLOSE_PANE = 'close a pane';
const MOVE_PANE = 'change the position of a pane';
const DRAG_PANE_START = 'A pane has started to be dragged';
const DRAG_PANE_STOP = 'A pane has stopped being dragged';

export enum FolderState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

const defaultPaneState = {
  open: false,
  minimized: false,
  maximized: false,
  width: 200,
  height: 200,
  left: 50,
  top: 50,
};

export interface State {
  startMenuOpen: boolean;
  startMenuActiveFolderPath: number[];
  itemsByName: typeof initialItemsByName;
  fileTree: typeof initialFileTree;
  paneStateByItemName: { [name: string]: PaneState | undefined };
  // pane means folder/app or other special entities that can be
  // active (taskbar, desktop)
  focusedPaneOrder: string[];
  // which item within each folder/the desktop is currently selected?
  // (primary selection, not including multi-select)
  primarySelectedFolderItemNameByFolderName: {
    [name: string]: string | undefined;
  };
  // Does the current folder have an active selection, or is it inactive?
  // (once an item has been selected in a folder, it can't actually be
  // de-selected; clicking the folder background makes the selection
  // "inactive" but the previous selection remains half-selected in the UI)
  // folders start "inactive", move to "active" when an item is selected,
  // and back to "inactive" when the folder BG is clicked.
  folderSelectionStateByFolderName: { [name: string]: FolderState | undefined };
  // When items are part of a multi-select (bounding box) group, their selection
  // doesn't create a new primary item.
  multiSelectedFolderItemsByFolderName: {
    [name: string]: string[] | undefined;
  };
  // if any pane is being dragged, we need to avoid starting new drag groups
  // (which seem to be caused by rogue mouse events?)
  anyPaneIsBeingDragged: boolean;
}

const initialState: State = {
  startMenuOpen: false,
  startMenuActiveFolderPath: [],
  itemsByName: initialItemsByName,
  fileTree: initialFileTree,
  paneStateByItemName: {
    Desktop: { ...defaultPaneState },
  },
  focusedPaneOrder: ['Desktop'],
  primarySelectedFolderItemNameByFolderName: {},
  folderSelectionStateByFolderName: {},
  multiSelectedFolderItemsByFolderName: {},
  anyPaneIsBeingDragged: false,
};

type Action = ReturnType<
  | typeof openStartMenu
  | typeof closeStartMenu
  | typeof setStartMenuActiveFolderPath
  | typeof selectItem
  | typeof addItemToMultiSelect
  | typeof removeItemFromMultiSelect
  | typeof clickFolderItemGridBackground
  | typeof focusPane
  | typeof minimizePane
  | typeof maximizePane
  | typeof openPane
  | typeof closePane
  | typeof movePane
>;

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case OPEN_START_MENU:
      return {
        ...state,
        startMenuOpen: true,
      };

    case CLOSE_START_MENU:
      return {
        ...state,
        startMenuOpen: false,
        startMenuActiveFolderPath: [],
      };

    case SET_START_MENU_ACTIVE_FOLDER_PATH: {
      const { depth, index } = action.payload;

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
              [...state.startMenuActiveFolderPath, index],
      };
    }

    case SELECT_ITEM: {
      const { itemName, folderName } = action.payload;

      return {
        ...state,
        primarySelectedFolderItemNameByFolderName: {
          ...state.primarySelectedFolderItemNameByFolderName,
          [folderName]: itemName,
        },
        folderSelectionStateByFolderName: {
          ...state.folderSelectionStateByFolderName,
          [folderName]: FolderState.ACTIVE,
        },
        multiSelectedFolderItemsByFolderName: {
          ...state.multiSelectedFolderItemsByFolderName,
          [folderName]: [],
        },
      };
    }

    case ADD_ITEM_TO_MULTI_SELECT: {
      const { itemName, folderName } = action.payload;

      return {
        ...state,
        multiSelectedFolderItemsByFolderName: {
          ...state.multiSelectedFolderItemsByFolderName,
          [folderName]: union(
            state.multiSelectedFolderItemsByFolderName[folderName],
            [itemName]
          ),
        },
      };
    }

    case REMOVE_ITEM_FROM_MULTI_SELECT: {
      const { itemName, folderName } = action.payload;

      return {
        ...state,
        multiSelectedFolderItemsByFolderName: {
          ...state.multiSelectedFolderItemsByFolderName,
          [folderName]: without(
            state.multiSelectedFolderItemsByFolderName[folderName],
            itemName
          ),
        },
      };
    }

    case CLICK_FOLDER_ITEM_GRID_BACKGROUND: {
      const { folderName } = action.payload;
      const folderIsFocused = state.focusedPaneOrder[0] === folderName;

      if (folderIsFocused) {
        // if the folder is focused move to inactive mode
        return {
          ...state,
          folderSelectionStateByFolderName: {
            ...state.folderSelectionStateByFolderName,
            [folderName]: FolderState.INACTIVE,
          },
          multiSelectedFolderItemsByFolderName: {
            ...state.multiSelectedFolderItemsByFolderName,
            [folderName]: [],
          },
        };
      } else {
        // if the folder is unfocused, focus the pane
        return {
          ...state,
          focusedPaneOrder: moveOrPrependToFront(
            state.focusedPaneOrder,
            folderName
          ),
        };
      }
    }

    case FOCUS_PANE: {
      const { name } = action.payload;

      return {
        ...state,
        focusedPaneOrder: moveOrPrependToFront(state.focusedPaneOrder, name),
      };
    }

    case TOGGLE_MINIMIZE_PANE: {
      const { name } = action.payload;
      const paneState = state.paneStateByItemName[name];

      if (!paneState) {
        return state;
      }

      return {
        ...state,
        paneStateByItemName: {
          ...state.paneStateByItemName,
          [name]: {
            ...paneState,
            minimized: !paneState.minimized,
          },
        },
      };
    }

    case TOGGLE_MAXIMIZE_PANE: {
      const { name } = action.payload;
      const paneState = state.paneStateByItemName[name];

      if (!paneState) {
        return state;
      }

      return {
        ...state,
        paneStateByItemName: {
          ...state.paneStateByItemName,
          [name]: {
            ...paneState,
            maximized: !paneState.maximized,
          },
        },
      };
    }

    case OPEN_PANE: {
      const { name, openerName } = action.payload;
      const openerPaneState = state.paneStateByItemName[openerName];
      const openerPanePosition = pick(openerPaneState, [
        'height',
        'width',
        'top',
        'left',
        'maximized',
      ]);

      if (!openerPaneState) {
        return state;
      }

      const newWindowOffset = sample(range(10, 80, 10)) as number;
      const openInNewWindow =
        state.itemsByName[name]?.type === WindowType.File ||
        openerName === 'Desktop';

      return {
        ...state,
        focusedPaneOrder: moveOrPrependToFront(state.focusedPaneOrder, name),
        paneStateByItemName: {
          ...state.paneStateByItemName,
          [openerName]: {
            ...openerPaneState,
            // while navigating between folders, use the "same" window by
            // closing the opener and replacing it with the new pane, inheriting
            // the previous position
            // fixme: apps need to open in a new window
            // fixme -- this state needs to be transient
            open: openerPaneState.open && openInNewWindow,
          },
          [name]: {
            ...defaultPaneState,
            // for new panes, choose a semi-random position for the new folder,
            // since windows' behavior is inscrutable. seems to start at 0,0 and
            // increment by x,x.
            top: newWindowOffset,
            left: newWindowOffset,
            ...state.paneStateByItemName[name],

            open: true,
            minimized: false,

            // inherit size/position of opener if it exists, and we are opening
            // in its place
            ...(openInNewWindow ? {} : openerPanePosition),
          },
        },
      };
    }

    case CLOSE_PANE: {
      const { name } = action.payload;
      const paneState = state.paneStateByItemName[name];

      if (!paneState) {
        return state;
      }

      return {
        ...state,
        paneStateByItemName: {
          ...state.paneStateByItemName,
          [name]: {
            ...paneState,
            open: false,
          },
        },
        primarySelectedFolderItemNameByFolderName: {
          ...state.primarySelectedFolderItemNameByFolderName,
          [name]: undefined,
        },
        multiSelectedFolderItemsByFolderName: {
          ...state.multiSelectedFolderItemsByFolderName,
          [name]: [],
        },
        folderSelectionStateByFolderName: {
          ...state.folderSelectionStateByFolderName,
          [name]: FolderState.INACTIVE,
        },
      };
    }

    case MOVE_PANE: {
      const { name, left, top, width, height } = action.payload;
      const paneState = state.paneStateByItemName[name];

      if (!paneState) {
        return state;
      }

      return {
        ...state,
        focusedPaneOrder: moveOrPrependToFront(state.focusedPaneOrder, name),
        paneStateByItemName: {
          ...state.paneStateByItemName,
          [name]: {
            ...paneState,
            left: left || paneState.left,
            top: top || paneState.top,
            width: width || paneState.width,
            height: height || paneState.height,
          },
        },
      };
    }

    case DRAG_PANE_START: {
      return {
        ...state,
        anyPaneIsBeingDragged: true,
      };
    }

    case DRAG_PANE_STOP: {
      return {
        ...state,
        anyPaneIsBeingDragged: false,
      };
    }

    default:
      return state;
  }
}

export function* saga() {
  yield takeEvery(
    (action: { type: string }) => action.type === OPEN_PANE,
    function* ({ payload: { name } }: ReturnType<typeof openPane>) {
      const pane: Pane = yield select(itemByName, name);

      // fetch content for panes that have data requirements on opening
      if (
        pane.type === WindowType.File &&
        pane.contentUrl &&
        pane.opensWith === Apps.Notepad
      ) {
        yield put(fetchTextFile(pane.contentUrl) as any);
      }
    }
  );
}

export function openStartMenu() {
  return <const>{
    type: OPEN_START_MENU,
  };
}

export function closeStartMenu() {
  return <const>{
    type: CLOSE_START_MENU,
  };
}

export function setStartMenuActiveFolderPath({
  depth,
  index,
}: {
  depth: number;
  index: number;
}) {
  return <const>{
    type: SET_START_MENU_ACTIVE_FOLDER_PATH,
    payload: { depth, index },
  };
}

export function selectItem({
  folderName,
  itemName,
}: {
  folderName: string;
  itemName: string;
}) {
  return <const>{
    type: SELECT_ITEM,
    payload: { folderName, itemName },
  };
}

export function addItemToMultiSelect({
  folderName,
  itemName,
}: {
  folderName: string;
  itemName: string;
}) {
  return <const>{
    type: ADD_ITEM_TO_MULTI_SELECT,
    payload: { folderName, itemName },
  };
}

export function removeItemFromMultiSelect({
  folderName,
  itemName,
}: {
  folderName: string;
  itemName: string;
}) {
  return <const>{
    type: REMOVE_ITEM_FROM_MULTI_SELECT,
    payload: { folderName, itemName },
  };
}

export function clickFolderItemGridBackground(folderName: string) {
  return <const>{
    type: CLICK_FOLDER_ITEM_GRID_BACKGROUND,
    payload: { folderName },
  };
}

export function focusPane(name: string) {
  return <const>{
    type: FOCUS_PANE,
    payload: { name },
  };
}

export function minimizePane(name: string) {
  return <const>{
    type: TOGGLE_MINIMIZE_PANE,
    payload: { name },
  };
}

export function maximizePane(name: string) {
  return <const>{
    type: TOGGLE_MAXIMIZE_PANE,
    payload: { name },
  };
}

export function openPane(name: string, openerName: string) {
  return <const>{
    type: OPEN_PANE,
    payload: { name, openerName },
  };
}

export function closePane(name: string) {
  return <const>{
    type: CLOSE_PANE,
    payload: { name },
  };
}

export function movePane(
  name: string,
  { left, top, width, height }: Partial<Position>
) {
  return <const>{
    type: MOVE_PANE,
    payload: { name, left, top, width, height },
  };
}

export function dragPaneStart(name: string) {
  return <const>{
    type: DRAG_PANE_START,
    payload: { name },
  };
}

export function dragPaneStop(name: string) {
  return <const>{
    type: DRAG_PANE_STOP,
    payload: { name },
  };
}

function local(state: GlobalState): State {
  return state.explorer;
}

export function startMenuOpen(state: GlobalState) {
  return local(state).startMenuOpen;
}

export function startMenuActiveFolderPath(state: GlobalState) {
  return local(state).startMenuActiveFolderPath;
}

export function primarySelectedItemNameForFolder(
  state: GlobalState,
  folderName: string
) {
  return (
    local(state).primarySelectedFolderItemNameByFolderName[folderName] ||
    //  *first* folder item by default if none exists
    itemsForFolder(state, folderName)?.[0]?.name
  );
}

export function folderSelectionState(state: GlobalState, folderName: string) {
  return (
    local(state).folderSelectionStateByFolderName[folderName] ||
    FolderState.INACTIVE
  );
}

export function multiSelectedItemsForFolder(
  state: GlobalState,
  folderName: string
) {
  return local(state).multiSelectedFolderItemsByFolderName[folderName] || [];
}

export function focusedPaneName(state: GlobalState) {
  return local(state).focusedPaneOrder[0];
}

export function focusedPaneOrder(state: GlobalState) {
  return local(state).focusedPaneOrder;
}

export function itemByName(state: GlobalState, itemName: string) {
  return local(state).itemsByName[itemName];
}

export function itemsForFolder(state: GlobalState, folderName: string) {
  const treeResult = treeFind(local(state).fileTree, { name: folderName });

  if (!treeResult) {
    console.warn('Folder', folderName, 'was not found in state');
    return undefined;
  }

  if (!treeResult.children) {
    console.warn(
      'Folder',
      folderName,
      'was found, but did not have any children'
    );
    return undefined;
  }

  const isPane = (item: Pane | undefined): item is Pane => {
    return !!item;
  };

  // populate first-level children
  return treeResult.children
    .map((child) => itemByName(state, child.name))
    .filter(isPane);
}

export function openPaneItems(state: GlobalState): {
  [name: string]: Pane & PaneState;
} {
  const openPanes = pickBy(local(state).paneStateByItemName, {
    open: true,
  }) as Record<string, PaneState>;

  return mapValues(openPanes, (pane, name) => ({
    ...pane,
    // we can assume that the name has items if it's in openPanes
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...itemByName(state, name)!,
  }));
}

export function anyPaneIsBeingDragged(state: GlobalState) {
  return local(state).anyPaneIsBeingDragged;
}
