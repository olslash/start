import * as React from 'react';
import { connect } from 'react-redux';
import { itemsForFolder } from 'start/state/explorer';
import { GlobalState } from 'start/state/globalState';
import { Pane } from 'start/types';
import WindowBase, { Props as WindowBaseProps } from '../WindowBase';
import FolderContents from './FolderContents';

interface OwnProps {
  name: string;
}

interface StateProps {
  items?: Pane[];
}

export type Props = OwnProps & StateProps & WindowBaseProps;

class Folder extends React.Component<Props> {
  render() {
    return (
      <WindowBase {...this.props} title={this.props.name}>
        <FolderContents
          items={this.props.items || []}
          folderName={this.props.name}
          darkItemTitles
        />
      </WindowBase>
    );
  }
}

function mapStateToProps(state: GlobalState, ownProps: Props): StateProps {
  return {
    items: itemsForFolder(state, ownProps.name),
  };
}

export default connect<StateProps, {}, OwnProps, GlobalState>(mapStateToProps)(
  Folder
);
