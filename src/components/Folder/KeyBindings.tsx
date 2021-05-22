import { union } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import useHotkey from 'start/hooks/useHotkey';
import { openPane } from 'start/state/explorer';
import { GlobalState } from 'start/state/globalState';

interface OwnProps {
  folderName: string;
  selectedItemName?: string;
  multiSelectedItems: string[];
  disabled: boolean;
}

interface DispatchProps {
  openPane(name: string, openerName: string): void;
}

export type Props = OwnProps;
type InternalProps = DispatchProps & Props;

const KeyBindings: React.FC<InternalProps> = ({
  folderName,
  selectedItemName,
  multiSelectedItems,
  disabled,
  openPane,
}) => {
  /**
   *  Open selected item on <Enter>
   */
  const handleEnter = React.useCallback(() => {
    if (disabled || !selectedItemName) {
      return;
    }

    const items = union([selectedItemName], multiSelectedItems);

    items.forEach((itemName) => {
      openPane(itemName, folderName);
    });
  }, [disabled, folderName, multiSelectedItems, openPane, selectedItemName]);

  useHotkey('enter', handleEnter);

  return null;
};

export default connect<void, DispatchProps, Props, GlobalState>(null, {
  openPane,
} as DispatchProps)(KeyBindings);
