import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import p from 'prop-types';

import {
  primarySelectedItemIdForFolder,
  folderSelectionState,
  selectItem,
  deselectItem,
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
  selectItem,
  deselectItem
}) => (
  <div style={{ height: '100%' }}>
    <FolderItemGrid
      onBackgroundClick={() => deselectItem(folderId)}
      columnLayout
    >
      {items.map(item => (
        <FolderItem
          {...item}
          id={item.id}
          key={item.id}
          darkTitle={darkItemTitles}
          selected={selectedItemId === item.id}
          partialSelected={selectionState === inactive_folder_state}
          onClick={itemId => selectItem({ folderId, itemId })}
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
  selectItem: p.func.isRequired,
  deselectItem: p.func.isRequired
};

export default compose(
  connect(
    (state, ownProps) => ({
      selectedItemId: primarySelectedItemIdForFolder(state, ownProps.folderId),
      selectionState: folderSelectionState(state, ownProps.folderId)
    }),
    { selectItem, deselectItem }
  )
)(FolderContents);
