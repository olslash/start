import React, { Component } from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';
import cx from 'classnames';
import { compose } from 'redux';
import withClickOutHandler from 'react-onclickoutside';
import { withProps } from 'recompose';

import WindowBase from './WindowBase';

const styles = {
  _containerButton: {
    boxShadow: '0px 0px 0 1px black'
  },
  _containerButtonDepressed: {
    boxShadow: '0px 0px 0 1px white'
  },
  _outerBorderButton: {
    borderLeft: 'none',
    borderTop: 'none',
    borderRight: '1px solid #868A8E',
    borderBottom: '1px solid #868A8E',
    boxShadow: '-0.5px -0.5px 0 0.5px white'
  },
  _outerBorderButtonDepressed: {
    boxShadow: '-0.5px -0.5px 0 0.5px black',
    borderRight: 'none',
    borderBottom: 'none',
    borderLeft: '1px solid #868A8E',
    borderTop: '1px solid #868A8E'
  },
  _innerBorderButton: {
    boxShadow: 'none',
    borderLeft: 'none',
    borderTop: 'none'
  }
};

class ExplorerButton extends Component {
  static propTypes = {
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
      console.log('click');
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
        button
        classes={{
          ...classes,

          root: cx(
            classes._containerButton,
            {
              [classes._containerButtonDepressed]: this.state.depressed
            },
            classes.root
          ),

          outer: cx(
            classes._outerBorderButton,
            {
              [classes._outerBorderButtonDepressed]: this.state.depressed
            },
            classes.outer
          ),

          inner: cx(classes._innerBorderButton, classes.inner)
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
  withStyles(styles),
  withProps({
    eventTypes: 'mouseup'
  }),
  withClickOutHandler
)(ExplorerButton);
