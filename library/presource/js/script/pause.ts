import { functionDelay } from '../function';
import { createPromise } from '../promise';

/** Wait for something to happen */
export const scriptPause = (time: number) => {
  const control: any = {};
  const promise = createPromise(control);
  functionDelay(() => {
    control.resolve();
  }, time);
  return promise;
};
