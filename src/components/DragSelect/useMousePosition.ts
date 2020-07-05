import * as React from 'react';

const useMousePosition = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const getBoundingClientRect = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    const offsetParent = target.offsetParent as HTMLDivElement;
    if (!offsetParent) {
      // fixme?
      return;
    }

    return target.offsetParent?.getBoundingClientRect();
  };

  const _setPosition = React.useCallback(
    (e: MouseEvent) => {
      const rect = getBoundingClientRect(e);
      if (!rect) {
        return;
      }

      setPosition({
        x: e.clientX - rect.x,
        y: e.clientY - rect.y,
      });
    },
    [setPosition]
  );

  const _handleLeave = React.useCallback(
    (e: MouseEvent) => {
      const rect = getBoundingClientRect(e);
      if (!rect) {
        return;
      }

      const xExit = e.clientX - rect.x;
      const yExit = e.clientY - rect.y;

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
          Math.min(xExit, rect.width),
          0
        ),
        // constrain bottom
        y: Math.max(
          // constrain top
          Math.min(yExit, rect.height),
          0
        ),
      });
    },
    [setPosition]
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
