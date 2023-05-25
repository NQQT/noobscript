import { isUndefined } from '@library/presource';

/** Extended Replacement for useRef via React. */
export const createReactReferenceHook = (react: any) => {
  // Basic use Reference hook
  return (initialValue?: any) => {
    // Use the Reference
    const valueReference = react.useRef(initialValue);

    return (value?: any) => {
      if (isUndefined(value)) return valueReference.current;
      valueReference.current = value;
    };
  };
};
