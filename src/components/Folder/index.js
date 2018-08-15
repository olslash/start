import React from 'react';
import p from 'prop-types';

import BorderedContainer from '../BorderedContainer';
import TitleBar from './TitleBar';
import FolderContents from './FolderContents';

import styles from './index.scss';

const titleBarHeight = 14;

const Folder = ({
  id,
  title,
  icon,
  active = false,
  items = [],
  height = 200,
  width = 300,
  top = 0,
  left = 0,
  onMinimize,
  onMaximize,
  onClose
}) => (
  <BorderedContainer
    style={{ height, width, top, left, zIndex: 100 }}
    depth={2}
    classes={{
      root: styles.container,
      inner: styles.containerInner
    }}
  >
    <TitleBar
      title={title}
      active={active}
      icon={icon}
      height={titleBarHeight}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={onClose}
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
  active: p.bool,
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
  onMinimize: p.func,
  onMaximize: p.func,
  onClose: p.func
};

export default Folder;
