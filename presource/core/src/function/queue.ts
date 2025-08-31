import { functionDelay } from './delay';
import { isPromise } from '../is/promise';
import { isUndefined } from '../is/undefined';
import { FALSE, TRUE } from '../constants/primitive';
import { objectUpdate } from '../object/update';

type ListenerHandler = {
  // Trigger on every time a function is executed
  execute?: (data: any) => any;
  // Trigger every time function is completed
  complete?: (data: any) => any;
};

type Arguments = {
  queue: QueueFunction;
};

type CallbackFunction = (args: Arguments) => any;

type QueueFunction = {
  (callback: CallbackFunction): any;
  kill: () => any;
  done: () => any;
};

/** For Queuing Function, calling them in logical sequence */
export const functionQueue = (listener: ListenerHandler = {}): QueueFunction => {
  // Setting up the Memory
  const memory: any = { queue: [], on: listener };
  let pointer = 0;
  let busy = FALSE;

  // Continue Queue Function
  const continueQueue = (result: any) => {
    memory.on.execute?.(result);
    busy = FALSE;
    processQueue();
  };

  // The Main Processor Function
  const processQueue = () => {
    // Guard Clause. Busy. Return immediately
    if (busy) return;
    // Set Busy to True to prevent repeating processor
    busy = TRUE;

    // Get Queue List
    const { queue } = memory;
    // If there is any queue available, process
    if (queue.length) {
      // Extract Delay Function
      const { delay } = queue[0];

      // Triggering Function in Delay Mode
      // This allowed queueing lots of function before the first one get executed
      functionDelay(() => {
        // Get the Script
        const callback: any = queue.shift();
        // Set the pointer to 0. This allow queue to be add immediately at beginning
        pointer = 0;

        // Script Must be Valid
        if (callback) {
          // Getting the Response
          const response = callback({ queue: accessorFunction, current: callback });
          // If response is valid, and it is a promise
          if (response && isPromise(response)) {
            // Chaining Response Promise
            response.then((res) => continueQueue({ queue: callback, response: res }));
          } else {
            // Continue Queue
            continueQueue({ queue: callback, response });
          }
        }
      }, delay || 0);
    } else {
      // There is no more queue item left
      functionDelay(() => {
        // Trigger complete. This involve removing the listener event as well
        completeScriptObject(memory);
      });
    }
  };

  // The Accessor Function
  const accessorFunction: any = (script?: any): any => {
    // Return the Memory Object
    if (isUndefined(script)) return memory;
    // Adding Queue To List
    memory.queue.splice(pointer, 0, script);
    pointer++;
    // Process the Queue
    functionDelay(processQueue);
    // Return the optional setting controller
    return {
      // Set the Delay
      delay: (count: number) => (script.delay = count),
      // Set the id value
      id: (id: any) => (script.id = id),
    };
  };

  objectUpdate(accessorFunction, {
    kill: () => destroyScriptObject(memory),
    done: () => completeScriptObject(memory),
  });

  // Return the Accessor Function
  return accessorFunction;
};

/** This will complete the script object immediately */
const completeScriptObject = (memory: any) => {
  const complete = memory.on.complete;
  destroyScriptObject(memory);
  if (complete) complete();
};

/** This will kill the script function */
const destroyScriptObject = (memory: any) => {
  // Clear the Queue
  objectUpdate(memory, { queue: [] });
};
