import * as React from 'react';
import * as p from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { itemsForFolder } from '../../state/explorer';
import WindowBase from '../WindowBase';
import FolderContents from './FolderContents';

interface Props {
  id: string;
  items:
}

class Folder extends React.Component<Props> {
  static propTypes = {
    id: p.string.isRequired,
    items: p.arrayOf(
      p.shape({
        title: p.string.isRequired,
        icon: p.string.isRequired
      })
    )
  };

  static defaultProps = {
    items: []
  };

  render() {
    return (
      <WindowBase {...this.props}>
        <FolderContents
          items={this.props.items}
          folderId={this.props.id}
          darkItemTitles
        />
      </WindowBase>
    );
  }
}

export default compose(
  connect((state, ownProps) => ({
    items: itemsForFolder(state, ownProps.id)
  }))
)(Folder);
