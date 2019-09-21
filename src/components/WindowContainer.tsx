import * as React from 'react';

import Folder from './Folder';
import { WindowType, Apps } from 'start/types';
import { windowsApps } from 'start/initialHDDState';

interface Props {
  type: WindowType;
  opensWith?: Apps;
  id: string;
}

export default class WindowContainer extends React.Component<Props> {
  // fixme -- this takes all the prop types of Folder or WindowsApplication and
  // differentiates on `type`

  render() {
    switch (this.props.type) {
      case WindowType.Folder:
        return <Folder {...this.props} />;
      default:
        if (!this.props.opensWith || !windowsApps[this.props.opensWith]) {
          console.warn("opensWith didn't exist");
          return null;
        }

        const WindowsApplication = windowsApps[this.props.opensWith];
        return <WindowsApplication {...this.props} />;
    }
  }
}
