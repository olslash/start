import * as React from 'react';
import BorderedContainer from '../BorderedContainer';
import styles from './clock.scss';

const formatTime = (date: Date) => {
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

interface Props {
  currentDate: Date;
}

const Clock: React.FunctionComponent<Props> = ({ currentDate }: Props) => (
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

export default Clock;
