import React, { Component } from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';
import cx from 'classnames';

const styles = {
  _container: {
    position: 'relative'
  },
  _outerBorder: {
    height: '100%',
    width: '100%',
    backgroundColor: '#C3C7CB',

    borderLeft: '1px solid #C3C7CB',
    borderTop: '1px solid #C3C7CB',

    boxShadow: '0.5px 0.5px 0 0.5px black',

    paddingBottom: '1px',
    paddingRight: '1px'
  },
  _innerBorder: {
    height: '100%',
    width: '100%',

    borderLeft: '1px solid white',
    borderTop: '1px solid white',

    boxShadow: '0.5px 0.5px 0 0.5px #868A8E'
  },
  _iconImgContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-0.5px' // deal with offset from drop shadows
  }
};

class WindowBase extends Component {
  static propTypes = {
    className: p.string,
    style: p.objectOf(p.any),
    innerStyle: p.objectOf(p.any),
    handlers: p.objectOf(p.func),
    children: p.node,
    iconSrc: p.string
  };

  render() {
    const { classes, style = {}, children, iconSrc, handlers } = this.props;

    return (
      <div
        className={cx(classes._container, classes.root)}
        style={style}
        {...handlers}
      >
        <div className={classes._iconImgContainer}>
          <img src={iconSrc} className={classes.icon} draggable={false} />
        </div>
        <div className={cx(classes._outerBorder, classes.outer)}>
          <div className={cx(classes._innerBorder, classes.inner)}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(WindowBase);
