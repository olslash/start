import React from 'react';
import p from 'prop-types';

import WindowBase from '../WindowBase';
import TitleBar from './TitleBar';
import BorderedContainer from '../BorderedContainer';

import styles from './index.scss';

// todo:
// base inset container component - depth levels (ie. footer inset vs main
// content inset)

const Folder = ({
  title,
  icon,
  active = false,
  height = 200,
  width = 200,
  top = 0,
  left = 0,
  onMinimize,
  onMaximize,
  onClose
}) => (
  <BorderedContainer
    style={{ height, width, top, left }}
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
    >
      Inset container content
    </BorderedContainer>
  </BorderedContainer>
);

Folder.propTypes = {
  title: p.string.isRequired,
  icon: p.string,
  active: p.bool,
  top: p.number,
  left: p.number,
  height: p.number,
  width: p.number,
  onMinimize: p.func,
  onMaximize: p.func,
  onClose: p.func
};

export default Folder;
