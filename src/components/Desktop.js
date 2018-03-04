import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'react-jss';
import p from 'prop-types';

import { desktopClick } from '../state/explorer';

const styles = {
  container: {
    flexGrow: 1,
    width: '100%'
  }
};

const Desktop = ({ classes, desktopClick }) => (
  <div className={classes.container} onClick={desktopClick} />
);

Desktop.propTypes = {
  desktopClick: p.func
};

export default compose(withStyles(styles), connect(null, { desktopClick }))(
  Desktop
);
