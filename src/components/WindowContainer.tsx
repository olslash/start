import * as React from 'react';
import { windowsApps } from 'start/windowsApps';
import { Apps, WindowType } from 'start/types';
import Folder, { Props as FolderProps } from './Folder';

interface OwnProps {
  type: WindowType;
  paneProps: {};
  opensWith?: Apps;
  id: string;
}

type Props = OwnProps & FolderProps;

const WindowContainer: React.FunctionComponent<Props> = props => {
  switch (props.type) {
    case WindowType.Folder:
      return <Folder {...props} />;
    default:
      if (!props.opensWith || !windowsApps[props.opensWith]) {
        console.warn("opensWith didn't exist");
        return null;
      }

      const WindowsApplication = windowsApps[props.opensWith];
      return <WindowsApplication {...props} />;
  }
};

export default WindowContainer;
