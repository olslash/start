import React from 'react';
import p from 'prop-types';

import startUp from '../../resources/start-up.png';
import startDown from '../../resources/start-down.png';
import ButtonBase from './ButtonBase';
import { clickoutIgnoreClassname } from './StartMenu';

const StartButtonUp = () => <img style={{ height: '100%' }} src={startUp} />;

const StartButtonDown = () => (
  <img style={{ height: '100%' }} src={startDown} />
);

const StartButton = ({ ...props }) => (
  <ButtonBase
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
