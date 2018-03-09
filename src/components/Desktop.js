import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'react-jss';
import p from 'prop-types';

import myComputer from '../../resources/icon-my-computer.png';
import { selectedDesktopItemId, selectDesktopItem } from '../state/explorer';

import Folder from './Folder';
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
  selectDesktopItem
}) => (
  <div className={classes.container}>
    <Fragment>
      {items.map(item => (
        <DesktopItem
          {...item}
          key={item.id}
          selected={selectedItemId === item.id}
          onClick={selectDesktopItem}
          onClickOut={() => !!selectedItemId && selectDesktopItem(null)}
        />
      ))}
      <Folder
        title="My Computer"
        // active
        icon={myComputer}
      />
    </Fragment>
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
  selectDesktopItem: p.func.isRequired
};

export default compose(
  connect(
    state => ({
      selectedItemId: selectedDesktopItemId(state)
    }),
    { selectDesktopItem }
  ),
  withStyles(styles)
)(Desktop);
