import cx from 'classnames';
import * as React from 'react';

import styles from './index.scss';

interface Props {
  height: number;
}

const MenuBar: React.FunctionComponent<Props> = ({ height }) => (
  <div className={cx(styles.container)} style={{ height }}>
    <p className={cx(styles.button, styles.active)}>File</p>
    <p className={styles.button}>Edit</p>
    <p className={styles.button}>View</p>
    <p className={cx(styles.button, styles.active)}>Help</p>
  </div>
);

export default MenuBar;
