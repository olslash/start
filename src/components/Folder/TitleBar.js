import React from 'react';
import cx from 'classnames';
import withStyles from 'react-jss';
import p from 'prop-types';

import WindowBase from '../WindowBase';

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#868A8E',
    color: '#C3C7CB',
    height: '14px',
    lineHeight: '12px',
    fontSize: '10px',
    fontWeight: 'bold',
    padding: '1px 2px 1px 2px'
  },
  containerActive: {
    backgroundColor: '#0000AA',
    color: 'white'
  },
  leftContainer: {
    display: 'flex',

    flexGrow: 1
  },
  rightContainer: {
    display: 'flex'
  },
  title: {
    paddingLeft: '2px'
  },
  icon: {
    height: '100%'
  },
  button: {
    height: '11px',
    width: '11px',
    marginLeft: '1px'
  },
  closeButton: {
    marginLeft: '4px'
  }
};

const TitleBar = ({
  classes,
  title,
  active = false,
  icon,
  onMinimize,
  onMaximize,
  onClose
}) => (
  <div
    className={cx(classes.container, {
      [classes.containerActive]: active
    })}
  >
    <div className={classes.leftContainer}>
      <div>{icon && <img src={icon} className={classes.icon} />}</div>
      <span className={classes.title}>{title}</span>
    </div>
    <div className={classes.rightContainer}>
      <WindowBase button className={classes.button} />
      <WindowBase button className={classes.button} />
      <WindowBase button className={cx(classes.button, classes.closeButton)} />
    </div>
  </div>
);

TitleBar.propTypes = {
  title: p.string.isRequired,
  active: p.bool,
  icon: p.string,
  onMinimize: p.func,
  onMaximize: p.func,
  onClose: p.func
};

export default withStyles(styles)(TitleBar);
