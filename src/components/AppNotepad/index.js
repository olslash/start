import React, { Component } from 'react';
import { connect } from 'react-redux';
import p from 'prop-types';

import { fileData } from '../../state/remoteFile';
import WindowBase from '../WindowBase';
import styles from './index.scss';

class AppNotepad extends Component {
  static propTypes = {
    title: p.string.isRequired,
    contentUrl: p.string.isRequired,
    fileData: p.string
  };

  // static defaultProps = {};

  getTitle = () => `${this.props.title} - Notepad`;

  render() {
    console.log(this.props);
    return (
      <WindowBase {...this.props} title={this.getTitle()}>
        <pre className={styles.textContent}>
          {this.props.fileData && this.props.fileData}
        </pre>
      </WindowBase>
    );
  }
}

export default connect((state, ownProps) => ({
  fileData: fileData(state, ownProps.contentUrl)
}))(AppNotepad);
