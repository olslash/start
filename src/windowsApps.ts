import { Apps } from 'start/types';
import { Icon } from 'resources/icons';
import ImageViewer, {
  Props as ImageViewerProps,
} from './components/AppImageViewer';
import Notepad, { Props as NotepadProps } from './components/AppNotepad';

type AppProps = ImageViewerProps | NotepadProps;

export const windowsApps: Record<Apps, React.ComponentType<AppProps>> = {
  [Apps.Notepad]: Notepad,
  [Apps.ImageViewer]: ImageViewer,
};

export const windowsAppIcons: Record<Apps, Icon> = {
  [Apps.Notepad]: Icon.AppNotepad,
  [Apps.ImageViewer]: Icon.AppImageViewer,
};
