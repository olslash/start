import React, { Component } from 'react';
import cx from 'classnames';
import withStyles from 'react-jss';
import p from 'prop-types';

import myComputer from '../../resources/icon-my-computer.png';
import recycleBin from '../../resources/icon-recycle-bin.png';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70px',
    height: '40px'
  },
  icon: {
    width: '28px'
  },
  iconSelected: {
    '-webkit-mask-size': '28px',
    filter: 'url(#screendoor)',
    '-webkit-mask-position': '0 0'
  },
  title: {
    paddingTop: '5px',
    fontSize: '10px',
    color: 'white'
  }
};

const icons = {
  myComputer,
  recycleBin
};

const DesktopItem = ({ classes, icon, title, selected }) => {
  return (
    <div
      className={cx(classes.container, {
        [classes.active]: ''
      })}
    >
      <img
        src={icons[icon]}
        className={cx(classes.icon, {
          [classes.iconSelected]: selected
        })}
        style={{
          WebkitMaskImage: selected ? `url(${icons[icon]})` : undefined
        }}
      />
      <span className={classes.title}>{title}</span>
    </div>
  );
};

DesktopItem.propTypes = {
  title: p.string.isRequired,
  icon: p.oneOf(Object.keys(icons))
};

export default withStyles(styles)(DesktopItem);
