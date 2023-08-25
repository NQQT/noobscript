/**
 *
 * A way to triggers a series of callback easily
 *
 */

import { NULL } from '../constants/primitive';
import { functionQueue } from '../function/queue';
import { objectMap } from '../object/map';
import { objectUpdate } from '../object/update';
import { createPromise } from '../promise/create';

// Callback is recursive. It will always return the Relay
type CallbackTrigger<T extends {}> = (...input: any[]) => RelayObject<T>;
// This is the Relay object
type RelayObject<T extends {}> = Promise<any> & { [key in keyof T]: CallbackTrigger<T> };

type Arguments = {
  script: RelayObject<{}>;
  args: any[];
};
type Callback = (args: Arguments) => any;
export type ScriptChain = <T extends { [key: string]: Callback }>(list: T) => RelayObject<T>;

/** The Primary Relay Function */
export const scriptChain: ScriptChain = (list) => {
  // Build a Handler Function
  const script: any = () => {
    // Advance usage is not defined yet.
    return null;
  };
  let relay: any = null;
  let queue: any = null;

  // Constructing the necessary callbacks functions
  const callbacks = objectMap(list, ({ v: callback }: any) => {
    // New Wrapper Function
    return (...args: any[]) => {
      // Generate Instance
      generateInstance();

      // Queing a New Function to handle callback
      queue(async () => {
        // The Parameter
        const params = { script, args };
        // Triggering the callback
        await callback(params);
      });

      // Returning the relay function
      return relay;
    };
  });

  const generateInstance = () => {
    // if Instance is valid. Return it
    if (relay) return;

    // Setting up an instance
    const promiseControl: any = {};
    // Creating a relay promise object with callbacks hooks
    relay = createPromise(promiseControl);
    objectUpdate(relay, callbacks);

    // Creating a New Queue
    queue = functionQueue({
      // Upon Complete
      complete: () => {
        const { resolve } = promiseControl;
        // Clearing the Instance
        relay = NULL;
        queue = NULL;
        // Triggering Resolve
        resolve();
      },
    });
  };

  objectUpdate(script, callbacks);
  return script;
};
