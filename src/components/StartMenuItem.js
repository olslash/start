import React, { Component } from 'react';
import cx from 'classnames';
import withStyles from 'react-jss';
import p from 'prop-types';

import documents from '../../resources/icon-documents.png';
import find from '../../resources/icon-find.png';
import help from '../../resources/icon-help.png';
import programs from '../../resources/icon-programs.png';
import run from '../../resources/icon-run.png';
import settings from '../../resources/icon-settings.png';
import shutdown from '../../resources/icon-shutdown.png';

import MoreIconRight from './MoreIconRight';

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '30px',
    width: '100%',
    fontSize: '10px',
    padding: '5px 10px',
    paddingRight: 0
  },
  short: {
    height: '20px',
    padding: '3px 10px'
  },
  iconCol: {
    width: '20px',
    height: '100%'
  },
  caretCol: {
    display: 'flex',
    alignItems: 'center',
    width: '10px',
    height: '100%'
  },
  active: {
    background: '#0000AA'
  },
  label: {
    flexGrow: 1,
    paddingLeft: '10px'
  },
  labelHovered: {
    color: 'white'
  },
  icon: {
    height: '100%'
  }
};

const icons = {
  documents,
  find,
  help,
  programs,
  run,
  settings,
  shutdown
};

class StartMenuItem extends Component {
  static propTypes = {
    label: p.string.isRequired,
    icon: p.oneOf(Object.keys(icons)),
    hasChildren: p.bool,
    onActivate: p.func,
    index: p.number,
    depth: p.number,
    activationDelayMs: p.number,
    active: p.bool
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
    const { classes, icon, label, short, children } = this.props;
    // fixme -- should only be able to activate folder items
    return (
      <div
        className={cx(classes.container, {
          [classes.active]: this.state.hovered || this.props.active,
          [classes.short]: short
        })}
        onMouseOver={this.setHovered}
        onMouseLeave={this.setUnHovered}
        onMouseDown={this.activate}
      >
        <div className={classes.iconCol}>
          {icon && <img src={icons[icon]} className={classes.icon} />}
        </div>

        <span
          className={cx(classes.label, {
            [classes.labelHovered]: this.state.hovered || this.props.active
          })}
        >
          {label}
        </span>

        <div className={classes.caretCol}>
          {this.props.hasChildren && (
            <MoreIconRight inverted={this.state.hovered || this.props.active} />
          )}
        </div>
        {children}
      </div>
    );
  }
}

export default withStyles(styles)(StartMenuItem);
