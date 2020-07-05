import cx from 'classnames';
import * as React from 'react';
import { withProps } from 'recompose';
import icons, { Icon } from 'resources/icons';
import ButtonBase from 'start/components/ButtonBase';
import styles from './index.scss';

interface Props {
  title: string;
  name: string;
  active: boolean;
  icon: Icon;
  height: number;
  onMinimize(windowName: string): void;
  onMaximize(windowName: string): void;
  onClose(windowName: string): void;
  onDoubleClick(windowName: string): void;
}

const TitleBar: React.FunctionComponent<Props> = ({
  title,
  name,
  active = false,
  icon,
  height = 14,
  onMinimize,
  onMaximize,
  onClose,
  onDoubleClick,
}) => (
  <div
    className={cx(styles.container, {
      [styles.containerActive]: active,
    })}
    style={{ height }}
  >
    <div
      className={styles.leftContainer}
      onDoubleClick={() => onDoubleClick(name)}
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
            icon: styles.buttonIcon,
          }}
          iconSrc={icons.buttonMinimize}
          onClick={() => onMinimize(name)}
        />
      )}
      {onMaximize && (
        <ButtonBase
          classes={{
            root: styles.button,
            inner: styles.buttonIconContainer,
            icon: styles.buttonIcon,
          }}
          iconSrc={icons.buttonMaximize}
          onClick={() => onMaximize(name)}
        />
      )}
      {onClose && (
        <ButtonBase
          classes={{
            root: cx(styles.button, styles.closeButton),
            inner: styles.buttonIconContainer,
            icon: styles.buttonIcon,
          }}
          iconSrc={icons.buttonClose}
          onClick={() => onClose(name)}
        />
      )}
    </div>
  </div>
);

const iconSpecialCaseReplacements = new Map<Icon, Icon>([
  [Icon.Folder, Icon.FolderOpen],
]);

export default withProps<{}, Props>(({ icon }) => ({
  icon: iconSpecialCaseReplacements.get(icon) || icon,
}))(TitleBar);
