import * as React from 'react';
import { connect } from 'react-redux';
import { filter, get, sortBy } from 'lodash';

import startMenuItems from '../startMenuItems';
import {
  focusPane,
  focusedPaneName,
  focusedPaneOrder,
  itemsForFolder,
  openPaneItems,
  minimizePane,
  maximizePane,
  closePane,
  movePane
} from '../state/explorer';

import SVGDefinitions from './SVGDefinitions';
import TaskBar from './TaskBar';
import Desktop from './Desktop';

import styles from './app.scss';
import Folder from './Folder';
import { Pane, Position, WindowType, PaneState, File } from 'start/types';
import { GlobalState } from 'start/state/globalState';
import { windowsApps, windowsAppIcons } from 'start/windowsApps';

interface StateProps {
  openPaneItems: ReturnType<typeof openPaneItems>;
  desktopItems: Pane[];
  focusedPaneName: string;
  visiblePanes: (Pane & PaneState)[];
}

interface DispatchProps {
  focusPane(paneName: string): void;
  minimizePane(paneName: string): void;
  maximizePane(paneName: string): void;
  closePane(paneName: string): void;
  movePane(paneName: string, positon: Position): void;
}

type Props = StateProps & DispatchProps;

const App: React.FunctionComponent<Props> = (props: Props) => (
  <div className={styles.container}>
    <SVGDefinitions />

    {props.visiblePanes.map((pane, i) =>
      pane.type === WindowType.Folder ? (
        <Folder
          {...props}
          {...pane}
          zIndex={i + 100}
          focused={props.focusedPaneName === pane.name}
          key={pane.name}
          onFocus={focusPane}
          onMinimize={minimizePane}
          onMaximize={maximizePane}
          onClose={closePane}
          onMove={movePane}
        />
      ) : (
        renderApp(pane, i, props)
      )
    )}

    <Desktop items={props.desktopItems} onFocus={props.focusPane} />

    <TaskBar
      startMenuItems={startMenuItems}
      onFocus={(name: string) => {
        focusPane(name);

        const paneIsMinimized = !!get(openPaneItems, [name, 'minimized']);
        if (paneIsMinimized) {
          // win95 behavior: clicking a taskbar item doesn't minimize the pane
          // like it would in later releases
          minimizePane(name);
        }
      }}
    />
  </div>
);

function renderApp(pane: File & PaneState, i: number, props: Props) {
  const AppComponent = windowsApps[pane.opensWith];

  return (
    <AppComponent
      {...pane}
      icon={windowsAppIcons[pane.opensWith]}
      zIndex={i + 100}
      focused={props.focusedPaneName === pane.name}
      key={pane.name}
      onFocus={focusPane}
      onMinimize={minimizePane}
      onMaximize={maximizePane}
      onClose={closePane}
      onMove={movePane}
    />
  );
}

function mapStateToProps(state: GlobalState): StateProps {
  return {
    openPaneItems: openPaneItems(state),
    desktopItems: itemsForFolder(state, 'desktop') || [],
    focusedPaneName: focusedPaneName(state),
    visiblePanes: sortBy(
      filter(openPaneItems(state), { minimized: false }),
      // sort panes (for z-index precedence) by their index in focusedPaneOrder
      ({ name }) => focusedPaneOrder(state).indexOf(name)
    ).reverse()
  };
}

export default connect<StateProps, DispatchProps, {}, GlobalState>(
  mapStateToProps,
  {
    focusPane,
    minimizePane,
    maximizePane,
    closePane,
    movePane
  } as DispatchProps
)(App);
