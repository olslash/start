import cx from 'classnames';
import * as React from 'react';

import styles from './index.scss';

interface Props {
  height: number;
}

const MenuBar: React.FunctionComponent<Props> = ({ height, children }) => (
  <div className={cx(styles.container)} style={{ height }}>
    {children}
  </div>
);

export default MenuBar;
