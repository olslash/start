import React, { Component } from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';

import StartButton from './StartButton';
import StartMenu from './StartMenu';
import Clock from './Clock';

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#C3C7CB',
    borderTop: '1px solid white',
    // border shadow
    '&:before': {
      content: '""',
      position: 'absolute',
      top: -2,
      height: '1px',
      width: '100%',
      backgroundColor: '#C3C7CB'
    }
  },
  inner: {
    display: 'flex',
    height: '100%',
    padding: '2px'
  },
  leftMenuItems: {
    display: 'flex',
    height: '100%',
    flexGrow: 1
  },
  rightMenuItems: {
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-end',
    width: '50px'
  }
};

const taskBarHeight = 20;
const TaskBar = ({ classes, startMenuOpen }) => (
  <div
    className={classes.container}
    style={{
      height: taskBarHeight
    }}
  >
    <div className={classes.inner}>
      {startMenuOpen && <StartMenu bottom={taskBarHeight - 4}/>}
      <div className={classes.leftMenuItems}>
        <StartButton down={startMenuOpen} />
      </div>
      <div className={classes.rightMenuItems}>
        <Clock />
      </div>
    </div>
  </div>
);

TaskBar.propTypes = {
  classes: p.objectOf(p.string),
  startMenuOpen: p.bool
};

export default withStyles(styles)(TaskBar);
