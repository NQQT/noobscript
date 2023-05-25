import { typeSwitch } from '../type/switch';
import { objectKeys } from '../object/keys';
import { FALSE, TRUE } from '../constants/primitive';
import { booleanCases } from './cases';

// Any of the element to be true
export const booleanPartialTrue = (cases: { [key: string]: any }) => {
  let result = FALSE;
  booleanCases(cases, ({ v }) => {
    v = typeSwitch(v, {
      // Recursive if it is an Object
      object: ({ value }) => (objectKeys(value).length ? booleanPartialTrue(value) : TRUE),
      default: () => v,
    });
    // If v is true. Return result as true
    if (v) return (result = TRUE);
  });
  // Return the Final Result
  return result;
};

export const booleanPartialFalse = (cases: { [key: string]: any }) => {
  let result = FALSE;
  booleanCases(cases, ({ v }) => {
    v = typeSwitch(v, {
      // Recursive if it is an Object
      object: ({ value }) => (objectKeys(value).length ? booleanPartialTrue(value) : TRUE),
      default: () => v,
    });
    // If v is true. Return result as true
    if (!v) return (result = TRUE);
  });
  // Return the Final Result
  return result;
};
