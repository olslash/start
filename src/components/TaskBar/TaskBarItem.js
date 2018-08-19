import React from 'react';
import p from 'prop-types';
import cx from 'classnames';

import ButtonBase from '../ButtonBase';
import styles from './taskBarItem.scss';

const TaskBarItem = ({ title, active }) => (
  <div className={styles.container}>
    <ButtonBase
      classes={{
        root: styles.button
      }}
      depressed={active}
    >
      <div className={cx(styles.title, { [styles.active]: active })}>
        {title}
      </div>
    </ButtonBase>
  </div>
);

TaskBarItem.propTypes = {
  title: p.string,
  active: p.bool
};

export default TaskBarItem;
