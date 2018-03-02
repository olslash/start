import React, {Component} from 'react';
import withStyles from 'react-jss';

const styles = {
  container: {
    flexGrow: 1,
    width: '100%'
  }
};

const Desktop = ({classes}) => (
  <div
    className={classes.container}
  />
);

export default withStyles(styles)(Desktop);
