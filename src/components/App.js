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
  closePane
} from '../state/explorer';

import SVGDefinitions from './SVGDefinitions';
import TaskBar from './TaskBar';
import Desktop from './Desktop';

import styles from './app.scss';
import Folder from './Folder';

const App = ({
  desktopItems = [],
  openPaneItems = [],
  focusedPaneId,
  focusedPaneOrder,
  focusPane,
  minimizePane,
  maximizePane,
  closePane
}) => (
  <div className={styles.container}>
    <SVGDefinitions />
    {sortBy(
      filter(openPaneItems, { type: 'folder', minimized: false }),
      // sort folders (for z-index precedence) by their index in focusedPaneOrder
      ({ id }) => focusedPaneOrder.indexOf(id)
    )
      .reverse()
      .map(folder => (
        <Folder
          {...folder}
          focused={focusedPaneId === folder.id}
          key={folder.id}
          onFocus={focusPane}
          onMinimize={minimizePane}
          onMaximize={maximizePane}
          onClose={closePane}
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

App.propTypes = {
  openPaneItems: p.objectOf(
    p.shape({
      type: p.string.isRequired,
      id: p.string.isRequired
    })
  ),
  desktopItems: p.arrayOf(p.object),
  focusedPaneId: p.string,
  focusedPaneOrder: p.arrayOf(p.string),
  focusPane: p.func.isRequired,
  minimizePane: p.func.isRequired,
  maximizePane: p.func.isRequired,
  closePane: p.func.isRequired
};

App.defaultProps = {
  focusedPaneOrder: []
};

export default connect(
  state => ({
    openPaneItems: openPaneItems(state),
    desktopItems: itemsForFolder(state, 'desktop'),
    focusedPaneId: focusedPaneId(state),
    focusedPaneOrder: focusedPaneOrder(state)
  }),
  { focusPane, minimizePane, maximizePane, closePane }
)(App);
