import { isEqual } from './equal';
import { stringConstant } from '../string';
import { typeConstructor } from '../type';

// Checking if variable is a string or not
export const isString = (unknown: any): unknown is string => isEqual(typeConstructor(unknown), stringConstant());

// Checkig if variable is an empty string or not. Don't need to check whether item is a string or not
export const isStringEmpty = (unknown: any): unknown is '' => isEqual(unknown, '');
