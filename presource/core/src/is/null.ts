import { isEqual } from './equal';
import { NULL } from '../constants';

/** Checking whether a variable is undefined or not */
export const isNull = (unknown: any): unknown is null => isEqual(unknown, NULL);
