import { isEqual } from './equal';
import { promiseConstant } from '../promise';
import { typeConstructor } from '../type';

// If Object is a Promise
export const isPromise = (unknown: any): unknown is Promise<any> =>
  isEqual(typeConstructor(unknown), promiseConstant());
