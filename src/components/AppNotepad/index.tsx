import * as React from 'react';
import { connect } from 'react-redux';
import { GlobalState } from 'start/state/globalState';
import { FetchingStatus } from 'start/types';
import { fileData, fileDataFetchingStatus } from '../../state/remoteFile';
import DelayedLoadingIndicator from '../DelayedLoadingIndicator';
import WindowBase, { Props as WindowBaseProps } from '../WindowBase';
import styles from './index.scss';

interface OwnProps {
  name: string;
  contentUrl: string;
}

interface StateProps {
  fileData: string;
  loading: boolean;
}

export type Props = OwnProps & WindowBaseProps;
type InternalProps = StateProps & Props;

class AppNotepad extends React.Component<InternalProps> {
  getFullName = () => `${this.props.name} - Notepad`;

  render() {
    return (
      <WindowBase {...this.props} name={this.getFullName()}>
        {this.props.loading ? (
          <DelayedLoadingIndicator>
            <pre className={styles.textContent}>Loading...</pre>
          </DelayedLoadingIndicator>
        ) : (
          <pre
            autoCorrect="false"
            autoCapitalize="false"
            spellCheck={false}
            className={styles.textContent}
            contentEditable
            // onInput={e => console.log(e.target.innerText)}
            // required for contentEditable, can't let React manage children.
            // Safe, however, because contentEditable content isn't evaluated
            dangerouslySetInnerHTML={{ __html: this.props.fileData }}
          />
        )}
      </WindowBase>
    );
  }
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps): StateProps {
  return {
    fileData: fileData(state, ownProps.contentUrl),
    loading:
      fileDataFetchingStatus(state, ownProps.contentUrl) ===
      FetchingStatus.Fetching
  };
}

export default connect<StateProps, {}, OwnProps, GlobalState>(mapStateToProps)(
  AppNotepad
);
