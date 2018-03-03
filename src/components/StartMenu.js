import React from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';

import background from '../../resources/startmenu-blank.png';

import StartMenuItem from './StartMenuItem';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '200px',
    width: '138px',
    paddingLeft: '20px',
    paddingRight: '3px',
    paddingBottom: '3px',
    position: 'absolute',
    background: `url(${background}) no-repeat left center`,
    backgroundSize: 'contain'
  },
  top: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '30px'
  }
};

const StartMenu = ({ classes, bottom }) => (
  <div
    className={classes.container}
    style={{
      bottom
    }}
  >
    <div className={classes.top}>
      <StartMenuItem label="Top..."/>
    </div>
    <div className={classes.bottom}>
      <StartMenuItem icon="shutdown" label="Shut Down..." />
    </div>
  </div>
);

StartMenu.propTypes = {
  bottom: p.number.isRequired
};

export default withStyles(styles)(StartMenu);
