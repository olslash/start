import * as React from 'react';

const useMousePosition = (containerRef: React.MutableRefObject<{}>) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const _setPosition = (e: MouseEvent) => {
    setPosition({ x: e.offsetX, y: e.offsetY });
  };

  React.useEffect(() => {
    containerRef.current.addEventListener('mousemove', _setPosition);

    return () => {
      containerRef.current.removeEventListener('mousemove', _setPosition);
    };
  }, []);

  return position;
};

export default useMousePosition;
