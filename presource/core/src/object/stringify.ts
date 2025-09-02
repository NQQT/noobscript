import { jsonConstant } from '../json';

// Stringify Object
export const objectStringify = (object: { [key: string]: any }) => {
  return jsonConstant().stringify(object);
};
