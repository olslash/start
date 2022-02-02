import * as React from 'react';
import { connect } from 'react-redux';
import DragSelect from 'start/components/DragSelect';
import { rectsOverlap } from 'start/helpers';
import { GlobalState } from 'start/state/globalState';
import { Pane, WindowType } from 'start/types';
import { windowsAppIcons } from 'start/windowsApps';
import {
  addItemToMultiSelect,
  anyPaneIsBeingDragged,
  clickFolderItemGridBackground,
  focusedPaneName,
  folderSelectionState,
  FolderState,
  multiSelectedItemsForFolder,
  openPane,
  primarySelectedItemNameForFolder,
  removeItemFromMultiSelect,
  selectItem,
} from '../../state/explorer';
import FolderItem from './FolderItem';
import FolderItemGrid from './FolderItemGrid';
import KeyBindings from './KeyBindings';

interface OwnProps {
  folderName: string;
  items: Pane[];
  darkItemTitles?: boolean;
  columnLayout?: boolean;
  scrollableContentRef?: React.MutableRefObject<HTMLDivElement | null>;
}

interface StateProps {
  anyPaneIsBeingDragged: boolean;
  selectedItemName?: string;
  selectionState: FolderState;
  folderActive: boolean;
  multiSelectedItems: string[];
}

interface DispatchProps {
  selectItem(params: { folderName: string; itemName: string }): void;
  addItemToMultiSelect(params: { folderName: string; itemName: string }): void;
  removeItemFromMultiSelect(params: {
    folderName: string;
    itemName: string;
  }): void;
  clickFolderItemGridBackground(folderName: string): void;
  openPane(name: string, openerName: string): void;
}

type Props = OwnProps & StateProps & DispatchProps;

const FolderContents: React.FunctionComponent<Props> = ({
  anyPaneIsBeingDragged,
  folderName,
  items = [],
  darkItemTitles,
  selectedItemName,
  multiSelectedItems,
  selectionState,
  folderActive,
  scrollableContentRef,
  selectItem,
  addItemToMultiSelect,
  removeItemFromMultiSelect,
  openPane,
  clickFolderItemGridBackground,
  columnLayout,
}: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const folderItemRefs = React.useRef<{
    [name: string]: DOMRect[];
  }>({});

  const setRef = (instance: HTMLDivElement) => {
    if (!instance) {
      return;
    }

    // hack-ish: use the dom ID of the item so we don't have to use a curried
    // function to get at the name from state in here
    const itemName = instance.id;

    // the children of item instance are the item's icon/label.
    // cache the client rects so we don't have to cause DOM
    // reflows during drag events
    const boundingChildren = (
      Array.from(instance.children) as HTMLElement[]
    ).map((c) => c.getBoundingClientRect());

    folderItemRefs.current[itemName] = boundingChildren;
  };

  const handleFolderMouseDown = React.useCallback(
    (e, itemName) => {
      if (folderActive) {
        e.stopPropagation();
      }

      selectItem({ folderName, itemName });
    },
    [folderActive, folderName, selectItem]
  );

  const handleFolderDoubleClick = React.useCallback(
    (e: React.MouseEvent<any, any>, itemName: string) => {
      if (folderActive) {
        e.stopPropagation();
      }

      openPane(itemName, folderName);
    },
    [folderActive, folderName, openPane]
  );

  const currentRef = containerRef.current;

  // containerRect accounts for offsets from eg. body margin
  const containerRect = React.useMemo(
    () => currentRef?.getBoundingClientRect(),
    [currentRef]
  );

  const handleDrag = React.useCallback(
    ({ topLeft, bottomRight }) => {
      if (!folderActive || anyPaneIsBeingDragged) {
        return;
      }

      for (const [name, folderItemDOMRects] of Object.entries(
        folderItemRefs.current
      )) {
        if (!containerRect) {
          // fixme?
          return;
        }

        const itemIsWithinDragSelectArea = folderItemDOMRects.some(
          (itemRect) => {
            return rectsOverlap(
              topLeft[0],
              topLeft[1],
              bottomRight[0],
              bottomRight[1],

              itemRect.x - containerRect.left,
              itemRect.y - containerRect.top,
              itemRect.x + itemRect.width - containerRect.left,
              itemRect.y + itemRect.height - containerRect.top
            );
          }
        );

        const itemIsMultiSelected = multiSelectedItems.includes(name);
        if (itemIsWithinDragSelectArea) {
          if (!itemIsMultiSelected) {
            addItemToMultiSelect({ folderName, itemName: name });
          }
        } else {
          if (itemIsMultiSelected) {
            removeItemFromMultiSelect({ folderName, itemName: name });
          }
        }
      }
    },
    [
      anyPaneIsBeingDragged,
      folderActive,
      folderItemRefs,
      containerRect,
      multiSelectedItems,
      addItemToMultiSelect,
      folderName,
      removeItemFromMultiSelect,
    ]
  );

  return (
    <div style={{ height: '100%' }} ref={containerRef}>
      <KeyBindings
        folderName={folderName}
        selectedItemName={
          selectionState === FolderState.ACTIVE ? selectedItemName : undefined
        }
        multiSelectedItems={multiSelectedItems}
        disabled={!folderActive}
      />

      <DragSelect
        enabled={folderActive && !anyPaneIsBeingDragged}
        // onStart={onStart}
        onDrag={handleDrag}
        // onEnd={onEnd}
        containerRef={scrollableContentRef || containerRef}
      />

      <FolderItemGrid
        onBackgroundClick={() => {
          clickFolderItemGridBackground(folderName);
        }}
        columnLayout={columnLayout}
      >
        {items.map((item: Pane) => (
          <FolderItem
            ref={setRef}
            name={item.name}
            key={item.name}
            icon={
              item.type === WindowType.File
                ? windowsAppIcons[item.opensWith]
                : item.icon
            }
            darkTitle={darkItemTitles}
            selected={
              folderActive &&
              (selectedItemName === item.name ||
                multiSelectedItems.includes(item.name))
            }
            partialSelected={
              folderActive &&
              selectionState === FolderState.INACTIVE &&
              !multiSelectedItems.includes(item.name)
            }
            onMouseDown={handleFolderMouseDown}
            onDoubleClick={handleFolderDoubleClick}
          />
        ))}
      </FolderItemGrid>
    </div>
  );
};

function mapStateToProps(state: GlobalState, ownProps: Props): StateProps {
  return {
    selectedItemName: primarySelectedItemNameForFolder(
      state,
      ownProps.folderName
    ),
    multiSelectedItems: multiSelectedItemsForFolder(state, ownProps.folderName),
    selectionState: folderSelectionState(state, ownProps.folderName),
    folderActive: focusedPaneName(state) === ownProps.folderName,
    anyPaneIsBeingDragged: anyPaneIsBeingDragged(state),
  };
}

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>(
  mapStateToProps,
  {
    selectItem,
    addItemToMultiSelect,
    removeItemFromMultiSelect,
    clickFolderItemGridBackground,
    openPane,
  } as DispatchProps
)(FolderContents);
