import * as React from 'react';
import { connect } from 'react-redux';
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
  selectItem
} from '../../state/explorer';
import FolderItem from './FolderItem';
import FolderItemGrid from './FolderItemGrid';
import DragSelect from 'start/components/DragSelect';

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
  columnLayout
}: Props) => {
  const folderItemRefs: {
    [name: string]: React.MutableRefObject<null>;
  } = {};

  items.forEach(item => (folderItemRefs[item.name] = React.useRef(null)));

  const [dragStartPosition, setDragStartPosition] = React.useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null
  });

  const onStart = React.useCallback(({ x, y }) => {
    setDragStartPosition({ x, y });
  }, []);

  const onDrag = React.useCallback(({ x, y }) => {}, []);

  const onEnd = React.useCallback(() => {}, []);

  return (
    // when i mousedown and hold on the folder background,
    // store the clientRect of each FolderItem (get a ref to each from FolderContents) by ID
    // then see which ones overlap and select them
    <>
      <DragSelect onStart={onStart} onDrag={onDrag} onEnd={onEnd} />

      <div style={{ height: '100%' }}>
        <FolderItemGrid
          onBackgroundClick={() => {
            clickFolderItemGridBackground(folderName);
          }}
          columnLayout={columnLayout}
        >
          {items.map((item: Pane) => (
            <FolderItem
              forwardedRef={folderItemRefs[item.name]}
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
              onMouseDown={(e, itemName) => {
                if (folderActive) {
                  e.stopPropagation();
                }

                selectItem({ folderName: folderName, itemName });
              }}
              onDoubleClick={(e, itemName) => {
                if (folderActive) {
                  e.stopPropagation();
                }

                openPane(itemName, folderName);
              }}
            />
          ))}
        </FolderItemGrid>
      </div>
    </>
  );
};

function mapStateToProps(state: GlobalState, ownProps: Props): StateProps {
  return {
    selectedItemName: primarySelectedItemNameForFolder(
      state,
      ownProps.folderName
    ),
    selectionState: folderSelectionState(state, ownProps.folderName),
    folderActive: focusedPaneName(state) === ownProps.folderName
  };
}

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>(
  mapStateToProps,
  { selectItem, clickFolderItemGridBackground, openPane } as DispatchProps
)(FolderContents);
