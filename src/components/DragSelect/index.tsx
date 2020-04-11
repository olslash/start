import * as React from 'react';
import styles from './index.scss';
import useMouseDown from './useMouseDown';
import useMousePosition from './useMousePosition';

interface Props {
  onStart: (mousePosition: { x: number; y: number }) => void;
  onDrag: (mousePosition: { x: number; y: number }) => void;
  onEnd: () => void;
}

const DragSelect: React.FunctionComponent<Props> = props => {
  const { x: mouseX, y: mouseY } = useMousePosition();
  const isMouseDown = useMouseDown();

  const [dragStartPosition, setDragStartPosition] = React.useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null
  });

  React.useEffect(() => {
    if (isMouseDown) {
      props.onDrag({ x: mouseX, y: mouseY });
    }
  }, [mouseX, mouseY]);

  React.useEffect(() => {
    setDragStartPosition({ x: mouseX, y: mouseY });
    isMouseDown ? props.onStart({ x: mouseX, y: mouseY }) : props.onEnd();
  }, [isMouseDown]);

  return (
    <div
      style={{
        // fixme 0 falsy
        top: dragStartPosition.y || undefined,
        left: dragStartPosition.x || undefined,
        width: -100,
        height: 50
      }}
      className={styles.container}
    />
  );
};

export default DragSelect;
