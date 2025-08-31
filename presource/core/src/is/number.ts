import { isEqual } from './equal';
import { typeConstructor } from '../type';
import { numberConstant } from '../number';

/** Checking if value is a boolean */
export const isNumber = (unknown: any): unknown is number => isEqual(typeConstructor(unknown), numberConstant());
