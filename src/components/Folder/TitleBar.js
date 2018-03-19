import React from 'react';
import cx from 'classnames';
import withStyles from 'react-jss';
import p from 'prop-types';

import WindowBase from '../WindowBase';

import closeIcon from '../../../resources/button-close.png';
import minimizeIcon from '../../../resources/button-minimize.png';
import maximizeIcon from '../../../resources/button-maximize.png';

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
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    paddingLeft: '2px'
  },
  icon: {
    height: '100%'
  },
  button: {
    height: '10px',
    width: '12px',
    marginLeft: '2px'
  },
  closeButton: {
    marginLeft: '4px'
  },
  buttonIcon: {
    height: '8px',
    width: '8px'
  },
  buttonIconContainer: {
    display: 'flex',
    alignItems: 'center'
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
      {onMinimize && (
        <WindowBase
          button
          className={classes.button}
          classes={{ inner: classes.buttonIconContainer }}
        >
          {<img src={minimizeIcon} className={classes.buttonIcon} />}
        </WindowBase>
      )}
      {onMaximize && (
        <WindowBase
          button
          className={classes.button}
          classes={{ inner: classes.buttonIconContainer }}
        >
          {<img src={maximizeIcon} className={classes.buttonIcon} />}
        </WindowBase>
      )}
      {onClose && (
        <WindowBase
          button
          className={cx(classes.button, classes.closeButton)}
          classes={{ inner: classes.buttonIconContainer }}
        >
          {<img src={closeIcon} className={classes.buttonIcon} />}
        </WindowBase>
      )}
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
