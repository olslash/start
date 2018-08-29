import React from 'react';
import p from 'prop-types';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { itemsForFolder } from '../../state/explorer';
import BorderedContainer from '../BorderedContainer';
import TitleBar from './TitleBar';
import FolderContents from './FolderContents';

import styles from './index.scss';

const titleBarHeight = 14;

const Folder = ({
  id,
  title,
  icon,
  focused = false,
  items = [],
  height = 200,
  width = 300,
  top = 0,
  left = 0,
  maximized,
  onMinimize,
  onMaximize,
  onClose,
  onFocus
}) => (
  <BorderedContainer
    style={{ height, width, top, left, zIndex: 100 }}
    depth={2}
    classes={{
      root: cx(styles.container, {
        [styles.maximized]: maximized
      }),
      inner: styles.containerInner
    }}
    handlers={{
      onClick: e => {
        // focus this pane via click on titlebar, edges, etc
        onFocus(id);
      }
    }}
  >
    <TitleBar
      title={title}
      active={focused}
      icon={icon}
      height={titleBarHeight}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={onClose}
      folderId={id}
    />
    <BorderedContainer
      depth={2}
      borderColors={[
        {
          bottomRight: 'white',
          topLeft: '#868a8e'
        },
        {
          bottomRight: '#c3c7cb',
          topLeft: 'black'
        }
      ]}
      classes={{
        root: styles.folderContentContainer,
        inner: styles.folderContentContainerContent
      }}
      style={{
        height: `calc(100% - ${titleBarHeight}px)`
      }}
      scrollable
    >
      <FolderContents items={items} folderId={id} darkItemTitles />
    </BorderedContainer>
  </BorderedContainer>
);

Folder.propTypes = {
  id: p.string.isRequired,
  title: p.string.isRequired,
  icon: p.string,
  focused: p.bool,
  items: p.arrayOf(
    p.shape({
      title: p.string.isRequired,
      icon: p.string.isRequired
    })
  ),
  top: p.number,
  left: p.number,
  height: p.number,
  width: p.number,
  maximized: p.bool,
  onMinimize: p.func,
  onMaximize: p.func,
  onClose: p.func,
  onFocus: p.func.isRequired
};

export default compose(
  connect((state, ownProps) => ({
    items: itemsForFolder(state, ownProps.id)
  }))
)(Folder);
