import React from 'react';
import p from 'prop-types';

import styles from './clock.scss'

const formatTime = date => {
  const hours = date
    .getHours()
    .toString()
    .padStart(2, '0');

  const minutes = date
    .getMinutes()
    .toString()
    .padStart(2, '0');

  return `${hours}:${minutes}`;
};

const Clock = ({ currentDate }) => (
  <div className={styles.container}>
    <div className={styles.background}>
      <span className={styles.time}>{formatTime(currentDate)}</span>
    </div>
  </div>
);

Clock.propTypes = {
  currentDate: p.instanceOf(Date).isRequired
};

export default Clock;
