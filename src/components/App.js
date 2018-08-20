import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import p from 'prop-types';

import startMenuItems from '../startMenuItems';
import { itemsForFolder, openPaneItems } from '../state/explorer';

import SVGDefinitions from './SVGDefinitions';
import TaskBar from './TaskBar';
import Desktop from './Desktop';

import styles from './app.scss';
import Folder from './Folder';

const App = ({ desktopItems = [], openPaneItems = [] }) => (
  <div className={styles.container}>
    <SVGDefinitions />
    {filter(openPaneItems, { type: 'folder' }).map(folder => (
      <Folder {...folder} key={folder.id} />
    ))}
    <Desktop items={desktopItems} />
    <TaskBar startMenuItems={startMenuItems} />
  </div>
);

App.propTypes = {
  openPaneItems: p.objectOf(
    p.shape({
      type: p.string.isRequired,
      id: p.string.isRequired
    })
  ),
  desktopItems: p.arrayOf(p.object)
};

export default connect(state => ({
  openPaneItems: openPaneItems(state),
  desktopItems: itemsForFolder(state, 'desktop')
}))(App);
