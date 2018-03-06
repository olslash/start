import React from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';

import background from '../../resources/clock-inset-blank.png';

const styles = {
  container: {
    width: '42px'
  },
  background: {
    height: '100%',
    background: `url(${background}) no-repeat left center`,
    backgroundSize: 'contain',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 5px'
  },
  time: {
    fontSize: '9px'
  }
};

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

const Clock = ({ classes, currentDate }) => (
  <div className={classes.container}>
    <div className={classes.background}>
      <span className={classes.time}>{formatTime(currentDate)}</span>
    </div>
  </div>
);

Clock.propTypes = {
  classes: p.objectOf(p.string),
  currentDate: p.instanceOf(Date).isRequired
};

export default withStyles(styles)(Clock);
