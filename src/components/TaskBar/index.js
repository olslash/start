import React from 'react';
import { map } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import p from 'prop-types';

import { currentDate } from '../../state/clock';
import {
  openPaneItems,
  focusedPaneId,
  startMenuOpen,
  startMenuActiveFolderPath,
  openStartMenu,
  closeStartMenu,
  setStartMenuActiveFolderPath
} from '../../state/explorer';

import StartButton from '../StartButton';
import StartMenu from '../StartMenu';
import TaskBarItem from './TaskBarItem';
import Clock from './Clock';

import styles from './taskBar.scss';

const TaskBar = ({ height = 20, items = {}, ...props }) => (
  <div
    className={styles.container}
    style={{
      height
    }}
    onClick={() => props.onFocus('taskbar')}
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
      <div className={styles.startButtonContainer}>
        <StartButton
          down={props.startMenuOpen}
          onClick={
            props.startMenuOpen ? props.closeStartMenu : props.openStartMenu
          }
        />
      </div>
      <div className={styles.taskBarItems}>
        {map(items, ({ title, icon, id, minimized }) => (
          <TaskBarItem
            title={title}
            icon={icon}
            active={props.focusedPaneId === id && !minimized}
            onClick={() => props.onFocus(id)}
            key={id}
          />
        ))}
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
  onFocus: p.func.isRequired,
  openStartMenu: p.func.isRequired,
  closeStartMenu: p.func.isRequired,
  setStartMenuActiveFolderPath: p.func.isRequired,
  currentDate: p.instanceOf(Date).isRequired,
  height: p.number,
  focusedPaneId: p.string,
  items: p.objectOf(
    p.shape({
      title: p.string.isRequired,
      icon: p.string.isRequired,
      id: p.string.isRequired,
      minimized: p.bool.isRequired
    })
  )
};

export default compose(
  connect(
    state => ({
      currentDate: currentDate(state),
      startMenuOpen: startMenuOpen(state),
      startMenuActiveFolderPath: startMenuActiveFolderPath(state),
      items: openPaneItems(state),
      focusedPaneId: focusedPaneId(state)
    }),
    {
      openStartMenu,
      closeStartMenu,
      setStartMenuActiveFolderPath
    }
  )
)(TaskBar);
