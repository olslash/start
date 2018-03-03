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

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    fontSize: '10px',
    padding: '5px 10px',
    paddingRight: 0
  },
  hovered: {
    background: '#0000AA',
    color: 'white'
  },
  label: {
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

class StartMenuItem extends Component {
  static propTypes = {
    label: p.string.isRequired,
    icon: p.oneOf(Object.keys(icons))
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
        {icon && <img src={icons[icon]} className={classes.icon} />}
        <span className={classes.label}>{label}</span>
      </div>
    );
  }
}

export default withStyles(styles)(StartMenuItem);
