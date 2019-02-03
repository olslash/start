import React from 'react';
import cx from 'classnames';
import p from 'prop-types';
import { withProps } from 'recompose';

import ButtonBase from '../ButtonBase';

import icons from '../../../resources/icons';

import styles from './index.scss';

const TitleBar = ({
  windowId,
  title,
  active = false,
  icon,
  height = 14,
  onMinimize,
  onMaximize,
  onClose,
  onDoubleClick
}) => (
  <div
    className={cx(styles.container, {
      [styles.containerActive]: active
    })}
    style={{ height }}
  >
    <div
      className={styles.leftContainer}
      onDoubleClick={() => onDoubleClick(windowId)}
    >
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
          onClick={() => onMinimize(windowId)}
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
          onClick={() => onMaximize(windowId)}
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
          onClick={() => onClose(windowId)}
        />
      )}
    </div>
  </div>
);

TitleBar.propTypes = {
  windowId: p.string.isRequired,
  title: p.string.isRequired,
  active: p.bool,
  icon: p.string,
  height: p.number,
  onMinimize: p.func,
  onMaximize: p.func,
  onClose: p.func,
  onDoubleClick: p.func
};

const iconSpecialCaseReplacements = {
  folder: 'folderOpen'
};

export default withProps(({ icon }) => ({
  icon: iconSpecialCaseReplacements[icon] || icon
}))(TitleBar);
