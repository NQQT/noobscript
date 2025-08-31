import { arrayConstant } from '../array';

/** Checking whether value is an array or not */
export const isArray = <T>(unknown: any): unknown is T[] => arrayConstant().isArray(unknown);
