import React from 'react';
import p from 'prop-types';

import FolderContents from './Folder/FolderContents';

const Desktop = ({ items = [] }) => (
  // fixme -- items from state
  <FolderContents items={items} folderId="desktop" />
);

Desktop.propTypes = {
  items: p.arrayOf(
    p.shape({
      title: p.string.isRequired,
      icon: p.string.isRequired
    })
  )
};

export default Desktop;
