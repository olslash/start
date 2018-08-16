import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import p from 'prop-types';

import { currentDate } from '../state/clock';
import {
  focusPane,
  startMenuOpen,
  startMenuActiveFolderPath,
  openStartMenu,
  closeStartMenu,
  setStartMenuActiveFolderPath
} from '../state/explorer';

import StartButton from './StartButton';
import StartMenu from './StartMenu';
import Clock from './Clock';

import styles from './taskBar.scss';

const TaskBar = ({ height = 20, ...props }) => (
  <div
    className={styles.container}
    style={{
      height
    }}
    onClick={() => props.focusPane('taskbar')}
  >
    <div className={styles.inner}>
      {props.startMenuOpen && (
        <StartMenu
          bottom={height - 4}
          items={props.startMenuItems}
          onRequestClose={props.closeStartMenu}
          onSetActiveFolderPath={props.setStartMenuActiveFolderPath}
          activeFolderPath={props.startMenuActiveFolderPath}
        />
      )}
      <div className={styles.leftMenuItems}>
        <StartButton
          down={props.startMenuOpen}
          onClick={
            props.startMenuOpen ? props.closeStartMenu : props.openStartMenu
          }
        />
      </div>
      <div className={styles.rightMenuItems}>
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
  focusPane: p.func.isRequired,
  openStartMenu: p.func.isRequired,
  closeStartMenu: p.func.isRequired,
  setStartMenuActiveFolderPath: p.func.isRequired,
  currentDate: p.instanceOf(Date).isRequired,
  height: p.number
};

export default compose(
  connect(
    state => ({
      currentDate: currentDate(state),
      startMenuOpen: startMenuOpen(state),
      startMenuActiveFolderPath: startMenuActiveFolderPath(state)
    }),
    {
      focusPane,
      openStartMenu,
      closeStartMenu,
      setStartMenuActiveFolderPath
    }
  )
)(TaskBar);
