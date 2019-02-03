import React, { Component } from 'react';
import p from 'prop-types';

import Folder from './Folder';
import AppNotepad from './AppNotepad';

const apps = { AppNotepad };

export default class WindowContainer extends Component {
  static propTypes = {
    type: p.string.isRequired,
    opensWith: p.string,
    id: p.string.isRequired
  };

  render() {
    const App = apps[this.props.opensWith];

    return this.props.type === 'folder' ? (
      <Folder {...this.props} />
    ) : (
      <App {...this.props} />
    );
  }
}
