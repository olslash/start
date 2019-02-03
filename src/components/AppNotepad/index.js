import React, { Component } from 'react';
import p from 'prop-types';

import WindowBase from '../WindowBase';

class AppNotepad extends Component {
  static propTypes = {
    title: p.string.isRequired
  };

  static defaultProps = {};

  getTitle = () => `${this.props.title} - Notepad`;

  render() {
    return (
      <WindowBase {...this.props} title={this.getTitle()}>
        Notepad app 
      </WindowBase>
    );
  }
}

export default AppNotepad;
