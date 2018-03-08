import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { withProps } from 'recompose';
import withStyles from 'react-jss';
import p from 'prop-types';
import withClickOutHandler from 'react-onclickoutside';

import startMenuLogo from '../../resources/startmenu-logo.png';

import WindowBase from './WindowBase';
import StartMenuItem from './StartMenuItem';
import StartSubMenu from './StartSubMenu';

const styles = {
  window: {
    height: '210px',
    width: '138px',
    position: 'absolute'
  },
  container: {
    display: 'flex',
    height: '100%',
    paddingBottom: '2px'
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '20px',
    height: '100%',
    margin: '1px 0px 1px 1px',
    padding: '0 2px 5px 2px',
    backgroundColor: '#868A8E',
  },
  logo: {
    height: '100px'
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',

    height: '100%',
    width: '100%'
  },
  top: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: '1px'
  },
  dividerContainer: {
    height: '8px',
    paddingRight: '1px',
    paddingTop: '2px'
  },
  divider: {
    width: '100%',
    height: '1px',
    boxSizing: 'content-box',
    borderTop: '1px solid #868A8E',
    backgroundColor: 'white',
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '30px'
  }
};

export const clickoutIgnoreClassname = 'start-clickout-ignore';

class StartMenu extends Component {
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
    >
      {!!children.length &&
        // only render submenu for active path
        this.props.activeFolderPath[depth] === index && (
          <StartSubMenu
            items={children.map((c, index) =>
              this.renderItem(c, index, depth + 1)
            )}
            rightOffset={135}
          />
        )}
    </StartMenuItem>
  );

  stopEvent = e => e.stopPropagation();

  render() {
    const { classes, bottom, items } = this.props;

    return (
      <WindowBase
        style={{
          bottom
        }}
        className={classes.window}
      >
        <div className={classes.container}>
        <div className={classes.logoContainer}>
          <img src={startMenuLogo} className={classes.logo} />
        </div>
        <div onClick={this.stopEvent} className={classes.itemsContainer}>
          <div className={classes.top}>
            {items.map((item, index) => this.renderItem(item, index))}
          </div>
          <div className={classes.dividerContainer}>
          <div className={classes.divider} />
          </div>
          <div className={classes.bottom}>
            <StartMenuItem icon="shutdown" label="Shut Down..." />
          </div>
        </div>
        </div>
      </WindowBase>
    );
  }
}

export default compose(
  withStyles(styles),
  withProps({
    // don't trigger clickout events for start menu
    outsideClickIgnoreClass: clickoutIgnoreClassname
  }),
  withClickOutHandler
)(StartMenu);

// fixme -- clicking an item should skip the activation delay
