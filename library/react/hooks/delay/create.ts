/**
 *
 * Delay hook will release a value after a certain time has passed
 * Alternativelly, it can also use as async
 *
 */

import { createReactReferenceHook } from '../reference';
import { createReactStateHook } from '../state';
import { isUndefined } from '@library/presource/js/is/undefined';
import { isPromise } from '@library/presource/js/is/promise';
import { isFunction } from '@library/presource/js/is/function';
import { typeSwitch } from '@library/presource/js/type/switch';

/** This is for creating a delay hook */
export const createReactDelayHook = (react: any) => {
  // Extarcting the native hooks from react
  const { useEffect } = react;
  // Use internal hook wrappers
  const useReference = createReactReferenceHook(react);
  const useState = createReactStateHook(react);

  return (input?: any, waitFor: number = 0) => {
    // Create a State
    const state = useState();
    // Save the timeout as reference
    const timeout = useReference();
    const delay = useReference();

    // The Set funtion
    const setFunction = (value: any) => {
      // Save the timeout instance to reference for later clearing
      timeout(
        // Update timeout reference
        setTimeout(() => {
          // Return the result depend on  the value input
          const result = typeSwitch(value, {
            // Triggering the function
            function: ({ v }) => v(),
            // Return the default
            default: ({ v }) => v,
          });

          if (isFunction(value) && isPromise(result)) {
            // Special case. if value is a function, and its result is a promise
            result.then((response: any) => {
              // updating the data with whatever the response is
              state(response);
            });
          } else {
            // Update data, causing re-rendering
            state(result);
          }
        }, delay()),
      );
    };

    // The Clear funtion
    const clearFunction = () => {
      // Get the timeout trigger
      const timeoutInstance = timeout();
      // If timeout instance exists then clear the timeout
      if (timeoutInstance) {
        // Clear timeout
        clearTimeout(timeoutInstance);
        // Clear the timeout
        timeout('');
      }
    };

    // Trigger only once
    useEffect(() => {
      // If input is valid
      if (!isUndefined(input)) {
        // Update the Delay data
        delay(waitFor);
        // Set the function
        setFunction(input);
        // Return a clear function (or a clean function)
        return clearFunction;
      }
    }, []);

    // The main accessor function that is being returned
    const accessorFunction = (newInput?: any, newDelay?: number) => {
      // If input is undefined then return the data
      if (isUndefined(newInput)) return state();
      // Clear any stored timeout
      clearFunction();
      // Updating the Delay
      if (!isUndefined(newDelay)) delay(newDelay);
      // Set a new function
      setFunction(newInput);
      // Return the accessor function
      return accessorFunction;
    };

    // Returning the accessor function
    return accessorFunction;
  };
};
