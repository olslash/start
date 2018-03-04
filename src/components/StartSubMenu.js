import React, { Component } from 'react';
import cx from 'classnames';
import withStyles from 'react-jss';
import p from 'prop-types';

import borderTop from '../../resources/start-submenu-top.png';
import borderMiddle from '../../resources/start-submenu-middle.png';
import borderBottom from '../../resources/start-submenu-bottom.png';

const styles = {
  container: {
    position: 'absolute',
    width: '140px'
  },
  borderTop: {
    background: `url(${borderTop}) no-repeat left center`,
    backgroundSize: 'contain',
    height: '5px',
    width: '130px'
  },
  content: {
    background: `url(${borderMiddle}) repeat-y left center`,
    backgroundSize: 'contain',
    width: '130px'
  },
  borderBottom: {
    background: `url(${borderBottom}) no-repeat left center`,
    backgroundSize: 'contain',
    height: '5px',
    width: '130px'
  }
};

const StartSubMenu = ({ items, classes, rightOffset = 0 }) => (
  <div
    className={classes.container}
    style={{
      top: -5,
      right: -rightOffset
    }}
  >
    <div className={classes.borderTop} />
    <div className={classes.content}>{items}</div>
    <div className={classes.borderBottom} />
  </div>
);

StartSubMenu.propTypes = {
  items: p.arrayOf(p.node).isRequired,
  rightOffset: p.number
};

export default withStyles(styles)(StartSubMenu);
