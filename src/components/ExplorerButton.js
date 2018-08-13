import React, { Component } from 'react';
import p from 'prop-types';
import cx from 'classnames';
import { compose } from 'redux';
import withClickOutHandler from 'react-onclickoutside';
import { withProps } from 'recompose';

import WindowBase from './WindowBase';

import styles from './explorerButton.scss';

class ExplorerButton extends Component {
  static propTypes = {
    onClick: p.func,
    classes: p.shape({
      root: p.string,
      outer: p.string,
      inner: p.string
    })
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
    const { classes, ...rest } = this.props;

    return (
      <WindowBase
        {...rest}
        classes={{
          ...classes,

          root: cx(
            styles.containerButton,
            {
              [styles.containerButtonDepressed]: this.state.depressed
            },
            classes.root
          ),

          outer: cx(
            styles.outerBorderButton,
            {
              [styles.outerBorderButtonDepressed]: this.state.depressed
            },
            classes.outer
          ),

          inner: cx(styles.innerBorderButton, classes.inner),

          icon: cx(classes.icon, {
            [styles.buttonIconDepressed]: this.state.depressed
          })
        }}
        handlers={{
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp
        }}
      />
    );
  }
}

export default compose(
  withProps({
    eventTypes: 'mouseup'
  }),
  withClickOutHandler
)(ExplorerButton);
