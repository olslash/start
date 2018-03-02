import React, { Component } from 'react';
import p from 'prop-types';

const ButtonBase = ({ down, renderUp, renderDown }) =>
  down ? renderDown() : renderUp();

ButtonBase.propTypes = {
  down: p.bool,
  renderUp: p.func.isRequired,
  renderDown: p.func.isRequired
};

export default ButtonBase;
