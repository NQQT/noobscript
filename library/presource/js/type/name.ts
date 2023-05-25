import { typeConstructor } from './constructor';
import { stringLowerCase } from '../string/lower';

/** Return the Constructor name in lower case */
export const typeName = (value: any) => stringLowerCase(typeConstructor(value)?.name || '');
