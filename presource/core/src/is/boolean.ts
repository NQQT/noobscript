import { isEqual } from './equal';
import { booleanConstant } from '../boolean/constant';
import { typeConstructor } from '../type/constructor';
import { TRUE, FALSE } from '../constants/primitive';

/** Checking if value is a boolean */
export const isBoolean = (unknown: any): unknown is boolean => isEqual(typeConstructor(unknown), booleanConstant());

export const isBooleanTrue = (value: any) => isEqual(value, TRUE);
export const isBooleanFalse = (value: any) => isEqual(value, FALSE);
