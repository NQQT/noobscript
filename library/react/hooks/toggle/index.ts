import { isUndefined, isBoolean, isEqual } from '@library/presource';
import { createReactStateHook } from '../state';

// For Creating all Toggle Hooks
export const createReactToggleHook = (react: any) => {
  // Construct a use state to use
  const useState = createReactStateHook(react);

  // The Basic Use Toggle Function
  return (initialValue?: any) => {
    // Get the Toggle Function
    const toggle = useState(!!initialValue);

    // Return the Accessor Function
    return (updatedValue?: boolean) => {
      // Getting the Toggle Value
      const currentValue = toggle();
      if (isUndefined(updatedValue)) return currentValue;
      // Can Only Accept Boolean Value
      if (isBoolean(updatedValue) && !isEqual(currentValue, updatedValue)) {
        // Update Toggle with new Value
        toggle(!currentValue);
      }
    };
  };
};
