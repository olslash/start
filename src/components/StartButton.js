import React from 'react';

import startUp from '../../resources/start-up.png';
import startDown from '../../resources/start-down.png';
import ImageButton from './ImageButton';
import { clickoutIgnoreClassname } from './StartMenu';

const StartButtonUp = () => <img style={{ height: '100%' }} src={startUp} />;

const StartButtonDown = () => (
  <img style={{ height: '100%' }} src={startDown} />
);

const StartButton = ({ ...props }) => (
  <ImageButton
    {...props}
    renderUp={StartButtonUp}
    renderDown={StartButtonDown}
    // don't trigger clickout events for start menu
    // https://github.com/Pomax/react-onclickoutside#marking-elements-as-skip-over-this-one-during-the-event-loop
    className={clickoutIgnoreClassname}
  />
);

StartButton.propTypes = {};

export default StartButton;
