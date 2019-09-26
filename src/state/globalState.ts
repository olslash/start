import { State as Clock } from './clock';
import { State as Explorer } from './explorer';
import { State as RemoteFile } from './remoteFile';

export type GlobalState = {
  clock: Clock;
  explorer: Explorer;
  remoteFile: RemoteFile;
};
