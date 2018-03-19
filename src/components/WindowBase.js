import React from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';
import cx from 'classnames';

const styles = {
  containerButton: {
    height: '100%',
    width: '100%',
    boxShadow: '0px 0px 0 1px black'
  },
  outerBorder: {
    height: '100%',
    width: '100%',
    backgroundColor: '#C3C7CB',

    borderLeft: '1px solid #C3C7CB',
    borderTop: '1px solid #C3C7CB',

    boxShadow: '0.5px 0.5px 0 0.5px black',

    paddingBottom: '1px',
    paddingRight: '1px'
  },
  outerBorderButton: {
    borderLeft: 'none',
    borderTop: 'none',
    borderRight: '1px solid #868A8E',
    borderBottom: '1px solid #868A8E',
    boxShadow: '-0.5px -0.5px 0 0.5px white'
  },
  innerBorder: {
    height: '100%',
    width: '100%',

    borderLeft: '1px solid white',
    borderTop: '1px solid white',

    boxShadow: '0.5px 0.5px 0 0.5px #868A8E'
  },
  innerBorderButton: {
    boxShadow: 'none',
    borderLeft: 'none',
    borderTop: 'none'
  }
};

const WindowBase = ({
  classes,
  className,
  style,
  innerStyle,
  children,
  button,
  onClick
}) => (
  <div
    className={cx(className, cx({ [classes.containerButton]: button }))}
    style={style}
  >
    <div
      className={cx(classes.outerBorder, {
        [classes.outerBorderButton]: button
      })}
    >
      <div
        className={cx(classes.innerBorder, classes.inner, {
          [classes.innerBorderButton]: button
        })}
        style={innerStyle}
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
