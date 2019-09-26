import * as React from 'react';

import startUp from '../../resources/start-up.png';
import startDown from '../../resources/start-down.png';
import ImageButton, { Props as ImageButtonProps } from './ImageButton';
import { clickoutIgnoreClassname } from './StartMenu';

const StartButtonUp = () => <img style={{ height: '100%' }} src={startUp} />;

const StartButtonDown = () => (
  <img style={{ height: '100%' }} src={startDown} />
);

type Props = Omit<ImageButtonProps, 'renderUp' | 'renderDown'>;

const StartButton: React.FunctionComponent<Props> = ({ ...props }: Props) => (
  <ImageButton
    {...props}
    renderUp={StartButtonUp}
    renderDown={StartButtonDown}
    // don't trigger clickout events for start menu
    // https://github.com/Pomax/react-onclickoutside#marking-elements-as-skip-over-this-one-during-the-event-loop
    className={clickoutIgnoreClassname}
  />
);

StartButton.propTypes = {};

export default StartButton;
