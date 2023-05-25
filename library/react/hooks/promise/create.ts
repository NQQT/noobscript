import { isFunction, isInvalid, isPromise, isUndefined, functionDelay } from '@library/presource';
import { createReactStateHook } from '../state';

// Design to create a promise hook
export const createReactPromiseHook = (react: any) => {
  // Create a useState hook
  const useState = createReactStateHook(react);
  const { useMemo } = react;

  // The usePromise hook
  return (initialValue?: any) => {
    // The initial returned result
    let initialResult: any;
    // Checking for the initial value
    if (!isInvalid(initialValue) && !isFunction(initialValue)) {
      // Set the Initial Result
      initialResult = initialValue;
    }

    // Get the useState
    const state = useState(initialResult);

    // Executing a promise
    const executePromise = (promiseFunction: (value: any) => any) => {
      // Get the result from the promise funtion
      const result = promiseFunction(state());

      // Checking the result and check whether it is a promise
      if (result && isPromise(result)) {
        // If it is a promise, treat it like one.
        result.then((value) => state(value));
      } else {
        // Store the result into variable
        state(result);
      }
    };

    // The primary accessor function
    const accessorFunction = (executeFunction?: (value: any) => any) => {
      // If exefucntion is invalid
      if (isUndefined(executeFunction)) return state();
      // If new funtion is added. Execute as required
      executePromise(executeFunction);
      // Returning the accessor function
      return accessorFunction;
    };

    // Triggering the useMemo function
    useMemo(() => {
      if (initialValue && isFunction(initialValue)) {
        // Executing the promise
        functionDelay(() => executePromise(initialValue));
      }
    }, []);

    // Retruning the accessor function to be consumed
    return accessorFunction;
  };
};
