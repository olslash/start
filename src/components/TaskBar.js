import React, { Component } from 'react';
import withStyles from 'react-jss';

import StartButton from './StartButton';

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
  padding: {
    height: '100%',
    padding: '1px'
  }
};

const TaskBar = ({ classes }) => (
  <div
    className={classes.container}
    style={{
      height: 20
    }}
  >
    <div className={classes.padding}>
      <StartButton down />
    </div>
  </div>
);

export default withStyles(styles)(TaskBar);
