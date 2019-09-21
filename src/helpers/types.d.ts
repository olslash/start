declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'types' {
  type App = 'ImageViewer' | 'Notepad';

  interface File {
    contentUrl: string;
    title: string;
    opensWith: App;
  }

  enum WindowType {
    Folder,
    App
  }

  interface Position {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
  }
}
