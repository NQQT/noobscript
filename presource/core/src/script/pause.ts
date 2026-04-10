import { functionDelay } from '../function';
import { promiseCreate } from '../promise';

/** Wait for something to happen */
export const scriptPause = (time: number) => {
    const control: any = {};
    const promise = promiseCreate(control);
    functionDelay(() => {
        control.resolve();
    }, time);
    return promise;
};
