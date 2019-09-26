import cx from 'classnames';
import * as React from 'react';
import withClickOutHandler from 'react-onclickoutside';
import { withProps } from 'recompose';
import { compose } from 'redux';
import styles from './buttonBase.scss';

interface Props {
  classes: {
    root?: string;
    icon?: string;
    outer?: string;
    inner?: string;
  };
  style?: { [property: string]: any };
  innerStyle?: { [property: string]: any };
  outerStyle?: { [property: string]: any };
  children?: React.ReactNode;
  iconSrc?: string;
  onClick?(e?: React.MouseEvent<any, any>): void;
  depressed?: boolean;
  stopClickPropagation?: boolean;
}

class ButtonBase extends React.Component<Props> {
  // win95 behavior:
  // if mouse is depressed then leaves the button, the button raises.
  // but if the mouse button is held down, re-enters the button, then is
  // released, the button will fire onClick.
  state = {
    active: false,
    mouseOver: false,
    depressed: false
  };

  handleMouseEnter = (e: React.MouseEvent<any, any>) => {
    e.stopPropagation();

    this.setState({
      mouseOver: true,
      depressed: this.state.active
    });
  };

  handleMouseLeave = (e: React.MouseEvent<any, any>) => {
    e.stopPropagation();

    this.setState({
      mouseOver: false,
      depressed: false
    });
  };

  handleMouseDown = (e: React.MouseEvent<any, any>) => {
    e.stopPropagation();

    this.setState({
      active: true,
      depressed: true
    });
  };

  handleMouseUp = (e: React.MouseEvent<any, any>) => {
    if (this.state.mouseOver && this.state.active) {
      e.stopPropagation();

      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }

    this.setState({
      active: false,
      depressed: false
    });
  };

  // "mouseUpOutside"
  handleClickOutside = (e: React.MouseEvent<any, any>) => {
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

export default compose<React.ComponentType<Props>>(
  withProps({
    eventTypes: 'mouseup'
  }),
  withClickOutHandler
)(ButtonBase);
