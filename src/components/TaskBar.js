import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'react-jss';
import p from 'prop-types';

import { currentDate } from '../state/clock';
import {
  startMenuOpen,
  openStartMenu,
  closeStartMenu,
  taskbarClick
} from '../state/explorer';

import StartButton from './StartButton';
import StartMenu from './StartMenu';
import Clock from './Clock';

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#C3C7CB',
    borderTop: '1px solid white',
    // border shadow
    '&:before': {
      content: '""',
      position: 'absolute',
      top: -2,
      height: '1px',
      width: '100%',
      backgroundColor: '#C3C7CB'
    }
  },
  inner: {
    display: 'flex',
    height: '100%',
    padding: '2px'
  },
  leftMenuItems: {
    display: 'flex',
    height: '100%',
    flexGrow: 1
  },
  rightMenuItems: {
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-end',
    width: '50px'
  }
};

const TaskBar = ({ height = 20, ...props }) => (
  <div
    onClick={props.taskbarClick}
    className={props.classes.container}
    style={{
      height
    }}
  >
    <div className={props.classes.inner}>
      {props.startMenuOpen && (
        <StartMenu
          bottom={height - 4}
          items={props.startMenuItems}
          onRequestClose={props.closeStartMenu}
        />
      )}
      <div className={props.classes.leftMenuItems}>
        <StartButton
          down={props.startMenuOpen}
          onClick={
            props.startMenuOpen ? props.closeStartMenu : props.openStartMenu
          }
        />
      </div>
      <div className={props.classes.rightMenuItems}>
        <Clock currentDate={props.currentDate} />
      </div>
    </div>
  </div>
);

TaskBar.propTypes = {
  classes: p.objectOf(p.string),
  startMenuItems: p.arrayOf(p.object).isRequired,
  startMenuOpen: p.bool,
  openStartMenu: p.func.isRequired,
  closeStartMenu: p.func.isRequired,
  taskbarClick: p.func.isRequired,
  currentDate: p.instanceOf(Date).isRequired
};

export default compose(
  withStyles(styles),
  connect(
    state => ({
      currentDate: currentDate(state),
      startMenuOpen: startMenuOpen(state)
    }),
    {
      openStartMenu,
      closeStartMenu,
      taskbarClick
    }
  )
)(TaskBar);

// on click of taskbar/desktop components, fire some action. can be handled by
// start menu reducer to close menu. make sure to stop propagation on clicks
// to start menu and its own items so they dont reach desktop.