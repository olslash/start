import cx from 'classnames';
import { truncate } from 'lodash';
import * as React from 'react';
import icons, { Icon } from 'resources/icons';
import styles from './folderItem.scss';

interface Props {
  icon: Icon;
  name: string;
  selected?: boolean;
  partialSelected?: boolean;
  darkTitle?: boolean;
  doubleClickDelayMax?: number;
  // onClick(): void;
  onMouseDown?(e: React.MouseEvent<any, any>, name: string): void;
  onDoubleClick?(e: React.MouseEvent<any, any>, name: string): void;
}

const FolderItem = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    icon,
    name,
    selected,
    partialSelected,
    darkTitle,
    onDoubleClick,
    onMouseDown,
    doubleClickDelayMax = 400,
  } = props;
  const isActiveSelection = selected && !partialSelected;

  const [shouldDoubleClick, setShouldDoubleClick] = React.useState(false);
  const [doubleClickTimeout, setDoubleClickTimeout] = React.useState(0);

  const handleDoubleClick = React.useCallback(
    (e: React.MouseEvent<any, any>) => {
      onDoubleClick?.(e, name);
    },
    [onDoubleClick, name]
  );

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<any, any>) => {
      // double click is mousedown-mouseup-<mousedown>

      if (shouldDoubleClick) {
        setShouldDoubleClick(false);
        return handleDoubleClick(e);
      }

      onMouseDown?.(e, name);

      setShouldDoubleClick(true);

      setDoubleClickTimeout(
        window.setTimeout(() => {
          setShouldDoubleClick(false);
        }, doubleClickDelayMax)
      );
    },
    [
      handleDoubleClick,
      name,
      shouldDoubleClick,
      doubleClickDelayMax,
      onMouseDown,
    ]
  );

  // React.useEffect(() => {
  //   return () => {
  //     console.log('cleaning up');
  //     clearTimeout(doubleClickTimeout);
  //   };
  // }, [doubleClickTimeout]);

  const truncatedTitle = props.name
    .split(' ')
    .map((word) => truncate(word, { length: 12 }))
    .join(' ');

  return (
    <div
      className={cx(styles.container)}
      onMouseDown={handleMouseDown}
      ref={ref}
      id={name}
      // onClick={this.handleClick}
    >
      <img
        src={icons[icon]}
        className={cx(styles.icon, {
          [styles.iconSelected]: isActiveSelection,
        })}
        style={{
          WebkitMaskImage: `url(${icons[icon]})`,
        }}
      />
      <div className={styles.titleContainer}>
        <div
          className={cx(styles.title, {
            [styles.titleDarkFont]: darkTitle,
            [styles.titleSelected]: isActiveSelection,
            [styles.titleSelectedInactive]: selected && !isActiveSelection,
          })}
        >
          {truncatedTitle}
        </div>
      </div>
    </div>
  );
});

FolderItem.displayName = 'FolderItem';
export default FolderItem;
