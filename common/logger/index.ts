/**
 * Standard Logger Function, for loging anything from standard output to complex table structures
 */
export const logger = {
  error: (message: string) => {
    throw new Error(message);
  },
  warn: (message: string) => {
    // tslint:disable-next-line:no-console
    console.warn(message);
  },
};
