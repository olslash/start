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
    display: 'flex',
    alignItems: 'center',
    height: '30px',
    width: '100%',
    fontSize: '10px',
    padding: '5px 10px',
    paddingRight: 0
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
  hovered: {
    background: '#0000AA',
    color: 'white'
  },
  label: {
    flexGrow: 1,
    paddingLeft: '10px'
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

// todo: tall/short bool for main/submenu items
class StartMenuItem extends Component {
  static propTypes = {
    label: p.string.isRequired,
    icon: p.oneOf(Object.keys(icons)),
    moreArrow: p.bool
  };

  state = {
    hovered: false
  };

  setHovered = () => {
    this.setState({ hovered: true });
  };

  setUnHovered = () => {
    this.setState({ hovered: false });
  };

  render() {
    const { classes, icon, label } = this.props;
    return (
      <div
        className={cx(classes.container, {
          [classes.hovered]: this.state.hovered
        })}
        onMouseOver={this.setHovered}
        onMouseLeave={this.setUnHovered}
      >
        <div className={classes.iconCol}>
          {icon && <img src={icons[icon]} className={classes.icon} />}
        </div>

        <span className={classes.label}>{label}</span>

        <div className={classes.caretCol}>
          {this.props.moreArrow && (
            <MoreIconRight inverted={this.state.hovered} />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(StartMenuItem);
