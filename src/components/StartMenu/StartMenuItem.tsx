import * as React from 'react';
import cx from 'classnames';
import * as p from 'prop-types';

import icons from '../../../resources/icons';
import MoreIconRight from '../MoreIconRight';

import styles from './startMenuItem.scss';

class StartMenuItem extends React.Component<Props> {
  static propTypes = {
    label: p.string.isRequired,
    icon: p.oneOf(Object.keys(icons)),
    hasChildren: p.bool,
    onActivate: p.func,
    index: p.number,
    depth: p.number,
    activationDelayMs: p.number,
    active: p.bool,
    short: p.bool,
    children: p.node
  };

  static defaultProps = {
    onActivate: () => {},
    activationDelayMs: 350
  };

  state = {
    hovered: false
  };

  activateDelayTimeout = null;

  setHovered = e => {
    e.stopPropagation();

    if (this.state.hovered) {
      return;
    }
    this.setState({ hovered: true });

    // if still hovered after delay, activate (for folders)
    clearTimeout(this.activateDelayTimeout);
    this.activateDelayTimeout = setTimeout(() => {
      if (this.state.hovered) {
        this.activate();
      }
    }, this.props.activationDelayMs);
  };

  setUnHovered = () => {
    clearTimeout(this.activateDelayTimeout);
    this.setState({ hovered: false });
  };

  activate = (e = {}) => {
    e.stopPropagation && e.stopPropagation();

    clearTimeout(this.activateDelayTimeout);

    this.props.onActivate({
      depth: this.props.depth,
      index: this.props.index
    });
  };

  render() {
    const { icon, label, short, active, children } = this.props;
    // fixme -- should only be able to activate folder items
    return (
      <div
        className={cx(styles.container, {
          [styles.active]: this.state.hovered || active,
          [styles.containerShort]: short
        })}
        onMouseOver={this.setHovered}
        onMouseLeave={this.setUnHovered}
        onMouseDown={this.activate}
      >
        <div className={styles.iconCol}>
          {icon && <img src={icons[icon]} className={styles.icon} />}
        </div>

        <span
          className={cx(styles.label, {
            [styles.labelHovered]: this.state.hovered || active,
            [styles.labelShort]: short
          })}
        >
          {label}
        </span>

        <div className={styles.caretCol}>
          {this.props.hasChildren && (
            <MoreIconRight inverted={this.state.hovered || this.props.active} />
          )}
        </div>
        {children}
      </div>
    );
  }
}

export default StartMenuItem;
