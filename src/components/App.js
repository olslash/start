import React from 'react';

import startMenuItems from '../startMenuItems';
import desktopItems from '../desktopItems';

import myComputer from '../../resources/icon-my-computer.png';

import SVGDefinitions from './SVGDefinitions';
import TaskBar from './TaskBar';
import Desktop from './Desktop';

import styles from './app.scss';
import Folder from './Folder';

const testLog = msg => () => console.log(msg);

const App = () => (
  <div className={styles.container}>
    <SVGDefinitions />

    <Folder
      id="test-my-computer-folder"
      title="My Computer"
      active
      icon={myComputer}
      top={30}
      left={30}
      onMinimize={() => console.log('Minimize')}
      onMaximize={() => console.log('Maximize')}
      onClose={testLog('Close')}
    />
    <Desktop items={desktopItems} />
    <TaskBar startMenuItems={startMenuItems} />
  </div>
);

export default App;
