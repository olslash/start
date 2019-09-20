import React from 'react';
import cx from 'classnames';

import p from 'prop-types';

import styles from './folderItemGrid.scss';

const FolderItemGrid = ({ children, onBackgroundClick, columnLayout }) => (
  <div
    className={cx(styles.container, { [styles.columnLayout]: columnLayout })}
    onMouseDown={onBackgroundClick}
  >
    {children}
  </div>
);

FolderItemGrid.propTypes = {
  children: p.node,
  onBackgroundClick: p.func,
  columnLayout: p.bool
};

export default FolderItemGrid;
