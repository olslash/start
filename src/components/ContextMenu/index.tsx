import * as React from 'react';
import BorderedContainer from 'start/components/BorderedContainer';

import styles from './index.scss';

const ContextMenu: React.FunctionComponent = ({ children }) => (
  <BorderedContainer
    depth={2}
    classes={{ root: styles.outerContainer }}
    style={{
      zIndex: 200,
    }}
  >
    {children}
  </BorderedContainer>
);

export default ContextMenu;
