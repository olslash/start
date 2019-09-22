import { Apps } from 'start/types';
import ImageViewer from './components/AppImageViewer';
import Notepad from './components/AppNotepad';

export const windowsApps: Record<Apps, React.ComponentType> = {
  Notepad,
  ImageViewer
};
