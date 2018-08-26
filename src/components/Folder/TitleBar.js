import React from 'react';
import cx from 'classnames';
import p from 'prop-types';

import ButtonBase from '../ButtonBase';

import icons from '../../../resources/icons';

import styles from './titleBar.scss';

const TitleBar = ({
  folderId,
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
      <div>
        {icons[icon] && <img src={icons[icon]} className={styles.icon} />}
      </div>
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
          iconSrc={icons.buttonMinimize}
          onClick={() => onMinimize(folderId)}
        />
      )}
      {onMaximize && (
        <ButtonBase
          classes={{
            root: styles.button,
            inner: styles.buttonIconContainer,
            icon: styles.buttonIcon
          }}
          iconSrc={icons.buttonMaximize}
          onClick={() => onMaximize(folderId)}
        />
      )}
      {onClose && (
        <ButtonBase
          classes={{
            root: cx(styles.button, styles.closeButton),
            inner: styles.buttonIconContainer,
            icon: styles.buttonIcon
          }}
          iconSrc={icons.buttonClose}
          onClick={() => onClose(folderId)}
        />
      )}
    </div>
  </div>
);

TitleBar.propTypes = {
  folderId: p.string.isRequired,
  title: p.string.isRequired,
  active: p.bool,
  icon: p.string,
  height: p.number,
  onMinimize: p.func,
  onMaximize: p.func,
  onClose: p.func
};

export default TitleBar;
