import React, { Component } from 'react';
import { noop } from 'lodash';
import cx from 'classnames';
import p from 'prop-types';

import icons from '../../../resources/icons';

import styles from './folderItem.scss';

class FolderItem extends Component {
  static propTypes = {
    title: p.string.isRequired,
    icon: p.oneOf(Object.keys(icons)),
    id: p.string.isRequired,
    selected: p.bool,
    partialSelected: p.bool,
    darkTitle: p.bool,
    doubleClickDelayMax: p.number,
    // onClick: p.func,
    onMouseDown: p.func,
    onDoubleClick: p.func
  };

  static defaultProps = {
    doubleClickDelayMax: 400,
    onDoubleClick: noop,
    onMouseDown: noop
  };

  state = {
    shouldDoubleClick: false
  };

  doubleClickTimeout = null; // eslint-disable-line

  componentWillUnmount() {
    clearTimeout(this.doubleClickTimeout);
  }

  handleMouseDown = e => {
    // double click is mousedown-mouseup-<mousedown>

    if (this.state.shouldDoubleClick) {
      this.setState({ shouldDoubleClick: false });
      return this.handleDoubleClick(e);
    }

    this.props.onMouseDown(e, this.props.id);

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

  handleDoubleClick = e => {
    this.props.onDoubleClick(e, this.props.id);
  };

  render() {
    const { icon, title, selected, partialSelected, darkTitle } = this.props;
    const isActiveSelection = selected && !partialSelected;

    return (
      <div
        className={cx(styles.container)}
        onMouseDown={this.handleMouseDown}
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
            {title}
          </div>
        </div>
      </div>
    );
  }
}

export default FolderItem;
