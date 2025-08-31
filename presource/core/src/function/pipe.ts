/**
 * Function pipe executes a series of funtion in order, from top to bottom.
 * Function compose is the reverse, but that is unnecessary, considering pipe do the same thing.
 */

// TODO Fix up these typescript issue.
export const functionPipe = (...fns: any[]) => {
  return (value: any, ...args: any[]) => {
    return fns.reduce((v: any, f: any, i: any) => {
      return i === 0 ? f(v, ...args) : f(v);
    }, value);
  };
};
