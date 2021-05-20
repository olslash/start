import cx from 'classnames';
import * as React from 'react';
import icons, { Icon } from 'resources/icons';
import MoreIconRight from 'start/components/MoreIconRight';
import styles from './startMenuItem.scss';

interface Props {
  label: string;
  icon: Icon;
  hasChildren?: boolean;
  onActivate?(path: { depth: number; index: number }): void;
  index?: number;
  depth?: number;
  activationDelayMs?: number;
  active?: boolean;
  short?: boolean;
}

interface State {
  hovered: boolean;
}

class StartMenuItem extends React.Component<Props, State> {
  static defaultProps = {
    onActivate: () => {},
    activationDelayMs: 350,
  };

  state = {
    hovered: false,
  };

  activateDelayTimeout = 0;

  setHovered = (e: React.MouseEvent<any, any>) => {
    e.stopPropagation();

    if (this.state.hovered) {
      return;
    }

    this.setState({ hovered: true });

    // if still hovered after delay, activate (for folders)
    clearTimeout(this.activateDelayTimeout);
    this.activateDelayTimeout = window.setTimeout(() => {
      if (this.state.hovered) {
        this.activate();
      }
    }, this.props.activationDelayMs);
  };

  setUnHovered = () => {
    clearTimeout(this.activateDelayTimeout);
    this.setState({ hovered: false });
  };

  activate = (e?: React.MouseEvent<any, any>) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    clearTimeout(this.activateDelayTimeout);

    if (this.props.onActivate) {
      this.props.onActivate({
        depth: this.props.depth || 0,
        index: this.props.index || 0,
      });
    }
  };

  render() {
    const { icon, label, short, active, children } = this.props;
    // fixme -- should only be able to activate folder items
    return (
      <div
        className={cx(styles.container, {
          [styles.active]: this.state.hovered || active,
          [styles.containerShort]: short,
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
            [styles.labelShort]: short,
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
