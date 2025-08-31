import { Params } from '..';
import { keysFunction } from './keys';

type GetFunction = (params: Params, request: Parameters<typeof keysFunction>[1]) => any[];

/** Get will always return a clone array instead of the referenced one */
export const getFunction: GetFunction = (params, request) => {
  const { element, instance } = params;
  const result = instance.keys(request);
  // Returning the result
  return result.map((index: number) => element[index]);
};
