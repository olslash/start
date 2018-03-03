import React from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';

import TaskBar from './TaskBar';
import Desktop from './Desktop';

const styles = {
  '@global': {
    '*': {
      boxSizing: 'border-box',
      cursor: 'default'
    },

  },

  '@font-face': [
    {
      fontFamily: 'px1',
      src: 'url(resources/hellovetica.ttf)'
    },
    {
      fontFamily: 'micro',
      src: 'url(resources/micross.ttf)'
    }
  ],

  container: {
    height: '300px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#008080',
    fontFamily: 'micro',
    '-webkit-font-smoothing': 'none'
  }
};

const App = ({ classes }) => (
  <div className={classes.container}>
    <Desktop />
    <TaskBar startMenuOpen />
  </div>
);

App.propTypes = {
  classes: p.objectOf(p.string)
};

export default withStyles(styles)(App);
