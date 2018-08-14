import React from 'react';

import p from 'prop-types';

import styles from './folderItemGrid.scss';

const FolderItemGrid = ({ children, onBackgroundClick }) => (
  <div className={styles.container} onClick={onBackgroundClick}>
    {children}
  </div>
);

FolderItemGrid.propTypes = {
  children: p.node,
  onBackgroundClick: p.func
};

export default FolderItemGrid;
