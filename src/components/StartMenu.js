import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { withProps } from 'recompose';
import withStyles from 'react-jss';
import p from 'prop-types';
import withClickOutHandler from 'react-onclickoutside';

import background from '../../resources/startmenu-blank.png';

import StartMenuItem from './StartMenuItem';
import StartSubMenu from './StartSubMenu';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '200px',
    width: '138px',
    paddingLeft: '20px',
    paddingRight: '3px',
    paddingBottom: '3px',
    position: 'absolute',
    background: `url(${background}) no-repeat left center`,
    backgroundSize: 'contain'
  },
  top: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: '2px'
  },
  divider: {
    height: '8px'
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '30px',
    paddingBottom: '3px'
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
      <div
        onClick={this.stopEvent}
        className={classes.container}
        style={{
          bottom
        }}
      >
        <div className={classes.top}>
          {items.map((item, index) => this.renderItem(item, index))}
        </div>
        <div className={classes.divider} />
        <div className={classes.bottom}>
          <StartMenuItem icon="shutdown" label="Shut Down..." />
        </div>
      </div>
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
