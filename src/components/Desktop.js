import React from 'react';
import p from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { focusPane } from '../state/explorer';
import FolderContents from './Folder/FolderContents';

const Desktop = ({ items = [], focusDesktop }) => (
  // fixme -- items from state
  <div onMouseDown={focusDesktop} style={{ height: '100%' }}>
    <FolderContents items={items} folderId="desktop" columnLayout />
  </div>
);

Desktop.propTypes = {
  items: p.arrayOf(
    p.shape({
      type: p.string,
      id: p.string,
      title: p.string,
      icon: p.string
    })
  ),
  focusDesktop: p.func.isRequired
};

export default compose(
  connect(null, dispatch => ({
    focusDesktop: () => dispatch(focusPane('desktop'))
  }))
)(Desktop);
