import cx from 'classnames';
import * as React from 'react';
import icons, { Icon } from 'resources/icons';
import styles from './borderedContainer.scss';

interface Props {
  depth: number;
  borderColors?: {
    topLeft: string;
    bottomRight: string;
  }[];
  classes?: {
    root?: string;
    outer?: string;
    inner?: string;
    icon?: string;
  };
  style?: { [prop: string]: string | number };
  handlers?: {
    [handlerName: string]: () => void;
  };
  icon?: Icon;
  scrollable?: boolean;
  innerRef?: React.MutableRefObject<HTMLDivElement | null>;
}

const BorderedContainer: React.FC<Props> = ({
  depth = 2,
  borderColors = [
    {
      bottomRight: 'black',
      topLeft: '#c3c7cb',
    },
    {
      bottomRight: '#868a8e',
      topLeft: 'white',
    },
  ],
  classes = {},
  style = {},
  icon,
  scrollable,
  children,
  handlers,
  innerRef,
}) => {
  return (
    <div
      className={cx(styles.container, classes.root)}
      style={style}
      {...handlers}
    >
      {icon && (
        <div className={styles.iconImgContainer}>
          <img src={icons[icon]} className={classes.icon} draggable={false} />
        </div>
      )}

      <div
        className={cx(styles.outerBorder, classes.outer)}
        style={{
          borderLeft: `1px solid ${borderColors[0].topLeft}`,
          borderTop: `1px solid ${borderColors[0].topLeft}`,
          boxShadow: `0.5px 0.5px 0 0.5px ${borderColors[0].bottomRight}`,
        }}
      >
        {depth === 1 && children}
        {depth === 2 && (
          <div
            className={cx(styles.innerBorder, classes.inner)}
            style={{
              borderLeft: `1px solid ${borderColors[1].topLeft}`,
              borderTop: `1px solid ${borderColors[1].topLeft}`,
              boxShadow: `0.5px 0.5px 0 0.5px ${borderColors[1].bottomRight}`,
              overflowY: scrollable ? 'scroll' : 'initial',
            }}
            ref={innerRef}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default BorderedContainer;
