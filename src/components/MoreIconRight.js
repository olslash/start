import React from 'react';
import cx from 'classnames';
import withStyles from 'react-jss';
import p from 'prop-types';

const styles = {
  arrowRight: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '3px 0 3px 3px',
    borderColor: 'transparent transparent transparent black'
  },
  inverted: {
    borderColor: 'transparent transparent transparent white'
  }
};

const MoreIconRight = ({ classes, inverted }) => (
  <div
    className={cx(classes.arrowRight, {
      [classes.inverted]: inverted
    })}
  />
);

MoreIconRight.propTypes = {
  inverted: p.bool
};

export default withStyles(styles)(MoreIconRight);
