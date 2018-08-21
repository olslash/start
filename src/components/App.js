import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import p from 'prop-types';

import startMenuItems from '../startMenuItems';
import {
  focusPane,
  itemsForFolder,
  openPaneItems,
  minimizePane,
  maximizePane
} from '../state/explorer';

import SVGDefinitions from './SVGDefinitions';
import TaskBar from './TaskBar';
import Desktop from './Desktop';

import styles from './app.scss';
import Folder from './Folder';

const App = ({
  desktopItems = [],
  openPaneItems = [],
  focusPane,
  minimizePane,
  maximizePane
}) => (
  <div className={styles.container}>
    <SVGDefinitions />
    {filter(openPaneItems, { type: 'folder' }).map(folder => (
      <Folder
        {...folder}
        key={folder.id}
        onFocus={focusPane}
        onMinimize={minimizePane}
        onMaximize={maximizePane}
      />
    ))}
    <Desktop items={desktopItems} onFocus={focusPane} />
    <TaskBar startMenuItems={startMenuItems} onFocus={focusPane} />
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
  focusPane: p.func.isRequired,
  minimizePane: p.func.isRequired,
  maximizePane: p.func.isRequired
};

export default connect(
  state => ({
    openPaneItems: openPaneItems(state),
    desktopItems: itemsForFolder(state, 'desktop')
  }),
  { focusPane, minimizePane, maximizePane }
)(App);
