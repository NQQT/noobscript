import { Params } from '..';
import { arrayEach } from '../../each';
import { keysFunction } from './keys';

type RemoveFunction = (params: Params, request: Parameters<typeof keysFunction>[1]) => any;

/** For removing an element from array */
export const removeFunction: RemoveFunction = (params, request) => {
  const { element, instance } = params;
  // Getting the list of keys to remove
  const keys = instance.keys(request);
  // Scanning through the key and removing the element
  arrayEach(keys, ({ v, i }) => {
    const pointer = v - i;
    element.splice(pointer, 1);
  });

  // Return the instance for further chaining
  return instance;
};
