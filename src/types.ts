import { Icon } from 'resources/icons';
import { maximizePane } from './state/explorer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
export interface StartMenuItem {
  title: string;
  icon: Icon;
  children?: StartMenuItem[];
}

export enum Apps {
  ImageViewer = 'ImageViewer',
  Notepad = 'Notepad'
}

export enum WindowType {
  Folder,
  App,
  File
}

export interface File {
  type: WindowType.File;
  contentUrl: string;
  name: string;
  opensWith: Apps;
}

export interface App {
  type: WindowType.App;
  name: string;
}

export interface Folder {
  type: WindowType.Folder;
  icon: Icon;
  name: string;
}

export type Pane = File | Folder;

export interface Position {
  top: number;
  left: number;
  width: number;
  height: number;
}

export enum FetchingStatus {
  Fetching,
  Failure,
  Success,
  Default
}

interface _PaneState {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
}

export type PaneState = _PaneState & Position;
