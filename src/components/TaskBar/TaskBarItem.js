import React from 'react';
import p from 'prop-types';

import ButtonBase from '../ButtonBase';
import styles from './taskBarItem.scss';

const TaskBarItem = ({ title }) => (
  <div className={styles.container}>
    <ButtonBase
      classes={{
        root: styles.button
      }}
    >
      <div className={styles.title}>
        {title}
      </div>
    </ButtonBase>
  </div>
);

TaskBarItem.propTypes = {
  title: p.string
};

export default TaskBarItem;
