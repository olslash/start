import * as React from 'react';
import * as p from 'prop-types';

import FolderContents from './Folder/FolderContents';
import { Pane } from 'start/types';

interface Props {
  items: Pane[];
  onFocus(paneName: string): void;
}

const Desktop: React.FunctionComponent<Props> = ({
  items = [],
  onFocus
}: Props) => (
  <div onMouseDown={() => onFocus('Desktop')} style={{ height: '100%' }}>
    <FolderContents items={items} folderName="Desktop" columnLayout />
  </div>
);

export default Desktop;
