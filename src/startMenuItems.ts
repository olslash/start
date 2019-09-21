interface StartMenuItem {
  title: string;
  icon: string;
  children?: StartMenuItem[];
}

const items: StartMenuItem[] = [
  {
    title: 'Programs',
    icon: 'programs',
    children: [
      {
        title: 'Some Folder',
        icon: 'programs',
        children: [{ title: 'programs folder app 1', icon: 'run' }]
      },
      {
        title: 'programs app 1',
        icon: 'run'
      }
    ]
  },
  {
    title: 'Documents',
    icon: 'documents',
    children: [
      {
        title: 'documents app 1',
        icon: 'run'
      }
    ]
  },
  {
    title: 'Settings',
    icon: 'settings',
    children: [
      {
        title: 'settings app 1',
        icon: 'run'
      }
    ]
  },
  {
    title: 'Find',
    icon: 'find',
    children: [
      {
        title: 'find app 1',
        icon: 'run'
      }
    ]
  },
  { title: 'Help', icon: 'help' }, // todo: action
  { title: 'Run', icon: 'run' }
];

export default items;