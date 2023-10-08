/**
 * Functional programming is always fun. Currying function is awesome.
 * See test example why that is the case.
 */

// TODO: Fix up these typescript issue.
export const functionCurry = (fn: any): any => {
  const curried = (...args: any[]): any => {
    if (fn.length !== args.length) {
      return curried.bind(null, ...args);
    }
    return fn(...args);
  };
  return curried;
};
