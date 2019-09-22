import cx from 'classnames';
import * as React from 'react';
import { withProps } from 'recompose';
import icons, { Icon } from 'resources/icons';
import ButtonBase from 'start/components/ButtonBase';
import styles from './index.scss';

interface Props {
  windowName: string;
  active: boolean;
  icon: Icon;
  height: number;
  onMinimize(windowName: string): void;
  onMaximize(windowName: string): void;
  onClose(windowName: string): void;
  onDoubleClick(windowName: string): void;
}

const TitleBar: React.FunctionComponent<Props> = ({
  windowName,
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
      onDoubleClick={() => onDoubleClick(windowName)}
    >
      <div>
        {icons[icon] && <img src={icons[icon]} className={styles.icon} />}
      </div>
      <span className={styles.title}>{windowName}</span>
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
          onClick={() => onMinimize(windowName)}
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
          onClick={() => onMaximize(windowName)}
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
          onClick={() => onClose(windowName)}
        />
      )}
    </div>
  </div>
);

const iconSpecialCaseReplacements = new Map<Icon, Icon>([
  [Icon.Folder, Icon.FolderOpen]
]);

export default withProps<{}, Props>(({ icon }) => ({
  icon: iconSpecialCaseReplacements.get(icon) || icon
}))(TitleBar);
