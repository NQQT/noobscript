import { isUndefined } from '@library/presource';

/** Replacement for native useState of React */
export const createReactStateHook = (react: any) => {
  // Basic use data function
  return (initialValue?: any) => {
    // Use native react to get the "get" and "set"
    const [stateValue, setState] = react.useState(initialValue);

    // Return the Accessor Function
    return (value?: any) => {
      // Return the value
      if (isUndefined(value)) return stateValue;
      // If set. Trigger Setter Function
      setState(value);
    };
  };
};
