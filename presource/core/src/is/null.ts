import { isEqual } from './equal';

/** Checking whether a variable is undefined or not */
export const isNull = (unknown: any): unknown is null => isEqual(unknown, null);
