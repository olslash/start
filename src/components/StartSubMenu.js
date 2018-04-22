import React from 'react';
import p from 'prop-types';

import WindowBase from './WindowBase';

import styles from './startSubMenu.scss';

const StartSubMenu = ({ items, style, rightOffset = 0 }) => (
  <WindowBase
    classes={{ root: styles.container }}
    style={{
      top: -3,
      right: -rightOffset,
      ...style
    }}
  >
    {items}
  </WindowBase>
);

StartSubMenu.propTypes = {
  items: p.arrayOf(p.node).isRequired,
  rightOffset: p.number,
  style: p.objectOf(p.any)
};

export default StartSubMenu;
