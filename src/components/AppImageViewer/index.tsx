import * as React from 'react';
import WindowBase, { Props as WindowBaseProps } from '../WindowBase';
import styles from './index.scss';

interface OwnProps {
  name: string;
  contentUrl: string;
}

export type Props = OwnProps & WindowBaseProps;

class AppImageViewer extends React.Component<Props> {
  getTitle = () => `${this.props.name} - Image Viewer`;

  render() {
    return (
      <WindowBase {...this.props} title={this.getTitle()}>
        <img
          src={this.props.contentUrl}
          // alt={`project screenshot for ${this.props.name}`}
          className={styles.image}
        />
      </WindowBase>
    );
  }
}

export default AppImageViewer;
