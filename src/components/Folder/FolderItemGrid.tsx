import cx from 'classnames';
import * as React from 'react';
import styles from './folderItemGrid.scss';

interface Props {
  onBackgroundClick(): void;
  columnLayout?: boolean;
}

const FolderItemGrid: React.FunctionComponent<Props> = ({
  children,
  onBackgroundClick,
  columnLayout
}) => (
  <div
    className={cx(styles.container, { [styles.columnLayout]: columnLayout })}
    onMouseDown={onBackgroundClick}
  >
    {children}
  </div>
);

export default FolderItemGrid;
