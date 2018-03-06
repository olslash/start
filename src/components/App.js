import React from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';

import startMenuItems from '../startMenuItems';
import desktopItems from '../desktopItems';

import SVGDefinitions from './SVGDefinitions'
import TaskBar from './TaskBar';
import Desktop from './Desktop';

const styles = {
  '@global': {
    '*': {
      boxSizing: 'border-box',
      cursor: 'default'
    }
  },

  '@font-face': {
    fontFamily: 'micro',
    src: 'url(resources/micross.ttf)'
  },

  container: {
    height: '300px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#008080',
    fontFamily: 'micro',
    '-webkit-font-smoothing': 'none',
    imageRendering: 'pixelated'
  }
};

const App = ({ classes }) => (
  <div className={classes.container}>
    <SVGDefinitions/>
    <Desktop items={desktopItems} />
    <TaskBar startMenuItems={startMenuItems} />
  </div>
);

App.propTypes = {
  classes: p.objectOf(p.string)
};

export default withStyles(styles)(App);
