import React, { Component } from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';

import background from '../../resources/startmenu-blank.png';

const styles = {
  container: {
    display: 'flex',
    height: '200px',
    position: 'absolute'
  }
};

const StartMenu = ({ classes, bottom }) => (
  <img
    src={background}
    className={classes.container}
    style={{
      bottom
    }}
  />
);

StartMenu.propTypes = {
  bottom: p.number.isRequired
};

export default withStyles(styles)(StartMenu);
