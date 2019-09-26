import * as React from 'react';

export interface Props {
  down: boolean;
  renderUp(props: unknown): JSX.Element;
  renderDown(props: unknown): JSX.Element;
  onClick(e: React.MouseEvent<any, any>): void;
  className?: string;
}
const ImageButton: React.FunctionComponent<Props> = ({
  down,
  renderUp,
  renderDown,
  onClick,
  className,
  ...props
}: Props) => (
  <span onMouseDown={onClick} className={className}>
    {down ? renderDown(props) : renderUp(props)}
  </span>
);

export default ImageButton;
