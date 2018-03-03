import React from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';

const styles = {
  container: {
    flexGrow: 1,
    width: '100%'
  }
};

const Desktop = ({ classes }) => <div className={classes.container} />;

Desktop.propTypes = {};

export default withStyles(styles)(Desktop);
