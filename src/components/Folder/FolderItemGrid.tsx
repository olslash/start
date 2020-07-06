import cx from 'classnames';
import * as React from 'react';
import styles from './folderItemGrid.scss';

interface Props {
  onBackgroundClick(): void;
  columnLayout?: boolean;
  children: React.ReactNode;
}

const FolderItemGrid = React.forwardRef<HTMLDivElement, Props>(
  ({ children, onBackgroundClick, columnLayout }, ref) => (
    <div
      className={cx(styles.container, { [styles.columnLayout]: columnLayout })}
      onMouseDown={onBackgroundClick}
      ref={ref}
    >
      {children}
    </div>
  )
);

FolderItemGrid.displayName = 'FolderItemGrid';

export default FolderItemGrid;
