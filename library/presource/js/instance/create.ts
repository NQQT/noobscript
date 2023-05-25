/** Create a New Class of Anything */
export const instanceCreate = (...args: any[]) => {
  // Remove the first element
  const instance = args.shift();
  // For Creating New Class
  return new instance(...args);
};
