import React, { Component } from 'react';
import { compose } from 'redux';
import withStyles from 'react-jss';
import p from 'prop-types';
import onClickOutside from 'react-onclickoutside';

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

class StartMenu extends Component {
  static propTypes = {
    items: p.arrayOf(p.object).isRequired,
    bottom: p.number.isRequired,
    onRequestClose: p.func
  };

  handleClickOutside = () => {
    this.props.onRequestClose();
  };

  render() {
    const { classes, bottom, items } = this.props;

    return (
      <div
        onClick={e => e.stopPropagation()}
        className={classes.container}
        style={{
          bottom
        }}
      >
        <div className={classes.top}>
          {items.map(({ title, icon, children }) => (
            // todo: recursively map over children, rendering submenus here
            <StartMenuItem
              label={title}
              icon={icon}
              moreArrow={children && !!children.length}
              children={children}
              key={title}
            />
          ))}
        </div>
        <div className={classes.divider} />
        <div className={classes.bottom}>
          <StartMenuItem icon="shutdown" label="Shut Down..." />
        </div>
      </div>
    );
  }
}

export default compose(withStyles(styles), onClickOutside)(StartMenu);
