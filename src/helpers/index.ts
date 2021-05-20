import { find, flatten, partition } from 'lodash';
import { eventChannel } from 'redux-saga';

export function intervalChan(timeMs: number) {
  return eventChannel<true>((emitter) => {
    const iv = setInterval(() => emitter(true), timeMs);
    return () => clearInterval(iv);
  });
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function uuid(): string {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4()}-${s4()}`;
}

interface TreeEntry {
  name: string;
  children?: TreeEntry[];
}

export function treeFind(
  tree: TreeEntry[],
  pattern: { [key: string]: unknown }
): TreeEntry | undefined {
  const result = find(tree, pattern) as TreeEntry | undefined;

  if (result) {
    return result;
  }

  for (const { children } of tree) {
    if (!children) {
      continue;
    }

    const result = treeFind(children, pattern);

    if (result) {
      return result;
    }
  }

  return undefined;
}

export function moveOrPrependToFront(array: string[], searchString: string) {
  const ordered = flatten(partition(array, (o) => o === searchString));

  return ordered[0] === searchString ? ordered : [searchString, ...ordered];
}
