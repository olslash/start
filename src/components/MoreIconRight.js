import React from 'react';
import cx from 'classnames';
import p from 'prop-types';

import styles from './moreIconRight.scss';

const MoreIconRight = ({ inverted }) => (
  <div
    className={cx(styles.arrowRight, {
      [styles.inverted]: inverted
    })}
  />
);

MoreIconRight.propTypes = {
  inverted: p.bool
};

export default MoreIconRight;
