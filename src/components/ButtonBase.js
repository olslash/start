import React from 'react';
import p from 'prop-types';

const ButtonBase = ({
  down,
  renderUp,
  renderDown,
  onClick,
  className,
  ...props
}) => (
  <span onMouseDown={onClick} className={className}>
    {down ? renderDown(props) : renderUp(props)}
  </span>
);

ButtonBase.propTypes = {
  down: p.bool,
  renderUp: p.func.isRequired,
  renderDown: p.func.isRequired,
  onClick: p.func,
  className: p.string
};

export default ButtonBase;
