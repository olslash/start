import React, { Component } from 'react';
import { compose } from 'redux';
import { withProps } from 'recompose';
import cx from 'classnames';
import p from 'prop-types';
import withClickOutHandler from 'react-onclickoutside';

import myComputer from '../../resources/icon-my-computer.png';
import recycleBin from '../../resources/icon-recycle-bin.png';

import styles from './desktopItem.scss';

const icons = {
  myComputer,
  recycleBin
};

export const clickoutIgnoreClassname = 'desktop-clickout-ignore';

class DesktopItem extends Component {
  static propTypes = {
    title: p.string.isRequired,
    icon: p.oneOf(Object.keys(icons)),
    id: p.string.isRequired,
    selected: p.bool,
    onClick: p.func,
    onClickOut: p.func
  };

  handleClickOutside = () => {
    this.props.onClickOut();
  };

  handleClick = e => {
    e.stopPropagation();
    this.props.onClick(this.props.id);
  };

  render() {
    const { icon, title, selected } = this.props;

    return (
      <div
        className={cx(
          styles.container,
          // don't trigger clickout events for desktop items
          clickoutIgnoreClassname
        )}
        onMouseDown={this.handleClick}
      >
        <img
          src={icons[icon]}
          className={cx(styles.icon, {
            [styles.iconSelected]: selected
          })}
          style={{
            WebkitMaskImage: selected ? `url(${icons[icon]})` : undefined
          }}
        />
        <div className={styles.titleContainer}>
          <span
            className={cx({
              [styles.titleSelected]: selected
            })}
          >
            {title}
          </span>
        </div>
      </div>
    );
  }
}

export default compose(
  withProps({
    outsideClickIgnoreClass: clickoutIgnoreClassname
  }),
  withClickOutHandler
)(DesktopItem);
