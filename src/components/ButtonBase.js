import React, { Component } from 'react';

const ButtonBase = ({ down, renderUp, renderDown }) => (
  down ? renderDown() : renderUp()
);

export default ButtonBase;
