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
import WindowContainer from './WindowContainer';
import { Pane, Position } from 'start/types';
import { GlobalState } from 'start/state/globalState';

interface StateProps {
  openPaneItems: ReturnType<typeof openPaneItems>;
  desktopItems: Pane[];
  focusedPaneName: string;
  visiblePanes: Pane[];
}

interface DispatchProps {
  focusPane(paneName: string): void;
  minimizePane(paneName: string): void;
  maximizePane(paneName: string): void;
  closePane(paneName: string): void;
  movePane(paneName: string, positon: Position): void;
}

type Props = StateProps & DispatchProps;

const App: React.FunctionComponent<Props> = ({
  desktopItems,
  openPaneItems,
  focusedPaneName,
  visiblePanes,
  focusPane,
  minimizePane,
  maximizePane,
  closePane,
  movePane
}: Props) => (
  <div className={styles.container}>
    <SVGDefinitions />

    {visiblePanes.map((pane, i) => (
      <WindowContainer
        {...pane}
        zIndex={i + 100}
        focused={focusedPaneName === pane.name}
        key={pane.name}
        onFocus={focusPane}
        onMinimize={minimizePane}
        onMaximize={maximizePane}
        onClose={closePane}
        onMove={movePane}
      />
    ))}

    <Desktop items={desktopItems} onFocus={focusPane} />

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

export default connect(
  mapStateToProps,
  {
    focusPane,
    minimizePane,
    maximizePane,
    closePane,
    movePane
  } as DispatchProps
)(App);
