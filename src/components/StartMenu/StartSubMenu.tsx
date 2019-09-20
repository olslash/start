import React from 'react';
import p from 'prop-types';

import BorderedContainer from '../BorderedContainer';

import styles from './startSubMenu.scss';

const StartSubMenu = ({ items, style, rightOffset = 0 }) => (
  <BorderedContainer
    classes={{ root: styles.container }}
    style={{
      top: -3,
      right: -rightOffset,
      ...style
    }}
  >
    {items}
  </BorderedContainer>
);

StartSubMenu.propTypes = {
  items: p.arrayOf(p.node).isRequired,
  rightOffset: p.number,
  style: p.objectOf(p.any)
};

export default StartSubMenu;
