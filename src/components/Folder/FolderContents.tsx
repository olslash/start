import * as React from 'react';
import { connect } from 'react-redux';
import { useIntersection } from 'use-intersection';
import DragSelect from 'start/components/DragSelect';
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
} from '../../state/explorer';
import FolderItem from './FolderItem';
import FolderItemGrid from './FolderItemGrid';
import { select } from 'redux-saga/effects';

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
}

interface DispatchProps {
  selectItem(params: { folderName: string; itemName: string }): void;
  clickFolderItemGridBackground(folderName: string): void;
  openPane(name: string, openerName: string): void;
}

type Props = OwnProps & StateProps & DispatchProps;

const FolderContents: React.FunctionComponent<Props> = ({
  folderName,
  items = [],
  darkItemTitles,
  selectedItemName,
  selectionState,
  folderActive,
  selectItem,
  openPane,
  clickFolderItemGridBackground,
  columnLayout,
}: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dragSelectAreaRef = React.useRef<HTMLDivElement>(null);

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

    console.log('Setting new ref');
    setFolderItemRefs({ ...folderItemRefs, [name]: instance });
  };

  const handleFolderMouseDown = React.useCallback(
    (e, itemName) => {
      if (folderActive) {
        e.stopPropagation();
      }

      selectItem({ folderName: folderName, itemName });
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

  const handleDrag = React.useCallback(() => {
    if (!dragSelectAreaRef.current) {
      return;
    }

    // fixme debounce this
    for (const [name, folderItem] of Object.entries(folderItemRefs)) {
    }

    return () => {};
  }, [folderItemRefs]);

  return (
    <div style={{ height: '100%' }} ref={containerRef}>
      <DragSelect
        enabled={folderActive}
        // onStart={onStart}
        onDrag={handleDrag}
        // onEnd={onEnd}
        containerRef={containerRef}
        ref={dragSelectAreaRef}
      />

      <FolderItemGrid
        onBackgroundClick={() => {
          clickFolderItemGridBackground(folderName);
        }}
        columnLayout={columnLayout}
        // ref={folderItemGridRef}
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
            selected={selectedItemName === item.name && folderActive}
            partialSelected={
              selectionState === FolderState.INACTIVE && folderActive
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
    selectionState: folderSelectionState(state, ownProps.folderName),
    folderActive: focusedPaneName(state) === ownProps.folderName,
  };
}

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>(
  mapStateToProps,
  { selectItem, clickFolderItemGridBackground, openPane } as DispatchProps
)(FolderContents);
