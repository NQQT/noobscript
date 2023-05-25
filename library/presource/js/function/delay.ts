/** Delay a function call */
export const functionDelay = (callback: (...args: any[]) => void, delay: number = 0) =>
  setTimeout(() => {
    // Calling the Call back
    callback({
      // Delay Function. Can use to call itself
      delay: (time: number) => {
        // Recursive. Delay it for Later
        functionDelay(callback, time);
      },
    });
  }, delay);
