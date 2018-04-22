import React, { Component } from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './WindowBase.scss';

class WindowBase extends Component {
  static propTypes = {
    classes: p.shape({
      root: p.string,
      icon: p.string,
      outer: p.string,
      inner: p.string
    }),
    style: p.objectOf(p.any),
    innerStyle: p.objectOf(p.any),
    handlers: p.objectOf(p.func),
    children: p.node,
    iconSrc: p.string
  };

  render() {
    const { classes, style = {}, children, iconSrc, handlers } = this.props;

    return (
      <div
        className={cx(styles.container, classes.root)}
        style={style}
        {...handlers}
      >
        <div className={styles.iconImgContainer}>
          <img src={iconSrc} className={classes.icon} draggable={false} />
        </div>
        <div className={cx(styles.outerBorder, classes.outer)}>
          <div className={cx(styles.innerBorder, classes.inner)}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default WindowBase;
