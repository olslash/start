import * as React from 'react';
import * as p from 'prop-types';
import cx from 'classnames';

import { compose } from 'redux';
import { withProps } from 'recompose';
import withClickOutHandler from 'react-onclickoutside';

import styles from './buttonBase.scss';

class ButtonBase extends React.Component<Props> {
  static propTypes = {
    classes: p.shape({
      root: p.string,
      icon: p.string,
      outer: p.string,
      inner: p.string
    }),
    style: p.objectOf(p.any),
    innerStyle: p.objectOf(p.any),
    outerStyle: p.objectOf(p.any),
    children: p.node,
    iconSrc: p.string,
    onClick: p.func,
    // force button to always be depressed
    depressed: p.bool,
    // because we trigger on mouseUp, should the onClick event's propagation
    // also be stopped?
    stopClickPropagation: p.bool
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
    if (this.state.mouseOver && this.state.active) {
      e.stopPropagation();
      this.props.onClick(e);
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
    const {
      classes,
      style = {},
      innerStyle = {},
      outerStyle = {},
      children,
      iconSrc
    } = this.props;

    return (
      <div
        className={cx(
          styles.container,
          {
            [styles.containerDepressed]:
              this.state.depressed || this.props.depressed
          },
          classes.root
        )}
        style={style}
        // "over" seems to prevent issues where mouseEnter never fires if a
        // button immediately over this one is clicked, its window closes,
        // and the mouse doesn't out and back.
        onMouseOver={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onClick={e => this.props.stopClickPropagation && e.stopPropagation()}
      >
        {this.props.iconSrc && (
          <div className={styles.iconImgContainer}>
            <img
              src={iconSrc}
              className={cx(classes.icon, {
                [styles.iconImgDepressed]:
                  this.state.depressed || this.props.depressed
              })}
              draggable={false}
            />
          </div>
        )}
        <div
          className={cx(
            styles.outerBorder,
            {
              [styles.outerBorderDepressed]:
                this.state.depressed || this.props.depressed
            },
            classes.outer
          )}
          style={outerStyle}
        >
          <div
            style={innerStyle}
            className={cx(styles.innerBorder, classes.inner)}
          >
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