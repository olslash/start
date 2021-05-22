import * as React from 'react';
import hotkeys from 'hotkeys-js';

const useHotkey = (key: string, cb: () => void) => {
  const handleKey = React.useCallback(() => {
    cb();
  }, [cb]);

  React.useEffect(() => {
    hotkeys(key, handleKey);

    return () => {
      hotkeys.unbind(key, handleKey);
    };
  }, [handleKey, key]);
};

export default useHotkey;
