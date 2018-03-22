import React from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';
import cx from 'classnames';

const styles = {
  _container: {
    position: 'relative'
  },
  _containerButton: {
    boxShadow: '0px 0px 0 1px black'
  },
  _containerButtonDepressed: {
    boxShadow: '0px 0px 0 1px white'
  },
  _outerBorder: {
    height: '100%',
    width: '100%',
    backgroundColor: '#C3C7CB',

    borderLeft: '1px solid #C3C7CB',
    borderTop: '1px solid #C3C7CB',

    boxShadow: '0.5px 0.5px 0 0.5px black',

    paddingBottom: '1px',
    paddingRight: '1px'
  },
  _outerBorderButton: {
    borderLeft: 'none',
    borderTop: 'none',
    borderRight: '1px solid #868A8E',
    borderBottom: '1px solid #868A8E',
    boxShadow: '-0.5px -0.5px 0 0.5px white'
  },
  _outerBorderButtonDepressed: {
    boxShadow: '-0.5px -0.5px 0 0.5px black',
    borderRight: 'none',
    borderBottom: 'none',
    borderLeft: '1px solid #868A8E',
    borderTop: '1px solid #868A8E'
  },
  _innerBorder: {
    height: '100%',
    width: '100%',

    borderLeft: '1px solid white',
    borderTop: '1px solid white',

    boxShadow: '0.5px 0.5px 0 0.5px #868A8E'
  },
  _innerBorderButton: {
    boxShadow: 'none',
    borderLeft: 'none',
    borderTop: 'none'
  },
  _iconImgContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-0.5px' // deal with offset from drop shadows
  }
};

const WindowBase = ({
  classes,
  style = {},
  children,
  button,
  buttonDepressed = true,
  iconSrc,
  iconClassName,
  onClick
}) => (
  <div
    className={cx(classes.root, classes._container, {
      [classes._containerButton]: button,
      [classes._containerButtonDepressed]: buttonDepressed
    })}
    style={style}
  >
    <div className={classes._iconImgContainer}>
      <img src={iconSrc} className={classes.icon} />
    </div>
    <div
      className={cx(classes._outerBorder, {
        [classes._outerBorderButton]: button,
        [classes._outerBorderButtonDepressed]: buttonDepressed
      })}
    >
      <div
        className={cx(classes.inner, classes._innerBorder, {
          [classes._innerBorderButton]: button
        })}
      >
        {children}
      </div>
    </div>
  </div>
);

WindowBase.propTypes = {
  className: p.string,
  style: p.objectOf(p.any),
  innerStyle: p.objectOf(p.any),
  button: p.bool
};

export default withStyles(styles)(WindowBase);
