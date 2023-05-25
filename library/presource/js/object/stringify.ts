import { jsonConstant } from '../json/constant';

// Stringify Object
export const objectStringify = (object: { [key: string]: any }) => {
  return jsonConstant().stringify(object);
};
