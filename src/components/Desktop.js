import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import p from 'prop-types';

import myComputer from '../../resources/icon-my-computer.png';
import {
  primarySelectedItemIdForFolder,
  folderSelectionState,
  selectItem,
  deselectItem,
  active_folder_state,
  inactive_folder_state
} from '../state/explorer';

import Folder from './Folder';
import FolderItem from './FolderItem';
import FolderItemGrid from './FolderItemGrid';

const testLog = msg => () => console.log(msg);

const Desktop = ({
  items = [],
  selectedItemId,
  selectionState,
  selectItem,
  deselectItem
}) => (
  <div style={{ height: '100%' }}>
    <FolderItemGrid onBackgroundClick={() => deselectItem('desktop')}>
      {items.map(item => (
        <FolderItem
          {...item}
          key={item.id}
          selected={selectedItemId === item.id}
          partialSelection={selectionState === inactive_folder_state}
          onClick={() => selectItem({ folderId: 'desktop', itemId: item.id })}
        />
      ))}
    </FolderItemGrid>

    {false && (
      <Folder
        title="My Computer"
        active
        icon={myComputer}
        top={30}
        left={30}
        onMinimize={() => console.log('Minimize')}
        onMaximize={() => console.log('Maximize')}
        onClose={testLog('Close')}
      />
    )}
  </div>
);

Desktop.propTypes = {
  items: p.arrayOf(
    p.shape({
      title: p.string.isRequired,
      icon: p.string.isRequired
    })
  ),
  selectedItemId: p.string,
  selectionState: p.oneOf([active_folder_state, inactive_folder_state])
    .isRequired,
  selectItem: p.func.isRequired,
  deselectItem: p.func.isRequired
};

export default compose(
  connect(
    state => ({
      selectedItemId: primarySelectedItemIdForFolder(state, 'desktop'),
      selectionState: folderSelectionState(state, 'desktop')
    }),
    { selectItem, deselectItem }
  )
)(Desktop);
