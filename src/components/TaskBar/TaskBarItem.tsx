import cx from 'classnames';
import * as React from 'react';
// import screenDoor from 'resources/selected-overlay-screen-inverse-40.svg';
import icons, { Icon } from 'resources/icons';
import ButtonBase from 'start/components/ButtonBase';
import styles from './taskBarItem.scss';

interface Props {
  title: string;
  active?: boolean;
  icon: Icon;
  onClick?(e?: React.MouseEvent<any, any>): void;
}

const TaskBarItem: React.FunctionComponent<Props> = ({
  title,
  active,
  onClick,
  icon,
}) => (
  <div className={styles.container}>
    <ButtonBase
      classes={{
        root: styles.button,
      }}
      depressed={active}
      onClick={onClick}
      stopClickPropagation
    >
      <div className={cx(styles.title, { [styles.active]: active })}>
        <img src={icons[icon]} />
        <span>{title}</span>
      </div>
    </ButtonBase>
  </div>
);

export default TaskBarItem;
