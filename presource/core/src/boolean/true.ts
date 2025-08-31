import { booleanCases } from './cases';
import { FALSE, TRUE } from '../constants/primitive';

// Will Return true if any condition is true
export const booleanTrue = (cases: { [key: string]: any }) => {
  let result = TRUE;
  booleanCases(cases, ({ v }) => {
    if (!v) return (result = FALSE);
  });
  return result;
};
