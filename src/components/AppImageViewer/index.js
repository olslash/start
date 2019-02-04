import React, { Component } from 'react';
import p from 'prop-types';

import WindowBase from '../WindowBase';
import styles from './index.scss';

class AppImageViewer extends Component {
  static propTypes = {
    title: p.string.isRequired,
    contentUrl: p.string.isRequired
  };

  getTitle = () => `${this.props.title} - Image Viewer`;

  render() {
    return (
      <WindowBase {...this.props} title={this.getTitle()}>
        <img
          src={this.props.contentUrl}
          // alt={`project screenshot for ${this.props.title}`}
          className={styles.image}
        />
      </WindowBase>
    );
  }
}

export default AppImageViewer;
