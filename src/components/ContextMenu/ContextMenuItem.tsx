import cx from 'classnames';
import * as React from 'react';
import UnderlinedText from 'start/components/UnderlinedText';

import styles from './index.scss';

interface Props {
  title: string;
  underlineIndex: number;
  active: boolean;
  // moreIcon: boolean;
}

const ContextMenuItem: React.FunctionComponent<Props> = ({
  title,
  underlineIndex,
  active,
  // moreIcon,
}) => {
  return (
    <div className={cx(styles.item, { [styles.active]: active })}>
      <UnderlinedText title={title} underlineIndex={underlineIndex} />

      {/* {moreIcon && } */}
    </div>
  );
};

export default ContextMenuItem;
