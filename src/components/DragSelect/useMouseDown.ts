import * as React from 'react';

const useMouseDown = () => {
  const [down, setDown] = React.useState(false);

  const _setDown = (e: MouseEvent) => {
    e.buttons === 1 ? setDown(true) : setDown(false);
  };

  React.useEffect(() => {
    window.addEventListener('mousedown', _setDown);
    window.addEventListener('mouseup', _setDown);

    return () => {
      window.removeEventListener('mousedown', _setDown);
      window.removeEventListener('mouseup', _setDown);
    };
  }, []);

  return down;
};

export default useMouseDown;
