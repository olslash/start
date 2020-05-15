import myComputer from './icon-my-computer.png';
import recycleBinEmpty from './icon-recycle-bin-empty.png';
import recycleBinFull from './icon-recycle-bin-full.png';
import documents from './icon-documents.png';
import find from './icon-find.png';
import help from './icon-help.png';
import programs from './icon-programs.png';
import run from './icon-run.png';
import settings from './icon-settings.png';
import shutdown from './icon-shutdown.png';
import floppyDrive from './icon-floppy-drive.png';
import diskDrive from './icon-disk-drive.png';
import controlPanel from './icon-control-panel.png';
import appNotepad from './icon-app-notepad.png';
import appImageViewer from './icon-app-imageviewer.png';
import folder from './icon-folder-closed.png';
import folderOpen from './icon-folder-open.png';

import buttonClose from './button-close.png';
import buttonMaximize from './button-maximize.png';
import buttonMinimize from './button-minimize.png';

export enum Icon {
  MyComputer = 'myComputer',
  RecycleBinEmpty = 'recycleBinEmpty',
  RecycleBinFull = 'recycleBinFull',
  Documents = 'documents',
  Find = 'find',
  Help = 'help',
  Programs = 'programs',
  Run = 'run',
  Settings = 'settings',
  Shutdown = 'shutdown',
  ButtonClose = 'buttonClose',
  ButtonMaximize = 'buttonMaximize',
  ButtonMinimize = 'buttonMinimize',
  // fixme:
  DiskDrive = 'diskDrive',
  FloppyDrive = 'floppyDrive',
  ControlPanel = 'controlPanel',
  Folder = 'folder',
  FolderOpen = 'folderOpen',
  AppNotepad = 'appNotepad',
  AppImageViewer = 'appImageViewer'
}

const icons: Record<Icon, string> = {
  [Icon.MyComputer]: myComputer,
  [Icon.RecycleBinEmpty]: recycleBinEmpty,
  [Icon.RecycleBinFull]: recycleBinFull,
  [Icon.Documents]: documents,
  [Icon.Find]: find,
  [Icon.Help]: help,
  [Icon.Programs]: programs,
  [Icon.Run]: run,
  [Icon.Settings]: settings,
  [Icon.Shutdown]: shutdown,
  [Icon.ButtonClose]: buttonClose,
  [Icon.ButtonMaximize]: buttonMaximize,
  [Icon.ButtonMinimize]: buttonMinimize,
  // fixme:
  [Icon.DiskDrive]: diskDrive,
  [Icon.FloppyDrive]: floppyDrive,
  [Icon.ControlPanel]: controlPanel,
  [Icon.Folder]: folder,
  [Icon.FolderOpen]: folderOpen,
  [Icon.AppNotepad]: appNotepad,
  [Icon.AppImageViewer]: appImageViewer
};

export default icons;
