import React from 'react';
import p from 'prop-types';

const ButtonBase = ({ down, renderUp, renderDown, onClick, ...props }) => (
  <span onClick={onClick}>{down ? renderDown(props) : renderUp(props)}</span>
);

ButtonBase.propTypes = {
  down: p.bool,
  renderUp: p.func.isRequired,
  renderDown: p.func.isRequired,
  onClick: p.func
};

export default ButtonBase;
