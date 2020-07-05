import * as React from 'react';
import styles from './index.scss';
import useMouseDown from './useMouseDown';
import useMousePosition from './useMousePosition';

interface Props {
  active: boolean;
  onStart: (mousePosition: { x: number; y: number }) => void;
  onDrag: (mousePosition: { x: number; y: number }) => void;
  onEnd: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

const DragSelect: React.FunctionComponent<Props> = ({
  active,
  containerRef,
  onDrag,
  onStart,
  onEnd,
}) => {
  const { x: mouseX, y: mouseY } = useMousePosition(containerRef);
  const isMouseDown = useMouseDown();

  const [
    { x: dragStartX, y: dragStartY },
    setDragStartPosition,
  ] = React.useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null,
  });

  React.useEffect(() => {
    if (isMouseDown) {
      onDrag({ x: mouseX, y: mouseY });
    }
  }, [mouseX, mouseY, isMouseDown, onDrag]);

  React.useEffect(() => {
    if (isMouseDown) {
      setDragStartPosition({ x: mouseX, y: mouseY });
      onStart({ x: mouseX, y: mouseY });
    } else {
      setDragStartPosition({ x: null, y: null });
      onEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMouseDown]);

  if (!active) {
    return null;
  }

  if (!(typeof dragStartX === 'number' && typeof dragStartY === 'number')) {
    return null;
  }

  const top = mouseY > dragStartY ? dragStartY : mouseY;
  const height =
    mouseY > dragStartY ? mouseY - dragStartY : dragStartY - mouseY;
  const left = mouseX > dragStartX ? dragStartX : mouseX;
  const width = mouseX > dragStartX ? mouseX - dragStartX : dragStartX - mouseX;

  return (
    <div
      style={{
        top,
        left,
        width,
        height,
      }}
      className={styles.container}
    />
  );
};

export default DragSelect;
