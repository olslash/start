import * as React from 'react';
import styles from './index.scss';
import useMouseDown from './useMouseDown';
import useMousePosition from './useMousePosition';

interface Props {
  onStart: (mousePosition: { x: number; y: number }) => void;
  onDrag: (mousePosition: { x: number; y: number }) => void;
  onEnd: () => void;
  containerRef: React.MutableRefObject<HTMLElement>;
}

const DragSelect: React.FunctionComponent<Props> = props => {
  const { x: mouseX, y: mouseY } = useMousePosition(props.containerRef);
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
    if (isMouseDown) {
      setDragStartPosition({ x: mouseX, y: mouseY });
      props.onStart({ x: mouseX, y: mouseY });
    } else {
      setDragStartPosition({ x: null, y: null });
      props.onEnd();
    }
  }, [isMouseDown]);

  if (
    !(
      typeof dragStartPosition.x === 'number' &&
      typeof dragStartPosition.y === 'number'
    )
  ) {
    return null;
  }

  return (
    <div
      style={{
        // fixme 0 falsy

        top: dragStartPosition.y || undefined,
        left: dragStartPosition.x || undefined,
        width: mouseX - dragStartPosition.x,
        height: mouseY - dragStartPosition.y
      }}
      className={styles.container}
    />
  );
};

export default DragSelect;
