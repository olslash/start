import React, { Component } from 'react';
import cx from 'classnames';
import withStyles from 'react-jss';
import p from 'prop-types';

import borderTop from '../../resources/start-submenu-top.png';
import borderMiddle from '../../resources/start-submenu-middle.png';
import borderBottom from '../../resources/start-submenu-bottom-130.png';

const styles = {
  container: {
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

const StartSubMenu = ({ classes }) => (
  <div className={classes.container}>
    <div className={classes.borderTop} />
    <div className={classes.content}>
      some content
    </div>
    <div className={classes.borderBottom} />
  </div>
);

export default withStyles(styles)(StartSubMenu);
