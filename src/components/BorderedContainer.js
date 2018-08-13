import React, { Component } from 'react';
import p from 'prop-types';
import cx from 'classnames';

import styles from './borderedContainer.scss';

const borderColorPropType = p.shape({
  topLeft: p.string.isRequired,
  bottomRight: p.string.isRequired
});

class BorderedContainer extends Component {
  static propTypes = {
    depth: p.number,
    // array index = depth (+1)
    borderColors: p.arrayOf(borderColorPropType),
    classes: p.shape({
      root: p.string,
      outer: p.string,
      inner: p.string,
      icon: p.string
    }),
    style: p.objectOf(p.any),
    handlers: p.objectOf(p.func),
    iconSrc: p.string,
    children: p.node
  };

  static defaultProps = {
    depth: 2,
    borderColors: [
      {
        bottomRight: 'black',
        topLeft: '#c3c7cb'
      },
      {
        bottomRight: '#868a8e',
        topLeft: 'white'
      }
    ],
    classes: {},
    style: {}
  };

  render() {
    const {
      depth,
      borderColors,
      classes,
      style,
      iconSrc,
      children,
      handlers
    } = this.props;

    return (
      <div
        className={cx(styles.container, classes.root)}
        style={style}
        {...handlers}
      >
        {this.props.iconSrc && (
          <div className={styles.iconImgContainer}>
            <img src={iconSrc} className={classes.icon} draggable={false} />
          </div>
        )}

        <div
          className={cx(styles.outerBorder, classes.outer)}
          style={{
            borderLeft: `1px solid ${borderColors[0].topLeft}`,
            borderTop: `1px solid ${borderColors[0].topLeft}`,
            boxShadow: `0.5px 0.5px 0 0.5px ${borderColors[0].bottomRight}`
          }}
        >
          {depth === 1 && children}
          {depth === 2 && (
            <div
              className={cx(styles.innerBorder, classes.inner)}
              style={{
                borderLeft: `1px solid ${borderColors[1].topLeft}`,
                borderTop: `1px solid ${borderColors[1].topLeft}`,
                boxShadow: `0.5px 0.5px 0 0.5px ${borderColors[1].bottomRight}`
              }}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BorderedContainer;
