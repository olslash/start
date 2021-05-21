import * as React from 'react';
import { connect } from 'react-redux';
import DragSelect from 'start/components/DragSelect';
import { rectsOverlap } from 'start/helpers';
import { GlobalState } from 'start/state/globalState';
import { Pane, WindowType } from 'start/types';
import { windowsAppIcons } from 'start/windowsApps';
import {
  clickFolderItemGridBackground,
  focusedPaneName,
  folderSelectionState,
  FolderState,
  openPane,
  primarySelectedItemNameForFolder,
  selectItem,
  addItemToMultiSelect,
  removeItemFromMultiSelect,
  multiSelectedItemsForFolder,
} from '../../state/explorer';
import FolderItem from './FolderItem';
import FolderItemGrid from './FolderItemGrid';

interface OwnProps {
  folderName: string;
  items: Pane[];
  darkItemTitles?: boolean;
  columnLayout?: boolean;
}

interface StateProps {
  selectedItemName: string;
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
  folderName,
  items = [],
  darkItemTitles,
  selectedItemName,
  multiSelectedItems,
  selectionState,
  folderActive,
  selectItem,
  addItemToMultiSelect,
  removeItemFromMultiSelect,
  openPane,
  clickFolderItemGridBackground,
  columnLayout,
}: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [folderItemRefs, setFolderItemRefs] = React.useState<{
    [name: string]: HTMLDivElement;
  }>({});

  const setRef = (name: string) => (instance: HTMLDivElement) => {
    if (!instance) {
      return;
    }

    if (folderItemRefs[name] === instance) {
      return;
    }

    setFolderItemRefs({ ...folderItemRefs, [name]: instance });
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
    (e, itemName) => {
      if (folderActive) {
        e.stopPropagation();
      }

      openPane(itemName, folderName);
    },
    [folderActive, folderName, openPane]
  );

  const handleDrag = React.useCallback(
    ({ topLeft, bottomRight }) => {
      // fixme debounce this
      for (const [name, folderItem] of Object.entries(folderItemRefs)) {
        const itemRect = folderItem.getBoundingClientRect();
        const itemIsWithinDragSelectArea = rectsOverlap(
          topLeft[0],
          topLeft[1],
          bottomRight[0],
          bottomRight[1],

          itemRect.x,
          itemRect.y,
          itemRect.x + itemRect.width,
          itemRect.y + itemRect.height
        );

        if (itemIsWithinDragSelectArea) {
          addItemToMultiSelect({ folderName, itemName: name });
        } else {
          removeItemFromMultiSelect({ folderName, itemName: name });
        }
      }

      return () => {};
    },
    [
      addItemToMultiSelect,
      folderItemRefs,
      folderName,
      removeItemFromMultiSelect,
    ]
  );

  return (
    <div style={{ height: '100%' }} ref={containerRef}>
      <DragSelect
        enabled={folderActive}
        // onStart={onStart}
        onDrag={handleDrag}
        // onEnd={onEnd}
        containerRef={containerRef}
      />

      <FolderItemGrid
        onBackgroundClick={() => {
          clickFolderItemGridBackground(folderName);
        }}
        columnLayout={columnLayout}
      >
        {items.map((item: Pane) => (
          <FolderItem
            ref={setRef(item.name)}
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
