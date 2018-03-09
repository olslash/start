import React from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';
import cx from 'classnames';

const styles = {
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
  outerBorderLite: {
    borderLeft: 'none',
    borderTop: 'none',
  },
  innerBorder: {
    height: '100%',
    width: '100%',

    borderLeft: '1px solid white',
    borderTop: '1px solid white',

    boxShadow: '0.5px 0.5px 0 0.5px #868A8E'
  }
};

const WindowBase = ({ classes, className, style, innerStyle, children, button }) => (
  <div className={className} style={style}>
    <div className={cx(classes.outerBorder, {
      [classes.outerBorderLite]: button
    })}>
      <div className={classes.innerBorder} style={innerStyle}>
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
