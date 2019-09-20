import * as React from 'react';
import * as p from 'prop-types'

import Folder from './Folder';
import AppNotepad from './AppNotepad';
import AppImageViewer from './AppImageViewer';

const windowsApps = { AppNotepad, AppImageViewer };

export default class WindowContainer extends React.Component {
  static propTypes = {
    type: p.string.isRequired,
    opensWith: p.string,
    id: p.string.isRequired
  };

  render() {
    const WindowsApplication = windowsApps[this.props.opensWith];

    return this.props.type === 'folder' ? (
      <Folder {...this.props} />
    ) : (
      <WindowsApplication {...this.props} />
    );
  }
}
