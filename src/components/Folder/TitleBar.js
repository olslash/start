import React from 'react';
import cx from 'classnames';
import p from 'prop-types';

import ButtonBase from '../ButtonBase';

import closeIcon from '../../../resources/button-close.png';
import minimizeIcon from '../../../resources/button-minimize.png';
import maximizeIcon from '../../../resources/button-maximize.png';

import styles from './titleBar.scss';

const TitleBar = ({
  title,
  active = false,
  icon,
  height = 14,
  onMinimize,
  onMaximize,
  onClose
}) => (
  <div
    className={cx(styles.container, {
      [styles.containerActive]: active
    })}
    style={{ height }}
  >
    <div className={styles.leftContainer}>
      <div>{icon && <img src={icon} className={styles.icon} />}</div>
      <span className={styles.title}>{title}</span>
    </div>
    <div className={styles.rightContainer}>
      {onMinimize && (
        <ButtonBase
          classes={{
            root: styles.button,
            inner: styles.buttonIconContainer,
            icon: styles.buttonIcon
          }}
          iconSrc={minimizeIcon}
          onClick={onMinimize}
        />
      )}
      {onMaximize && (
        <ButtonBase
          classes={{
            root: styles.button,
            inner: styles.buttonIconContainer,
            icon: styles.buttonIcon
          }}
          iconSrc={maximizeIcon}
          onClick={onMaximize}
        />
      )}
      {onClose && (
        <ButtonBase
          classes={{
            root: cx(styles.button, styles.closeButton),
            inner: styles.buttonIconContainer,
            icon: styles.buttonIcon
          }}
          iconSrc={closeIcon}
          onClick={onClose}
        />
      )}
    </div>
  </div>
);

TitleBar.propTypes = {
  title: p.string.isRequired,
  active: p.bool,
  icon: p.string,
  height: p.number,
  onMinimize: p.func,
  onMaximize: p.func,
  onClose: p.func,
};

export default TitleBar;
