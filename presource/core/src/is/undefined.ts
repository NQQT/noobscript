import { isEqual } from './equal';
import { UNDEFINED } from '../constants';

/** Checking whether a variable is undefined or not */
export const isUndefined = (unknown: any): unknown is undefined => isEqual(unknown, UNDEFINED);
