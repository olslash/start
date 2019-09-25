import { map } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { GlobalState } from 'start/state/globalState';
import { Pane, PaneState, StartMenuItem, WindowType } from 'start/types';
import { windowsAppIcons } from 'start/windowsApps';
import { currentDate } from '../../state/clock';
import {
  closeStartMenu,
  focusedPaneName,
  openPaneItems,
  openStartMenu,
  setStartMenuActiveFolderPath,
  startMenuActiveFolderPath,
  startMenuOpen
} from '../../state/explorer';
import StartButton from '../StartButton';
import StartMenu from '../StartMenu';
import Clock from './Clock';
import styles from './taskBar.scss';
import TaskBarItem from './TaskBarItem';

interface OwnProps {
  startMenuItems: StartMenuItem[];
  height?: number;
  onFocus(paneName: string): void;
}

interface StateProps {
  currentDate: Date;
  startMenuOpen: boolean;
  startMenuActiveFolderPath: number[];
  items: { [name: string]: Pane & PaneState };
  focusedPaneName: string;
}

interface DispatchProps {
  openStartMenu(): void;
  closeStartMenu(): void;
  setStartMenuActiveFolderPath(path: { depth: number; index: number }): void;
}

type Props = OwnProps & StateProps & DispatchProps;

const TaskBar: React.FunctionComponent<Props> = ({
  height = 20,
  items = {},
  ...props
}: Props) => (
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
        {map(items, item => (
          <TaskBarItem
            title={item.name}
            icon={
              item.type === WindowType.File
                ? windowsAppIcons[item.opensWith]
                : item.icon
            }
            active={props.focusedPaneName === item.name && !item.minimized}
            onClick={() => props.onFocus(item.name)}
            key={item.name}
          />
        ))}
      </div>
      <div className={styles.rightMenuItems}>
        <Clock currentDate={props.currentDate} />
      </div>
    </div>
  </div>
);

function mapStateToProps(state: GlobalState): StateProps {
  return {
    currentDate: currentDate(state),
    startMenuOpen: startMenuOpen(state),
    startMenuActiveFolderPath: startMenuActiveFolderPath(state),
    items: openPaneItems(state),
    focusedPaneName: focusedPaneName(state)
  };
}

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>(
  mapStateToProps,
  {
    openStartMenu,
    closeStartMenu,
    setStartMenuActiveFolderPath
  } as DispatchProps
)(TaskBar);
