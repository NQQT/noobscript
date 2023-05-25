import { isInvalid } from './invalid';

export const isValid = (unknown: any) => !isInvalid(unknown);
