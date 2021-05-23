import * as React from 'react';

const useMousePosition = (
  containerRef: React.RefObject<HTMLElement>,
  throttleMs = 16 // 60 fps
) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const currentRef = containerRef.current;
  const containerRect = React.useMemo(
    () => currentRef?.getBoundingClientRect(),
    [currentRef]
  );
  const lastCalledTime = React.useRef(Date.now());

  const _setPosition = React.useCallback(
    (e: MouseEvent) => {
      if (!containerRect) {
        return;
      }

      // throttle
      const now = Date.now();
      if (now - lastCalledTime.current < throttleMs) {
        return;
      }
      lastCalledTime.current = now;

      setPosition({
        x: e.clientX - containerRect.x,
        y: e.clientY - containerRect.y,
      });
    },
    [containerRect, throttleMs]
  );

  const _handleLeave = React.useCallback(
    (e: MouseEvent) => {
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

      setPosition({
        // constrain left
        x: Math.max(
          // constrain right
          Math.min(xExit, containerRect.width),
          0
        ),
        // constrain bottom
        y: Math.max(
          // constrain top
          Math.min(yExit, containerRect.height),
          0
        ),
      });
    },
    [containerRect]
  );

  const { current } = containerRef;
  React.useEffect(() => {
    if (!current) {
      return;
    }

    current.addEventListener('mousemove', _setPosition);
    current.addEventListener('mouseleave', _handleLeave);

    return () => {
      current.removeEventListener('mousemove', _setPosition);
    };
  }, [current, _handleLeave, _setPosition]);

  return position;
};

export default useMousePosition;
