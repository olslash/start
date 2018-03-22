import React from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';

import WindowBase from '../WindowBase';
import TitleBar from './TitleBar';

const styles = {
  container: {
    position: 'absolute'
  },
  containerInner: {
    padding: '1px'
  }
};

// todo:
// base inset container component - depth levels (ie. footer inset vs main
// content inset)

const Folder = ({
  classes,
  title,
  icon,
  active = false,
  height = 200,
  width = 200,
  top = 0,
  left = 0,
  onMinimize,
  onMaximize,
  onClose
}) => (
  <WindowBase
    style={{ height, width, top, left }}
    classes={{
      root: classes.container,
      inner: classes.containerInner
    }}
  >
    <TitleBar
      title={title}
      active={active}
      icon={icon}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={onClose}
    />
  </WindowBase>
);

Folder.propTypes = {
  title: p.string.isRequired,
  icon: p.string,
  active: p.bool,
  top: p.number,
  left: p.number,
  height: p.number,
  width: p.number,
  style: p.objectOf(p.any)
};

export default withStyles(styles)(Folder);
