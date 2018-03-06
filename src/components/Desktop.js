import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'react-jss';
import p from 'prop-types';

import {
  selectedDesktopItemId,
  selectDesktopItem,
  desktopClick
} from '../state/explorer';

import DesktopItem from './DesktopItem';

const styles = {
  container: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    padding: '5px',
    display: 'grid',
    gridGap: '30px',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'repeat(3, 40px)',
    gridTemplateRows: 'repeat(4, 40px)'
  }
};

const Desktop = ({
  classes,
  items = [],
  selectedItemId,
  selectDesktopItem,
  desktopClick
}) => (
  <div className={classes.container} onClick={desktopClick}>
    {items.map(item => (
      <DesktopItem
        {...item}
        key={item.id}
        selected={selectedItemId === item.id}
        onClick={selectDesktopItem}
      />
    ))}
  </div>
);

Desktop.propTypes = {
  items: p.arrayOf(
    p.shape({
      title: p.string.isRequired,
      icon: p.string.isRequired
    })
  ),
  selectedItemId: p.string,
  selectDesktopItem: p.func.isRequired,
  desktopClick: p.func.isRequired
};

export default compose(
  connect(
    state => ({
      selectedItemId: selectedDesktopItemId(state)
    }),
    { selectDesktopItem, desktopClick }
  ),
  withStyles(styles)
)(Desktop);

// fixme: clear selected item when desktop loses focus (click start menu,
// within folder, taskbar, etc). clickaway?
