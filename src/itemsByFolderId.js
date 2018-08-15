import { uuid } from './helpers';

const desktop = [
  {
    title: 'My Computer',
    icon: 'myComputer'
  },
  {
    title: 'Recycle Bin',
    icon: 'recycleBin'
  }
].map(item => ({
  ...item,
  id: uuid()
}));

export default {
  desktop,
  myComputer: [
    {
      title: 'Removable Disk (A:)',
      icon: 'myComputer'
    },
    {
      title: 'Windows 95 (C:)',
      icon: 'myComputer'
    },
    {
      title: 'Control Panel',
      icon: 'myComputer'
    },
    {
      title: 'Printers',
      icon: 'myComputer'
    }
  ].map(item => ({
    ...item,
    id: uuid()
  }))
};
