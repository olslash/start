import * as React from 'react';
import BorderedContainer from '../BorderedContainer';
import styles from './startSubMenu.scss';

interface Props {
  items: React.ReactNode[];
  style: { [prop: string]: string | number };
  rightOffset?: number;
}
const StartSubMenu: React.FunctionComponent<Props> = ({
  items,
  style,
  rightOffset = 0,
}) => (
  <BorderedContainer
    classes={{ root: styles.container }}
    style={{
      top: -3,
      right: -rightOffset,
      ...style,
    }}
  >
    {items}
  </BorderedContainer>
);

export default StartSubMenu;
