import { functionDelay } from '../function/delay';
import { createPromise } from '../promise/create';

/** Wait for something to happen */
export const scriptPause = (time: number) => {
  const control: any = {};
  const promise = createPromise(control);
  functionDelay(() => {
    control.resolve();
  }, time);
  return promise;
};
