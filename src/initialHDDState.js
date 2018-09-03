import { mapValues } from 'lodash';

function addIdFields(objects) {
  return mapValues(objects, (val, key) => ({
    ...val,
    id: key
  }));
}

export const itemsById = addIdFields({
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
  testFolder: {
    type: 'folder',
    title: 'my cool test folder',
    icon: 'folder'
  },
  testFile: {
    type: 'file',
    title: 'my cool test file',
    icon: 'appNotepad',
    opensWith: 'app-notepad'
    // todo: "apps", file contents, etc
  }
});

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
                id: itemsById.testFile.id,
                children: []
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
        id: itemsById.testFolder.id,
        children: []
      }
      // {
      //   id: itemsById.testFile.id,
      //   children: []
      // }
    ]
  }
];
