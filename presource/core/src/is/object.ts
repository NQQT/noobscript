import { objectConstant } from '../object';
import { typeConstructor } from '../type';
import { isEqual } from './equal';

/** Checking whether value is an array or not */
export const isObject = (unknown: any): unknown is { [key: string]: any } =>
  isEqual(typeConstructor(unknown), objectConstant());
