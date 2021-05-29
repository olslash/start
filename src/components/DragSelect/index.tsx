import * as React from 'react';
import useMouseDown from 'start/hooks/useMouseDown';
import { Point } from 'start/types';
import useMousePosition from 'start/hooks/useMousePosition';
import styles from './index.scss';

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
  const mousePosition = useMousePosition(containerRef);
  const isMouseDown = useMouseDown();

  const [dragStartPosition, setDragStartPosition] = React.useState<Point>([
    0, 0,
  ]);

  React.useEffect(() => {
    if (!mousePosition) {
      return;
    }

    if (isMouseDown) {
      if (!isActive) {
        setActive(true);

        setDragStartPosition(mousePosition);
        onStart?.(mousePosition);
      }
    } else {
      if (isActive) {
        setActive(false);
        setDragStartPosition([0, 0]);
        onEnd?.();
      }
    }
  }, [isActive, isMouseDown, mousePosition, onEnd, onStart]);

  React.useEffect(() => {
    if (!mousePosition) {
      return;
    }

    const { top, left, width, height } = getDimensions(
      dragStartPosition,
      mousePosition
    );

    if (isMouseDown && isActive && width > 0 && height > 0) {
      onDrag?.({
        topLeft: [left, top],
        bottomRight: [left + width, top + height],
      });
    }
  }, [isActive, isMouseDown, onDrag, mousePosition, dragStartPosition]);

  if (!enabled || !isActive) {
    return null;
  }

  if (!mousePosition) {
    return null;
  }

  const { top, left, width, height } = getDimensions(
    dragStartPosition,
    mousePosition
  );

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

function getDimensions(mousePosition: Point, dragStartPosition: Point) {
  const [dragStartX, dragStartY] = dragStartPosition;
  const [mouseX, mouseY] = mousePosition;

  const top = mouseY > dragStartY ? dragStartY : mouseY;
  const height =
    mouseY > dragStartY ? mouseY - dragStartY : dragStartY - mouseY;
  const left = mouseX > dragStartX ? dragStartX : mouseX;
  const width = mouseX > dragStartX ? mouseX - dragStartX : dragStartX - mouseX;

  return {
    top,
    left,
    width,
    height,
  };
}
export default DragSelect;
