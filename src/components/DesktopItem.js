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
  titleContainer: {
    paddingTop: '5px',
    fontSize: '10px',
    color: 'white'
  },
  titleSelected: {
    background: '#0000AA',
    padding: '0 2px',
    border: '1px dotted white',
    borderRadius: '1px'
  }
};

const icons = {
  myComputer,
  recycleBin
};

const DesktopItem = ({ classes, icon, title, id, selected, onClick }) => {
  return (
    <div
      className={cx(classes.container, {
        [classes.active]: ''
      })}
      onClick={e => {
        e.stopPropagation();
        onClick(id);
      }}
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
      <div className={classes.titleContainer}>
        <span
          className={cx({
            [classes.titleSelected]: selected
          })}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

DesktopItem.propTypes = {
  title: p.string.isRequired,
  icon: p.oneOf(Object.keys(icons)),
  id: p.string.isRequired,
  selected: p.bool,
  onClick: p.func
};

export default withStyles(styles)(DesktopItem);
