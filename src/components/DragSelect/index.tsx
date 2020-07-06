import * as React from 'react';
import useMouseDown from 'start/hooks/useMouseDown';
import useMousePosition from 'start/hooks/useMousePosition';
import styles from './index.scss';

interface Props {
  enabled?: boolean;
  onStart?: (mousePosition: { x: number; y: number }) => void;
  onDrag?: (mousePosition: {
    topLeft: [number, number];
    bottomRight: [number, number];
  }) => void;
  onEnd?: () => void;
  containerRef: React.RefObject<HTMLElement>;
}

const DragSelect = React.forwardRef<HTMLDivElement, Props>(
  ({ enabled, containerRef, onDrag, onStart, onEnd }, ref) => {
    const { x: mouseX, y: mouseY } = useMousePosition(containerRef);
    const isMouseDown = useMouseDown();
    const [isActive, setActive] = React.useState(false);

    const [
      { x: dragStartX, y: dragStartY },
      setDragStartPosition,
    ] = React.useState<{
      x: number;
      y: number;
    }>({
      x: 0,
      y: 0,
    });

    React.useEffect(() => {
      if (isMouseDown) {
        if (!isActive) {
          setActive(true);
        }

        setDragStartPosition({ x: mouseX, y: mouseY });
        onStart?.({ x: mouseX, y: mouseY });
      } else {
        setActive(false);
        setDragStartPosition({ x: 0, y: 0 });
        onEnd?.();
      }
      // fixme?
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMouseDown]);

    const top = mouseY > dragStartY ? dragStartY : mouseY;
    const height =
      mouseY > dragStartY ? mouseY - dragStartY : dragStartY - mouseY;
    const left = mouseX > dragStartX ? dragStartX : mouseX;
    const width =
      mouseX > dragStartX ? mouseX - dragStartX : dragStartX - mouseX;

    React.useEffect(() => {
      if (isMouseDown) {
        onDrag?.({
          topLeft: [top, left],
          bottomRight: [top + height, left + width],
        });
      }
    }, [mouseX, mouseY, isMouseDown, onDrag, top, height, left, width]);

    if (!enabled || !isActive) {
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
        ref={ref}
      />
    );
  }
);

export default DragSelect;
