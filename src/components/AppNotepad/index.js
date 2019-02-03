import React, { Component } from 'react';
import p from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { itemsForFolder } from '../../state/explorer';
import WindowBase from '../WindowBase';

class AppNotepad extends Component {
  static propTypes = {
    id: p.string.isRequired,
    items: p.arrayOf(
      p.shape({
        title: p.string.isRequired,
        icon: p.string.isRequired
      })
    )
  };

  static defaultProps = {};

  render() {
    return <WindowBase {...this.props}>Notepad app</WindowBase>;
  }
}

export default compose(
  connect((state, ownProps) => ({
    items: itemsForFolder(state, ownProps.id)
  }))
)(AppNotepad);
