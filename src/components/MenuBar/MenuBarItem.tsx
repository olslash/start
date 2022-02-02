import cx from 'classnames';
import * as React from 'react';
import UnderlinedText from 'start/components/UnderlinedText';

import styles from './index.scss';

interface Props {
  active?: boolean;
  title: string;
  underlineIndex: number;
}

const MenuBarItem: React.FunctionComponent<Props> = ({
  active,
  title,
  underlineIndex,
}) => {
  return (
    <p className={cx(styles.button, { [styles.active]: active })}>
      <UnderlinedText title={title} underlineIndex={underlineIndex} />
    </p>
  );
};

export default MenuBarItem;
