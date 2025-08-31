import { typeSwitch } from '../type';

/** Ensuring something is an array regardless of whatever it is */
export const arrayEnsures = (unknown?: any): any[] =>
  // Using typeswitch
  typeSwitch(unknown, {
    // Function needs to be evaluated via proxy
    function: () => arrayEnsures(unknown()),
    // If it is undefined. It will automatically create an array
    undefined: () => [],
    // If it is an array. Return it as it is
    array: () => unknown,
    // Return Unknown as an array
    default: () => [unknown],
  });
