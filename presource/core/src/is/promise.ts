import { isEqual } from './equal';
import { promiseConstant } from '../promise/constant';
import { typeConstructor } from '../type/constructor';

// If Object is a Promise
export const isPromise = (unknown: any): unknown is Promise<any> =>
  isEqual(typeConstructor(unknown), promiseConstant());
