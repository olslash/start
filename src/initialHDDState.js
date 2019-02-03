import { mapValues, map } from 'lodash';

function addIdFields(objects) {
  return mapValues(objects, (val, key) => ({
    ...val,
    id: key
  }));
}

const resumeScreenshots = [
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/nc3-dashboards.png',
    title: 'Nerve Center 3 Dashboards.png',
    opensWith: 'AppImageViewer'
  },
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/nc3-stream-wizard.png',
    title: 'Nerve Center 3 Stream Wizard.png',
    opensWith: 'AppImageViewer'
  },
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/nc3-analyze.png',
    title: 'Nerve Center 3 Analyze.png',
    opensWith: 'AppImageViewer'
  },
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/nc2-dashboards.jpg',
    title: 'Nerve Center 2 Dashboards.png',
    opensWith: 'AppImageViewer'
  },
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/cmdv.png',
    title: 'cmdv-io.png',
    opensWith: 'AppImageViewer'
  },
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/storyviz.jpg',
    title: 'Storyviz.png',
    opensWith: 'AppImageViewer'
  },
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/baseraiders.png',
    title: 'Base Raiders Calculator.png',
    opensWith: 'AppImageViewer'
  },
  {
    contentUrl:
      'https://raw.githubusercontent.com/olslash/resume/master/screenshots/spacegame.jpg',
    title: 'Space game.png',
    opensWith: 'AppImageViewer'
  }
].reduce(
  (result, v) => ({
    [v.title]: {
      ...v,
      type: 'file',
      icon: 'appImageViewer',
      id: v.title
    },
    ...result
  }),
  {}
);

export const itemsById = Object.assign(
  addIdFields({
    myComputer: {
      type: 'folder',
      title: 'My Computer',
      icon: 'myComputer'
    },
    recycleBin: {
      type: 'folder',
      title: 'Recycle Bin',
      icon: 'recycleBinEmpty'
      // fixme -- full icon
    },
    controlPanel: {
      type: 'folder',
      title: 'Control Panel',
      icon: 'controlPanel'
    },
    desktop: {
      type: 'folder',
      title: 'Desktop',
      icon: null
    },
    driveA: {
      type: 'folder',
      title: '3½ Floppy (A:)',
      icon: 'floppyDrive'
    },
    driveC: {
      type: 'folder',
      title: 'Windows 95 (C:)',
      icon: 'diskDrive'
    },
    workSamplesFolder: {
      type: 'folder',
      title: 'Work Samples',
      icon: 'folder'
    },
    recommendationsFolder: {
      type: 'folder',
      title: 'Recommendations',
      icon: 'folder'
    },
    resumeFile: {
      type: 'file',
      title: 'My Resume.txt',
      icon: 'appNotepad',
      opensWith: 'AppNotepad',
      contentUrl:
        'https://raw.githubusercontent.com/olslash/olslash.github.io/master/resume-plaintext.txt'
    },
    tannerRecommendationFile: {
      type: 'file',
      title: 'Zack Tanner, Software Engineer.txt',
      icon: 'appNotepad',
      opensWith: 'AppNotepad',
      contentUrl:
        'https://raw.githubusercontent.com/olslash/olslash.github.io/master/recommendation-tanner-plaintext.txt'
    },
    gujaratiRecommendationFile: {
      type: 'file',
      title: 'Kshitij “Gio” Gujarati, Director of Product.txt',
      icon: 'appNotepad',
      opensWith: 'AppNotepad',
      contentUrl:
        'https://raw.githubusercontent.com/olslash/olslash.github.io/master/recommendation-gujarati-plaintext.txt'
    }
  }),
  resumeScreenshots
);

export const fileTree = [
  {
    id: itemsById.desktop.id,
    children: [
      {
        id: itemsById.myComputer.id,
        children: [
          {
            id: itemsById.driveA.id,
            children: []
          },
          {
            id: itemsById.driveC.id,
            children: [
              {
                id: itemsById.resumeFile.id
              }
            ]
          },
          {
            id: itemsById.controlPanel.id,
            children: []
          }
        ]
      },
      {
        id: itemsById.recycleBin.id,
        children: []
      },
      {
        id: itemsById.workSamplesFolder.id,
        children: map(resumeScreenshots, v => ({ id: v.id }))
      },
      {
        id: itemsById.recommendationsFolder.id,
        children: [
          {
            id: 'tannerRecommendationFile'
          },
          {
            id: 'gujaratiRecommendationFile'
          }
        ]
      }
      // {
      //   id: itemsById.resumeFile.id,
      //   children: []
      // }
    ]
  }
];
