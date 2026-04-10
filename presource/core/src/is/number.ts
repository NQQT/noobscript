import { isEqual } from './equal';
import { typeConstructor } from '../type';

// Checking if the value is a number
export const isNumber = (unknown: any): unknown is number => isEqual(typeConstructor(unknown), Number);
