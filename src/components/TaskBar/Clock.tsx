import * as React from 'react';
import * as p from 'prop-types'

import BorderedContainer from '../BorderedContainer';

import styles from './clock.scss';

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
  <BorderedContainer
    depth={1}
    classes={{ root: styles.container, outer: styles.content }}
    borderColors={[
      {
        topLeft: '#868a8e',
        bottomRight: 'white'
      }
    ]}
  >
    <span className={styles.time}>{formatTime(currentDate)}</span>
  </BorderedContainer>
);

Clock.propTypes = {
  currentDate: p.instanceOf(Date).isRequired
};

export default Clock;
