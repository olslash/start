import React, { Component, Fragment } from 'react';
import p from 'prop-types';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Rnd from 'react-rnd';

import { itemsForFolder } from '../../state/explorer';
import BorderedContainer from '../BorderedContainer';
import TitleBar from './TitleBar';
import FolderContents from './FolderContents';

import styles from './index.scss';

const titleBarHeight = 14;

class Folder extends Component {
  static propTypes = {
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
    onFocus: p.func.isRequired,
    onMove: p.func.isRequired
  };

  static defaultProps = {
    focused: false,
    items: [],
    height: 200,
    width: 300,
    top: 0,
    left: 0
  };

  state = {
    isDragging: false
  };

  handleDragStart = () => {
    this.props.onFocus(this.props.id);
  };

  handleDrag = (e, { x, y }) => {
    // don't display dragging state on mouse down; only once user actually
    // starts dragging.
    if (x !== this.props.left || y !== this.props.left) {
      this.setState({ isDragging: true });
    }
  };

  handleDragStop = (e, { x, y }) => {
    this.setState({ isDragging: false });

    this.props.onMove(this.props.id, { left: x, top: y });
  };

  handleResize = () => {
    this.setState({ isDragging: true });
  };

  handleResizeStop = (e, direction, ref, delta, { x, y }) => {
    this.props.onMove(this.props.id, {
      left: x,
      top: y,
      width: ref.offsetWidth,
      height: ref.offsetHeight
    });

    this.setState({ isDragging: false });
  };

  render() {
    return (
      <Fragment>
        {!this.props.maximized && (
          <Rnd
            default={{
              x: this.props.left,
              y: this.props.top,
              width: this.props.width,
              height: this.props.height
            }}
            style={{
              zIndex: 9999,
              // don't block pointer events for the rest of the folder
              pointerEvents: 'none'
            }}
            className={cx({ [styles.rndContainer]: this.state.isDragging })}
            onDragStart={this.handleDragStart}
            onDrag={this.handleDrag}
            onDragStop={this.handleDragStop}
            dragHandleClassName=".draghandle"
            onResize={this.handleResize}
            onResizeStop={this.handleResizeStop}
            resizeHandleWrapperStyle={{
              pointerEvents: 'auto'
            }}
          >
            <div
              className="draghandle"
              style={{
                position: 'absolute',
                height: titleBarHeight,
                // background: 'red',
                top: 4,
                left: 4,
                right: 50, // clear buttons (hack),
                pointerEvents: 'auto'
              }}
              onDoubleClick={() => this.props.onMaximize(this.props.id)}
            />
          </Rnd>
        )}

        <BorderedContainer
          style={{
            height: this.props.height,
            width: this.props.width,
            top: this.props.top,
            left: this.props.left,
            zIndex: 100
          }}
          depth={2}
          classes={{
            root: cx(styles.container, {
              [styles.maximized]: this.props.maximized
            }),
            inner: styles.containerInner
          }}
          handlers={{
            onClick: () => {
              // focus this pane via click on titlebar, edges, etc
              this.props.onFocus(this.props.id);
            }
          }}
        >
          <TitleBar
            title={this.props.title}
            active={this.props.focused}
            icon={this.props.icon}
            height={titleBarHeight}
            onMinimize={this.props.onMinimize}
            onMaximize={this.props.onMaximize}
            onDoubleClick={this.props.onMaximize}
            onClose={this.props.onClose}
            folderId={this.props.id}
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
            <FolderContents
              items={this.props.items}
              folderId={this.props.id}
              darkItemTitles
            />
          </BorderedContainer>
        </BorderedContainer>
      </Fragment>
    );
  }
}

export default compose(
  connect((state, ownProps) => ({
    items: itemsForFolder(state, ownProps.id)
  }))
)(Folder);
