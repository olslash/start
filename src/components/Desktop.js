import React from 'react';
import withStyles from 'react-jss';
import p from 'prop-types';

import DesktopItem from './DesktopItem';

const styles = {
  container: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    padding: '5px',
    display: 'grid',
    gridGap: '30px',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'repeat(3, 40px)',
    gridTemplateRows: 'repeat(4, 40px)'
  }
};

const Desktop = ({ classes, items = [] }) => (
  <div className={classes.container}>
    {items.map(item => <DesktopItem {...item} key={item.title} />)}
  </div>
);

Desktop.propTypes = {
  items: p.arrayOf(
    p.shape({
      title: p.string.isRequired,
      icon: p.string.isRequired
    })
  )
};

export default withStyles(styles)(Desktop);
