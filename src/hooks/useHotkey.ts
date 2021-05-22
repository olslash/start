import * as React from 'react';
import hotkeys from 'hotkeys-js';

const useHotkey = (key: string, cb: () => void) => {
  const handleKey = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.type === 'keydown') {
        cb();
      }
    },
    [cb]
  );

  React.useEffect(() => {
    hotkeys(key, { keyup: true }, handleKey);

    return () => {
      hotkeys.unbind(key, handleKey);
    };
  }, [handleKey, key]);
};

export default useHotkey;
