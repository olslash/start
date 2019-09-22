import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { itemsForFolder } from 'start/state/explorer';
import { GlobalState } from 'start/state/globalState';
import { File, Folder as FolderType } from 'start/types';
import WindowBase, { Props as WindowBaseProps } from '../WindowBase';
import FolderContents from './FolderContents';

interface OwnProps {
  name: string;
  items: (FolderType | File)[];
}

type Props = OwnProps & WindowBaseProps;

class Folder extends React.Component<Props> {
  static defaultProps = {
    items: []
  };

  render() {
    return (
      <WindowBase {...this.props}>
        <FolderContents
          items={this.props.items}
          folderId={this.props.name}
          darkItemTitles
        />
      </WindowBase>
    );
  }
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
  return {
    items: itemsForFolder(state, ownProps.name)
  };
}
export default compose(connect(mapStateToProps))(Folder);
