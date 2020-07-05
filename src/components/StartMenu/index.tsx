import * as React from 'react';
import withClickOutHandler from 'react-onclickoutside';
import { withProps } from 'recompose';
import { compose } from 'redux';
import { Icon } from 'resources/icons';
import { StartMenuItem as StartMenuItemType } from 'start/types';
import startMenuLogo from '../../../resources/startmenu-logo.png';
import BorderedContainer from '../BorderedContainer';
import styles from './startMenu.scss';
import StartMenuItem from './StartMenuItem';
import StartSubMenu from './StartSubMenu';

export const clickoutIgnoreClassname = 'start-clickout-ignore';

interface Props {
  items: StartMenuItemType[];
  bottom: number;
  activeFolderPath: number[];
  onRequestClose(): void;
  onSetActiveFolderPath(path: { depth: number; index: number }): void;
}

interface ProvidedProps {
  outsideClickIgnoreClass: string;
}

class StartMenu extends React.Component<Props> {
  handleClickOutside = () => {
    this.props.onRequestClose();
  };

  renderItem = (
    { title, icon, children = [] }: StartMenuItemType,
    index: number,
    depth: number = 0
  ) => (
    <StartMenuItem
      key={title}
      label={title}
      icon={icon}
      hasChildren={children && !!children.length}
      short={depth > 0}
      onActivate={this.props.onSetActiveFolderPath}
      index={index}
      depth={depth}
      // fixme: active is
      // when hovered
      // when active
      //   unless another item at my depth is also hovered <--
      // pull state up a level?
      active={
        this.props.activeFolderPath[depth] === index &&
        children &&
        !!children.length
      }
      // fixme?:
      // style={{
      //   zIndex: 1
      // }}
    >
      {!!children.length &&
        // only render submenu for active path
        this.props.activeFolderPath[depth] === index && (
          <StartSubMenu
            items={children.map((c, index) =>
              this.renderItem(c, index, depth + 1)
            )}
            rightOffset={135}
            style={{
              zIndex: depth + 1,
            }}
          />
        )}
    </StartMenuItem>
  );

  stopEvent = (e: React.MouseEvent<any, any>) => e.stopPropagation();

  render() {
    const { bottom, items } = this.props;

    return (
      <BorderedContainer
        depth={2}
        classes={{
          root: styles.window,
        }}
        style={{
          bottom,
        }}
      >
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <img src={startMenuLogo} className={styles.logo} />
          </div>
          <div onClick={this.stopEvent} className={styles.itemsContainer}>
            <div className={styles.top}>
              {items.map((item, index) => this.renderItem(item, index))}
            </div>
            <div className={styles.dividerContainer}>
              <div className={styles.divider} />
            </div>
            <div className={styles.bottom}>
              <StartMenuItem icon={Icon.Shutdown} label="Shut Down..." />
            </div>
          </div>
        </div>
      </BorderedContainer>
    );
  }
}

export default compose(
  withProps<ProvidedProps, Props>({
    // don't trigger clickout events for start menu
    outsideClickIgnoreClass: clickoutIgnoreClassname,
  }),
  withClickOutHandler
)(StartMenu);
