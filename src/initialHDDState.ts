import { map } from 'lodash';
import { Icon } from 'resources/icons';
import { Apps, File, Folder, Pane, WindowType } from 'start/types';

const resumeScreenshots: File[] = [
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/nc3-dashboards.png',
    name: 'Nerve Center 3 Dashboards.png',
    opensWith: Apps.ImageViewer,
    type: WindowType.File
  },
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/nc3-stream-wizard.png',
    name: 'Nerve Center 3 Stream Wizard.png',
    opensWith: Apps.ImageViewer,
    type: WindowType.File
  },
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/nc3-analyze.png',
    name: 'Nerve Center 3 Analyze.png',
    opensWith: Apps.ImageViewer,
    type: WindowType.File
  },
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/nc2-dashboards.jpg',
    name: 'Nerve Center 2 Dashboards.png',
    opensWith: Apps.ImageViewer,
    type: WindowType.File
  },
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/cmdv.png',
    name: 'cmdv-io.png',
    opensWith: Apps.ImageViewer,
    type: WindowType.File
  },
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/storyviz.jpg',
    name: 'Storyviz.png',
    opensWith: Apps.ImageViewer,
    type: WindowType.File
  },
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/baseraiders.png',
    name: 'Base Raiders Calculator.png',
    opensWith: Apps.ImageViewer,
    type: WindowType.File
  },
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/spacegame.jpg',
    name: 'Space game.png',
    opensWith: Apps.ImageViewer,
    type: WindowType.File
  }
];

const textFiles: File[] = [
  {
    type: WindowType.File,
    name: 'My Resume.txt',
    opensWith: Apps.Notepad,
    contentUrl:
      'https://raw.githubusercontent.com/olslash/olslash.github.io/master/resume-plaintext.txt'
  },
  {
    type: WindowType.File,
    name: 'Zack Tanner, Software Engineer.txt',
    opensWith: Apps.Notepad,
    contentUrl:
      'https://raw.githubusercontent.com/olslash/olslash.github.io/master/recommendation-tanner-plaintext.txt'
  },
  {
    type: WindowType.File,
    name: 'Kshitij “Gio” Gujarati, Director of Product.txt',
    opensWith: Apps.Notepad,
    contentUrl:
      'https://raw.githubusercontent.com/olslash/olslash.github.io/master/recommendation-gujarati-plaintext.txt'
  }
];

const folders: Folder[] = [
  {
    type: WindowType.Folder,
    name: 'My Computer',
    icon: Icon.MyComputer
  },
  {
    type: WindowType.Folder,
    name: 'Recycle Bin',
    icon: Icon.RecycleBinEmpty
    // fixme -- full icon
  },
  {
    type: WindowType.Folder,
    name: 'Control Panel',
    icon: Icon.ControlPanel
  },
  {
    type: WindowType.Folder,
    name: 'Desktop'
  },
  {
    type: WindowType.Folder,
    name: '3½ Floppy (A:)',
    icon: Icon.FloppyDrive
  },
  {
    type: WindowType.Folder,
    name: 'Windows 95 (C:)',
    icon: Icon.DiskDrive
  },
  {
    type: WindowType.Folder,
    name: 'Work Samples',
    icon: Icon.Folder
  },
  {
    type: WindowType.Folder,
    name: 'Recommendations',
    icon: Icon.Folder
  }
];

export const itemsByName: {
  [name: string]: Pane;
} = [...textFiles, ...resumeScreenshots, ...folders].reduce(
  (result, item: Pane) => ({
    ...result,
    [item.name]: item
  }),
  {}
);

interface FileTreeEntry {
  name: string;
  children?: FileTreeEntry[];
}

export const fileTree: FileTreeEntry[] = [
  {
    name: 'Desktop',
    children: [
      {
        name: 'My Computer',
        children: [
          {
            name: '3½ Floppy (A:)',
            children: []
          },
          {
            name: 'Windows 95 (C:)',
            children: []
          },
          {
            name: 'Control Panel',
            children: []
          }
        ]
      },
      {
        name: 'Recycle Bin',
        children: []
      },
      {
        name: 'My Resume.txt',
        children: []
      },
      {
        name: 'Recommendations',
        children: [
          {
            name: 'Zack Tanner, Software Engineer.txt'
          },
          {
            name: 'Kshitij “Gio” Gujarati, Director of Product.txt'
          }
        ]
      },
      {
        name: 'Work Samples',
        children: map(resumeScreenshots, v => ({ name: v.name }))
      }
    ]
  }
];
