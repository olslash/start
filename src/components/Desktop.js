import React from 'react';
import p from 'prop-types';

import FolderContents from './Folder/FolderContents';

const Desktop = ({ items = [], onFocus }) => (
  <div onMouseDown={() => onFocus('desktop')} style={{ height: '100%' }}>
    <FolderContents items={items} folderId="desktop" columnLayout />
  </div>
);

Desktop.propTypes = {
  items: p.arrayOf(
    p.shape({
      type: p.string,
      id: p.string,
      title: p.string,
      icon: p.string
    })
  ),
  onFocus: p.func.isRequired
};

export default Desktop;
