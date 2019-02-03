import React from 'react';
import p from 'prop-types';
import cx from 'classnames';

// import screenDoor from '../../../resources/selected-overlay-screen-inverse-40.svg';
import icons from '../../../resources/icons';
import ButtonBase from '../ButtonBase';
import styles from './taskBarItem.scss';

const TaskBarItem = ({ title, active, onClick, icon }) => (
  <div className={styles.container}>
    <ButtonBase
      classes={{
        root: styles.button
      }}
      depressed={active}
      onClick={onClick}
      stopClickPropagation
    >
      <div className={cx(styles.title, { [styles.active]: active })}>
        <img src={icons[icon]} />
        <span>{title}</span>
      </div>
    </ButtonBase>
  </div>
);

TaskBarItem.propTypes = {
  title: p.string,
  icon: p.string.isRequired,
  active: p.bool,
  onClick: p.func
};

export default TaskBarItem;
