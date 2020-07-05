import { StartMenuItem } from 'start/types';
import { Icon } from 'resources/icons';

const items: StartMenuItem[] = [
  {
    title: 'Programs',
    icon: Icon.Programs,
    children: [
      {
        title: 'Some Folder',
        icon: Icon.Programs,
        children: [{ title: 'programs folder app 1', icon: Icon.Run }],
      },
      {
        title: 'programs app 1',
        icon: Icon.Run,
      },
    ],
  },
  {
    title: 'Documents',
    icon: Icon.Documents,
    children: [
      {
        title: 'documents app 1',
        icon: Icon.Run,
      },
    ],
  },
  {
    title: 'Settings',
    icon: Icon.Settings,
    children: [
      {
        title: 'settings app 1',
        icon: Icon.Run,
      },
    ],
  },
  {
    title: 'Find',
    icon: Icon.Find,
    children: [
      {
        title: 'find app 1',
        icon: Icon.Run,
      },
    ],
  },
  { title: 'Help', icon: Icon.Help }, // todo: action
  { title: 'Run', icon: Icon.Run },
];

export default items;
