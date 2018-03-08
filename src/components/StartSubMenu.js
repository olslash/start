import React, { Component } from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';

import WindowBase from './WindowBase';

const styles = {
  container: {
    position: 'absolute',
    width: '140px'
  }
};

const StartSubMenu = ({ items, classes, rightOffset = 0 }) => (
  <WindowBase
    className={classes.container}
    style={{
      top: -5,
      right: -rightOffset
    }}
  >
    {items}
  </WindowBase>
);

StartSubMenu.propTypes = {
  items: p.arrayOf(p.node).isRequired,
  rightOffset: p.number
};

export default withStyles(styles)(StartSubMenu);
