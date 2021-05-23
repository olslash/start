import * as React from 'react';
import useMouseDown from 'start/hooks/useMouseDown';
import useMousePosition from 'start/hooks/useMousePosition';
import styles from './index.scss';

type Point = [number, number];
interface Props {
  enabled?: boolean;
  onStart?: (mousePosition: Point) => void;
  onDrag?: (mousePosition: { topLeft: Point; bottomRight: Point }) => void;
  onEnd?: () => void;
  containerRef: React.RefObject<HTMLElement>;
}

const DragSelect: React.FC<Props> = ({
  enabled,
  containerRef,
  /**
   * Should be wrapped in useCallback
   */
  onDrag,
  /**
   * Should be wrapped in useCallback
   */
  onStart,
  /**
   * Should be wrapped in useCallback
   */
  onEnd,
}) => {
  const [isActive, setActive] = React.useState(false);
  const { x: mouseX, y: mouseY } = useMousePosition(containerRef);
  const isMouseDown = useMouseDown();

  const [[dragStartX, dragStartY], setDragStartPosition] =
    React.useState<Point>([0, 0]);

  React.useEffect(() => {
    if (isMouseDown) {
      if (!isActive) {
        setActive(true);

        setDragStartPosition([mouseX, mouseY]);
        onStart?.([mouseX, mouseY]);
      }
    } else {
      if (isActive) {
        setActive(false);
        setDragStartPosition([0, 0]);
        onEnd?.();
      }
    }
  }, [isActive, isMouseDown, mouseX, mouseY, onEnd, onStart]);

  const top = mouseY > dragStartY ? dragStartY : mouseY;
  const height =
    mouseY > dragStartY ? mouseY - dragStartY : dragStartY - mouseY;
  const left = mouseX > dragStartX ? dragStartX : mouseX;
  const width = mouseX > dragStartX ? mouseX - dragStartX : dragStartX - mouseX;

  React.useEffect(() => {
    if (isMouseDown && isActive && width > 0 && height > 0) {
      onDrag?.({
        topLeft: [left, top],
        bottomRight: [left + width, top + height],
      });
    }
  }, [isActive, mouseX, mouseY, isMouseDown, onDrag, top, height, left, width]);

  if (!enabled || !isActive) {
    return null;
  }

  if (width === 0 && height === 0) {
    return null;
  }

  return (
    <div
      style={{
        top,
        left,
        width,
        height,
        zIndex: 1,
      }}
      className={styles.container}
    />
  );
};

export default DragSelect;
