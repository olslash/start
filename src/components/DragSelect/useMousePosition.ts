import * as React from 'react';

const useMousePosition = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const _setPosition = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', _setPosition);

    return () => {
      window.removeEventListener('mousemove', _setPosition);
    };
  }, []);

  return position;
};

export default useMousePosition;
