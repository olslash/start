import React, { Component } from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';

import StartButton from './StartButton';
import StartMenu from './StartMenu';

const styles = {
  container: {
    display: 'flex',
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
    height: '100%',
    padding: '2px'
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
      <StartButton down={startMenuOpen} />
    </div>
  </div>
);

TaskBar.propTypes = {
  classes: p.objectOf(p.string),
  startMenuOpen: p.bool
};

export default withStyles(styles)(TaskBar);
