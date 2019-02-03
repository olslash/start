import React from 'react';
import { connect } from 'react-redux';
import { filter, get, sortBy } from 'lodash';
import p from 'prop-types';

import startMenuItems from '../startMenuItems';
import {
  focusPane,
  focusedPaneId,
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

const App = ({
  desktopItems = [],
  openPaneItems = [],
  focusedPaneId,
  visiblePanes,
  focusPane,
  minimizePane,
  maximizePane,
  closePane,
  movePane
}) => (
  <div className={styles.container}>
    <SVGDefinitions />
    {visiblePanes.map(pane => (
      <WindowContainer
        {...pane}
        focused={focusedPaneId === pane.id}
        key={pane.id}
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
      onFocus={id => {
        focusPane(id);

        const paneIsMinimized = !!get(openPaneItems, [id, 'minimized']);
        if (paneIsMinimized) {
          // win95 behavior: clicking a taskbar item doesn't minimize the pane
          // like it would in later releases
          minimizePane(id);
        }
      }}
    />
  </div>
);

const paneType = p.shape({
  type: p.string.isRequired,
  id: p.string.isRequired
});

App.propTypes = {
  openPaneItems: p.objectOf(paneType),
  desktopItems: p.arrayOf(p.object),
  focusedPaneId: p.string,
  visiblePanes: p.arrayOf(paneType),
  focusPane: p.func.isRequired,
  minimizePane: p.func.isRequired,
  maximizePane: p.func.isRequired,
  closePane: p.func.isRequired,
  movePane: p.func.isRequired
};

export default connect(
  state => ({
    openPaneItems: openPaneItems(state),
    desktopItems: itemsForFolder(state, 'desktop'),
    focusedPaneId: focusedPaneId(state),
    visiblePanes: sortBy(
      filter(openPaneItems(state), { minimized: false }),
      // sort panes (for z-index precedence) by their index in focusedPaneOrder
      ({ id }) => focusedPaneOrder(state).indexOf(id)
    ).reverse()
  }),
  { focusPane, minimizePane, maximizePane, closePane, movePane }
)(App);
