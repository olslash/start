import React from 'react';

import startMenuItems from '../startMenuItems';
import desktopItems from '../desktopItems';

import SVGDefinitions from './SVGDefinitions';
import TaskBar from './TaskBar';
import Desktop from './Desktop';

import styles from './app.scss';

const App = () => (
  <div className={styles.container}>
    <SVGDefinitions />
    <Desktop items={desktopItems} />
    <TaskBar startMenuItems={startMenuItems} />
  </div>
);

export default App;
