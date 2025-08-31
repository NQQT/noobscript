import { jsonConstant } from '../json';

/** Simple Array Stringify for now */
export const arrayStringify = (array: any[]) => jsonConstant().stringify(array);
