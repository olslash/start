import * as React from 'react';
import * as p from 'prop-types';

import Folder from './Folder';
import Notepad from './AppNotepad';
import ImageViewer from './AppImageViewer';

import { App, WindowType } from 'types';

const windowsApps: Record<App, React.ComponentType> = { Notepad, ImageViewer };

interface Props {
  type: WindowType;
  opensWith?: App;
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
        const WindowsApplication = windowsApps[this.props.opensWith];
        return <WindowsApplication {...this.props} />;
    }
  }
}
