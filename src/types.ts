import { Icon } from 'resources/icons';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
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
  icon?: Icon;
  name: string;
}

export type Pane = File | App | Folder;

export interface Position {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

export enum FetchingStatus {
  Fetching,
  Failure,
  Success,
  Default
}
