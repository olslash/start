import * as React from 'react';
import * as p from 'prop-types';
import cx from 'classnames';
import * as Rnd from 'react-rnd';

import { Position } from 'types';
import { Icon } from '../../../resources/icons';
import BorderedContainer from '../BorderedContainer';
import TitleBar from '../TitleBar';

import styles from './index.scss';

const titleBarHeight = 14;

interface Props {
  children: React.ReactNode;
  id: string;
  zIndex: number;
  title: string;
  icon: Icon;
  focused: boolean;
  top: number;
  left: number;
  height: number;
  width: number;
  maximized: boolean;
  onMinimize: (windowId: string) => void;
  onMaximize: (windowId: string) => void;
  onClose: (windowId: string) => void;
  onFocus: (windowId: string) => void;
  onMove: (windowId: string, position: Position) => void;
}

interface State {
  isDragging: boolean;
}

class WindowBase extends React.Component<Props, State> {
  static defaultProps = {
    focused: false,
    height: 200,
    width: 300,
    top: 0,
    left: 0
  };

  state = {
    isDragging: false
  };

  handleDragStart: Rnd.DraggableEventHandler = () => {
    this.props.onFocus(this.props.id);
  };

  handleDrag: Rnd.DraggableEventHandler = (e, { x, y }) => {
    // don't display dragging state on mouse down; only once user actually
    // starts dragging.
    if (x !== this.props.left || y !== this.props.left) {
      this.setState({ isDragging: true });
    }
  };

  handleDragStop: Rnd.DraggableEventHandler = (e, { x, y }) => {
    this.setState({ isDragging: false });

    this.props.onMove(this.props.id, { left: x, top: y });
  };

  handleResize = () => {
    this.setState({ isDragging: true });
  };

  handleResizeStop: Rnd.ResizeHandler = (
    e,
    direction,
    ref,
    delta,
    { x, y }
  ) => {
    this.props.onMove(this.props.id, {
      left: x,
      top: y,
      width: ref.offsetWidth,
      height: ref.offsetHeight
    });

    this.setState({ isDragging: false });
  };

  render() {
    const cornerDragHandleStyles = {
      width: 5,
      height: 5
    };

    return (
      <React.Fragment>
        {!this.props.maximized && (
          <Rnd.default
            default={{
              x: this.props.left,
              y: this.props.top,
              width: this.props.width,
              height: this.props.height
            }}
            style={{
              zIndex: this.props.zIndex + 1,
              // don't block pointer events for the rest of the window
              pointerEvents: 'none'
            }}
            minWidth={100}
            minHeight={80}
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
            resizeHandleStyles={{
              left: {
                width: 5,
                left: 0
              },
              right: {
                width: 5,
                right: 0
              },
              top: {
                height: 5,
                top: 0
              },
              bottom: {
                height: 5,
                bottom: 0
              },
              topLeft: { ...cornerDragHandleStyles, left: 0, top: 0 },
              topRight: { ...cornerDragHandleStyles, right: 0, top: 0 },
              bottomLeft: { ...cornerDragHandleStyles, left: 0, bottom: 0 },
              bottomRight: { ...cornerDragHandleStyles, right: 0, bottom: 0 }
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
          </Rnd.default>
        )}

        <BorderedContainer
          style={{
            height: this.props.height,
            width: this.props.width,
            top: this.props.top,
            left: this.props.left,
            zIndex: this.props.zIndex
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
            windowId={this.props.id}
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
              root: styles.windowContentContainer,
              inner: styles.windowContentContainerContent
            }}
            style={{
              height: `calc(100% - ${titleBarHeight}px)`
            }}
            scrollable
          >
            {this.props.children}
          </BorderedContainer>
        </BorderedContainer>
      </React.Fragment>
    );
  }
}

export default WindowBase;