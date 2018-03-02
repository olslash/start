import React, { Component } from 'react';
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
    // fixme -- fix a pixel number font
    // fontFamily: 'px1'
    fontSize: '10px'
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

// fixme -- update on timer via redux state
const Clock = ({ classes, date = new Date() }) => (
  <div className={classes.container}>
    <div className={classes.background}>
      <span className={classes.time}>{formatTime(date)}</span>
    </div>
  </div>
);

Clock.propTypes = {
  classes: p.objectOf(p.string),
  startMenuOpen: p.bool
};

export default withStyles(styles)(Clock);
