import { useState } from 'react';
import { objectObserve } from '@library/presource/js/object/observe';
import { isEqual } from '@library/presource/js/is/equal';

/**
 * Use Memory allow creation of a live object. Modifying anything within will reflect the object.
 * Use memory should be used within a component only.
 */
export const useMemory = <T>(initialState: T): T => {
  // Binding a hook with useState. Getting the state and the setState.
  const [state, setState] = useState(initialState);
  // Return the state for consumption
  return objectObserve(state, ({ method, value }) => {
    if (isEqual(method, 'set')) {
      // Forcing a refresh of the component
      setState({ ...state });
    }
  }) as any;
};
