import * as React from 'react';
import { connect } from 'react-redux';
import * as p from 'prop-types';

import fetchingStatus from '../../helpers/fetchingStatus';
import { fileData, fileDataFetchingStatus } from '../../state/remoteFile';
import WindowBase from '../WindowBase';
import DelayedLoadingIndicator from '../DelayedLoadingIndicator';
import styles from './index.scss';

class AppNotepad extends React.Component<Props> {
  static propTypes = {
    title: p.string.isRequired,
    contentUrl: p.string.isRequired,
    fileData: p.string,
    loading: p.bool
  };

  getTitle = () => `${this.props.title} - Notepad`;

  render() {
    return (
      <WindowBase {...this.props} title={this.getTitle()}>
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

export default connect((state, ownProps) => ({
  fileData: fileData(state, ownProps.contentUrl),
  loading:
    fileDataFetchingStatus(state, ownProps.contentUrl) ===
    fetchingStatus.fetching
}))(AppNotepad);
