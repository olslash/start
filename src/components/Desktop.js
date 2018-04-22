import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import p from 'prop-types';

import myComputer from '../../resources/icon-my-computer.png';
import {
  selectedDesktopItemId,
  selectDesktopItem,
  deselectDesktopItem
} from '../state/explorer';

import Folder from './Folder';
import DesktopItem from './DesktopItem';

import styles from './desktop.scss';

const testLog = (msg) => () => console.log(msg)

const Desktop = ({
  items = [],
  selectedItemId,
  selectDesktopItem,
  deselectDesktopItem
}) => (
  <div className={styles.container}>
    <Fragment>
      {items.map(item => (
        <DesktopItem
          {...item}
          key={item.id}
          selected={selectedItemId === item.id}
          onClick={selectDesktopItem}
          onClickOut={deselectDesktopItem}
        />
      ))}
      <Folder
        title="My Computer"
        active
        icon={myComputer}
        top={30}
        left={30}
        // onMinimize={() => console.log('Minimize')}
        // onMaximize={() => console.log('Maximize')}
        onClose={testLog('Close')}
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
  selectDesktopItem: p.func.isRequired,
  deselectDesktopItem: p.func.isRequired
};

export default compose(
  connect(
    state => ({
      selectedItemId: selectedDesktopItemId(state)
    }),
    { selectDesktopItem, deselectDesktopItem }
  )
)(Desktop);
