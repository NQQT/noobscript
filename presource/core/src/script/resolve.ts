import { isValid } from '../is/valid';
import { loopForAsync } from '../loop/for';
import { objectAlias } from '../object/alias';
import { scriptPause } from '../script/pause';

type Arguments = {
  // The Counter
  count: number;
  c: number;
};

type Callback = (args: Arguments) => any;
export type ScriptResolve = (resolveFunction: Callback, maxRetries?: number, delayInterval?: number) => Promise<any>;

/** Resolving a callback  */
export const scriptResolve: ScriptResolve = async (callback, retries = 40, delay = 50) => {
  // The Original Parameter
  const params = {
    count: 0,
  };
  const args = objectAlias(params, {
    c: 'count',
  });

  // Loop with endless retries
  return await loopForAsync(retries, async ({ c }) => {
    // Updating the Argument
    args.c = c;
    // Getting the value
    const value = await callback(args);
    // If value is valid
    if (isValid(value)) return value;
    // Pausing the script before repeating
    await scriptPause(delay);
  });
};
