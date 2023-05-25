import { isBooleanTrue, isBooleanFalse } from '../is/boolean';
import { isArray } from '../is/array';
import { TRUE } from '../constants/primitive';

/** For Boolean Check. If True. Trigger */
export const ifTrue = <T>(value: any, callback: (data: { value: T }) => any = () => TRUE) => {
  // Checking if Boolean True
  if (isBooleanTrue(!!value)) return callback({ value });
};

/** For Boolean Check. If False. Trigger Callback */
export const ifFalse = <T>(value: any, callback: (data: { value: T }) => any = () => TRUE) => {
  if (isBooleanFalse(!!value)) return callback({ value });
};
