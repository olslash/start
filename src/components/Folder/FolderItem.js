import React, { Component } from 'react';
import cx from 'classnames';
import p from 'prop-types';

import myComputer from '../../../resources/icon-my-computer.png';
import recycleBin from '../../../resources/icon-recycle-bin.png';

import styles from './folderItem.scss';

const icons = {
  myComputer,
  recycleBin
};

class FolderItem extends Component {
  static propTypes = {
    title: p.string.isRequired,
    icon: p.oneOf(Object.keys(icons)),
    id: p.string.isRequired,
    selected: p.bool,
    partialSelected: p.bool,
    darkTitle: p.bool,
    onClick: p.func.isRequired
  };

  handleMouseDown = e => {
    e.stopPropagation();
    this.props.onClick(this.props.id);
  };

  handleClick = e => {
    // we handle clicks via mouseDown, but still need to prevent
    // propagation of the full click event thru this icon because
    // folderItemGrid clicks are handled via onClick.
    e.stopPropagation();
  };

  render() {
    const { icon, title, selected, partialSelected, darkTitle } = this.props;
    const isActiveSelection = selected && !partialSelected;

    return (
      <div
        className={cx(styles.container)}
        onMouseDown={this.handleMouseDown}
        onClick={this.handleClick}
      >
        <img
          src={icons[icon]}
          className={cx(styles.icon, {
            [styles.iconSelected]: isActiveSelection
          })}
          style={{
            WebkitMaskImage: isActiveSelection
              ? `url(${icons[icon]})`
              : undefined
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
