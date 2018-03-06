import {uuid} from './helpers'

export default [
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
