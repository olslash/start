import React, { Component } from 'react';
import p from 'prop-types';

import startUp from '../../resources/start-up.png';
import startDown from '../../resources/start-down.png';
import ButtonBase from './ButtonBase';

const StartButtonUp = () => <img style={{ height: '100%' }} src={startUp} />;

const StartButtonDown = () => (
  <img style={{ height: '100%' }} src={startDown} />
);

const StartButton = ({ ...props }) => (
  <ButtonBase
    {...props}
    renderUp={StartButtonUp}
    renderDown={StartButtonDown}
  />
);

StartButton.propTypes = {};

export default StartButton;
