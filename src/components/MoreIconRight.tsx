import cx from 'classnames';
import * as React from 'react';
import styles from './moreIconRight.scss';

interface Props {
  inverted?: boolean;
}
const MoreIconRight: React.FunctionComponent<Props> = ({ inverted }: Props) => (
  <div
    className={cx(styles.arrowRight, {
      [styles.inverted]: inverted,
    })}
  />
);

export default MoreIconRight;
