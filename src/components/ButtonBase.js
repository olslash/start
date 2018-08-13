import React, { Component } from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './buttonBase.scss';
import { compose } from 'redux';
import { withProps } from 'recompose';
import withClickOutHandler from 'react-onclickoutside';

class ButtonBase extends Component {
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
    iconSrc: p.string,
    onClick: p.func
  };

  static defaultProps = {
    onClick: () => {}
  };

  // win95 behavior:
  // if mouse is depressed then leaves the button, the button raises.
  // but if the mouse button is held down, re-enters the button, then is
  // released, the button will fire onClick.
  state = {
    active: false,
    mouseOver: false,
    depressed: false
  };

  handleMouseEnter = e => {
    e.stopPropagation();

    this.setState({
      mouseOver: true,
      depressed: this.state.active
    });
  };

  handleMouseLeave = e => {
    e.stopPropagation();

    this.setState({
      mouseOver: false,
      depressed: false
    });
  };

  handleMouseDown = e => {
    e.stopPropagation();

    this.setState({
      active: true,
      depressed: true
    });
  };

  handleMouseUp = e => {
    e.stopPropagation();
    if (this.state.mouseOver && this.state.active) {
      this.props.onClick();
    }

    this.setState({
      active: false,
      depressed: false
    });
  };

  // "mouseUpOutside"
  handleClickOutside = e => {
    this.handleMouseUp(e);
  };

  render() {
    const { classes, style = {}, children, iconSrc, handlers } = this.props;

    return (
      <div
        className={cx(
          styles.container,
          {
            [styles.containerDepressed]: this.state.depressed
          },
          classes.root
        )}
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        {this.props.iconSrc && (
          <div className={styles.iconImgContainer}>
            <img
              src={iconSrc}
              className={cx(classes.icon, {
                [styles.iconImgDepressed]: this.state.depressed
              })}
              draggable={false}
            />
          </div>
        )}
        <div
          className={cx(
            styles.outerBorder,
            {
              [styles.outerBorderDepressed]: this.state.depressed
            },
            classes.outer
          )}
        >
          <div className={cx(styles.innerBorder, classes.inner)}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withProps({
    eventTypes: 'mouseup'
  }),
  withClickOutHandler
)(ButtonBase);
