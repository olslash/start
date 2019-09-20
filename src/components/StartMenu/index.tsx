import * as React from 'react';
import { compose } from 'redux';
import { withProps } from 'recompose';
import * as p from 'prop-types'
import withClickOutHandler from 'react-onclickoutside';

import startMenuLogo from '../../../resources/startmenu-logo.png';

import BorderedContainer from '../BorderedContainer';
import StartMenuItem from './StartMenuItem';
import StartSubMenu from './StartSubMenu';

import styles from './startMenu.scss';

export const clickoutIgnoreClassname = 'start-clickout-ignore';

class StartMenu extends React.Component {
  static propTypes = {
    items: p.arrayOf(p.object).isRequired,
    bottom: p.number.isRequired,
    activeFolderPath: p.arrayOf(p.number).isRequired,
    onRequestClose: p.func,
    onSetActiveFolderPath: p.func.isRequired
  };

  handleClickOutside = () => {
    this.props.onRequestClose();
  };

  renderItem = ({ title, icon, children = [] }, index, depth = 0) => (
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
      style={{
        zIndex: 1
      }}
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
              zIndex: depth + 1
            }}
          />
        )}
    </StartMenuItem>
  );

  stopEvent = e => e.stopPropagation();

  render() {
    const { bottom, items } = this.props;

    return (
      <BorderedContainer
        depth={2}
        classes={{
          root: styles.window
        }}
        style={{
          bottom
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
              <StartMenuItem icon="shutdown" label="Shut Down..." />
            </div>
          </div>
        </div>
      </BorderedContainer>
    );
  }
}

export default compose(
  withProps({
    // don't trigger clickout events for start menu
    outsideClickIgnoreClass: clickoutIgnoreClassname
  }),
  withClickOutHandler
)(StartMenu);
