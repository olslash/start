import React, { Component } from 'react';
import withStyles from 'react-jss';

import TaskBar from './TaskBar';
import Desktop from './Desktop';

const styles = {
  '@global': {
    '*': {
      boxSizing: 'border-box'
    }
  },

  container: {
    height: '300px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#008080',
    fontFamily: 'sans'
  }
};

const App = ({ classes }) => (
  <div className={classes.container}>
    <Desktop />
    <TaskBar />
  </div>
);

export default withStyles(styles)(App);
