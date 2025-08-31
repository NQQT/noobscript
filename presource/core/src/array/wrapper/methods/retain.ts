import { Params } from '..';

type Arguments = any;
type Callback = (args: Arguments) => boolean;
type RetainFunction = (params: Params, callback: Callback) => any;

export const retainFunction: RetainFunction = (params, callback) => {
  const { instance } = params;
  // The Key list
  const toRemoveKeys: number[] = [];
  // Applying Filter on each object
  instance.each((data: any) => {
    // Adding index to key list
    if (!callback(data)) toRemoveKeys.push(data.i);
  });
  // Remove the keys
  instance.remove(toRemoveKeys);
  // Returning Instance
  return instance;
};
