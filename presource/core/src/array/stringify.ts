import { jsonConstant } from '../json/constant';

/** Simple Array Stringify for now */
export const arrayStringify = (array: any[]) => jsonConstant().stringify(array);
