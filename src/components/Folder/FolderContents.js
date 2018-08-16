import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import p from 'prop-types';

import {
  primarySelectedItemIdForFolder,
  folderSelectionState,
  focusedPaneId,
  selectItem,
  clickFolderItemGridBackground,
  active_folder_state,
  inactive_folder_state
} from '../../state/explorer';

import FolderItem from './FolderItem';
import FolderItemGrid from './FolderItemGrid';

const FolderContents = ({
  folderId,
  items = [],
  darkItemTitles,
  selectedItemId,
  selectionState,
  folderActive,
  selectItem,
  clickFolderItemGridBackground,
  columnLayout
}) => (
  <div style={{ height: '100%' }}>
    <FolderItemGrid
      onBackgroundClick={() => {
        clickFolderItemGridBackground(folderId);
      }}
      columnLayout={columnLayout}
    >
      {items.map(item => (
        <FolderItem
          {...item}
          id={item.id}
          key={item.id}
          darkTitle={darkItemTitles}
          selected={selectedItemId === item.id && folderActive}
          partialSelected={
            selectionState === inactive_folder_state && folderActive
          }
          onMouseDown={(e, itemId) => {
            if (folderActive) {
              e.stopPropagation();
            }
            selectItem({ folderId, itemId });
          }}
        />
      ))}
    </FolderItemGrid>
  </div>
);

FolderContents.propTypes = {
  folderId: p.string.isRequired,
  items: p.arrayOf(
    p.shape({
      title: p.string.isRequired,
      icon: p.string.isRequired
    })
  ),
  darkItemTitles: p.bool,
  selectedItemId: p.string,
  selectionState: p.oneOf([active_folder_state, inactive_folder_state])
    .isRequired,
  folderActive: p.bool,
  columnLayout: p.bool,
  selectItem: p.func.isRequired,
  clickFolderItemGridBackground: p.func.isRequired
};

export default compose(
  connect(
    (state, ownProps) => ({
      selectedItemId: primarySelectedItemIdForFolder(state, ownProps.folderId),
      selectionState: folderSelectionState(state, ownProps.folderId),
      folderActive: focusedPaneId(state) === ownProps.folderId
    }),
    { selectItem, clickFolderItemGridBackground }
  )
)(FolderContents);
