import { isNull } from './null';
import { isUndefined } from './undefined';

// Checking if value is invalid or not
export const isInvalid = (unknown: any): unknown is null | undefined => isNull(unknown) || isUndefined(unknown);
