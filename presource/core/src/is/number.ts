import { isEqual } from './equal';
import { typeConstructor } from '../type/constructor';
import { numberConstant } from '../number/constant';

/** Checking if value is a boolean */
export const isNumber = (unknown: any): unknown is number => isEqual(typeConstructor(unknown), numberConstant());
