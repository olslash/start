import React, { Component } from 'react';

import startUp from '../../resources/start-up.png';
import startDown from '../../resources/start-down.png';
import ButtonBase from './ButtonBase';

const StartButtonUp = () => <img style={{ height: '100%' }} src={startUp} />;

const StartButtonDown = () => (
  <img style={{ height: '100%' }} src={startDown} />
);

const StartButton = ({ height, ...props }) => (
  <ButtonBase
    {...props}
    renderUp={StartButtonUp}
    renderDown={StartButtonDown}
  />
);

export default StartButton;
