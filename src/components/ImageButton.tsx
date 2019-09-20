import * as React from 'react';
import * as p from 'prop-types'

const ImageButton = ({
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

ImageButton.propTypes = {
  down: p.bool,
  renderUp: p.func.isRequired,
  renderDown: p.func.isRequired,
  onClick: p.func,
  className: p.string
};

export default ImageButton;
