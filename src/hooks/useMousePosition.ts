import * as React from 'react';
import { Point } from 'start/types';

const useMousePosition = (containerRef: React.RefObject<HTMLElement>) => {
  const [position, setPosition] = React.useState<Point | null>(null);

  const canCall = React.useRef(true);

  const _setPosition = React.useCallback(
    (e: MouseEvent) => {
      // throttle
      if (!canCall.current) {
        return;
      }
      canCall.current = false;
      requestAnimationFrame(() => (canCall.current = true));

      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) {
        return;
      }

      setPosition([e.clientX - containerRect.x, e.clientY - containerRect.y]);
    },
    [containerRef]
  );

  const _handleLeave = React.useCallback(
    (e: MouseEvent) => {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) {
        return;
      }

      const xExit = e.clientX - containerRect.x;
      const yExit = e.clientY - containerRect.y;

      /**
       * The mouseMove event doesn't fire very frequently, so at high cursor speeds
       * the cursor can leave the window without causing a mouseMove event at the edge.
       *
       * To make sure the selection always butts up against the edge when the mouse has left,
       * we use the coords given by mouseleave, constrained to the bounds of the actual container
       * (because mouseLeave can give X/Y values that are outside the container if the cursor
       * is moving quickly enough)
       */

      setPosition([
        // constrain left
        Math.max(
          // constrain right
          Math.min(xExit, containerRect.width),
          0
        ),
        // constrain bottom
        Math.max(
          // constrain top
          Math.min(yExit, containerRect.height),
          0
        ),
      ]);
    },
    [containerRef]
  );

  React.useEffect(() => {
    const { current } = containerRef;
    if (!current) {
      return;
    }

    current.addEventListener('mousemove', _setPosition);
    current.addEventListener('mouseleave', _handleLeave);

    return () => {
      current.removeEventListener('mousemove', _setPosition);
      current.removeEventListener('mouseleave', _handleLeave);
    };
  }, [_handleLeave, _setPosition, containerRef]);

  return position;
};

export default useMousePosition;
