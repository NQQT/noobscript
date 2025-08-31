import { instanceCreate } from '../instance/create';
import { promiseConstant } from './constant';

/** Creating a New Promise */
export const createPromise = (control: any = {}) =>
  // Return a newly created promise
  instanceCreate(promiseConstant(), (resolve: any, reject: any) => {
    // Resolve and Reject controller
    control.resolve = resolve;
    control.reject = reject;
  });
