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

const StartSubMenu = ({ items, classes, style, rightOffset = 0 }) => (
  <WindowBase
    classes={{ root: classes.container }}
    style={{
      top: -3,
      right: -rightOffset,
      ...style
    }}
  >
    {items}
  </WindowBase>
);

StartSubMenu.propTypes = {
  items: p.arrayOf(p.node).isRequired,
  rightOffset: p.number,
  style: p.objectOf(p.any)
};

export default withStyles(styles)(StartSubMenu);
