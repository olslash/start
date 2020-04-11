import cx from 'classnames';
import { truncate } from 'lodash';
import * as React from 'react';
import icons, { Icon } from 'resources/icons';
import styles from './folderItem.scss';

interface Props {
  icon: Icon;
  name: string;
  selected?: boolean;
  partialSelected?: boolean;
  darkTitle?: boolean;
  doubleClickDelayMax?: number;
  // onClick(): void;
  onMouseDown?(e: React.MouseEvent<any, any>, name: string): void;
  onDoubleClick?(e: React.MouseEvent<any, any>, name: string): void;
  forwardedRef: React.MutableRefObject<any>;
}

interface State {
  shouldDoubleClick: boolean;
}

class FolderItem extends React.Component<Props, State> {
  static defaultProps = {
    doubleClickDelayMax: 400
  };

  state = {
    shouldDoubleClick: false
  };

  doubleClickTimeout = 0;

  componentWillUnmount() {
    clearTimeout(this.doubleClickTimeout);
  }

  handleMouseDown = (e: React.MouseEvent<any, any>) => {
    // double click is mousedown-mouseup-<mousedown>

    if (this.state.shouldDoubleClick) {
      this.setState({ shouldDoubleClick: false });
      return this.handleDoubleClick(e);
    }

    if (this.props.onMouseDown) {
      this.props.onMouseDown(e, this.props.name);
    }

    this.setState(
      {
        shouldDoubleClick: true
      },
      () => {
        this.doubleClickTimeout = setTimeout(() => {
          this.setState({ shouldDoubleClick: false });
        }, this.props.doubleClickDelayMax);
      }
    );
  };

  handleDoubleClick = (e: React.MouseEvent<any, any>) => {
    if (this.props.onDoubleClick) {
      this.props.onDoubleClick(e, this.props.name);
    }
  };

  getTruncatedTitle = () => {
    return this.props.name
      .split(' ')
      .map(word => truncate(word, { length: 12 }))
      .join(' ');
  };

  render() {
    const { icon, selected, partialSelected, darkTitle } = this.props;
    const isActiveSelection = selected && !partialSelected;

    return (
      <div
        className={cx(styles.container)}
        onMouseDown={this.handleMouseDown}
        ref={this.props.forwardedRef}
        // onClick={this.handleClick}
      >
        <img
          src={icons[icon]}
          className={cx(styles.icon, {
            [styles.iconSelected]: isActiveSelection
          })}
          style={{
            WebkitMaskImage: `url(${icons[icon]})`
          }}
        />
        <div className={styles.titleContainer}>
          <div
            className={cx(styles.title, {
              [styles.titleDarkFont]: darkTitle,
              [styles.titleSelected]: isActiveSelection,
              [styles.titleSelectedInactive]: selected && !isActiveSelection
            })}
          >
            {this.getTruncatedTitle()}
          </div>
        </div>
      </div>
    );
  }
}

export default FolderItem;
