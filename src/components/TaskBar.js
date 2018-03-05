import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'react-jss';
import p from 'prop-types';

import { currentDate } from '../state/clock';
import {
  startMenuOpen,
  startMenuActiveFolderPath,
  openStartMenu,
  closeStartMenu,
  setStartMenuActiveFolderPath
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
          onSetActiveFolderPath={props.setStartMenuActiveFolderPath}
          activeFolderPath={props.startMenuActiveFolderPath}
          outsideClickIgnoreClass="start-clickout-ignore"
        />
      )}
      <div className={props.classes.leftMenuItems}>
        <StartButton
          down={props.startMenuOpen}
          onClick={
            props.startMenuOpen ? props.closeStartMenu : props.openStartMenu
          }
          // don't trigger clickout events for start menu
          // https://github.com/Pomax/react-onclickoutside#marking-elements-as-skip-over-this-one-during-the-event-loop
          className="start-clickout-ignore"
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
  startMenuActiveFolderPath: p.arrayOf(p.number).isRequired,
  openStartMenu: p.func.isRequired,
  closeStartMenu: p.func.isRequired,
  setStartMenuActiveFolderPath: p.func.isRequired,
  currentDate: p.instanceOf(Date).isRequired
};

export default compose(
  withStyles(styles),
  connect(
    state => ({
      currentDate: currentDate(state),
      startMenuOpen: startMenuOpen(state),
      startMenuActiveFolderPath: startMenuActiveFolderPath(state)
    }),
    {
      openStartMenu,
      closeStartMenu,
      setStartMenuActiveFolderPath
    }
  )
)(TaskBar);
