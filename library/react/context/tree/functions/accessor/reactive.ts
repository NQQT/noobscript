import { isEqual, isInvalid, objectStringify } from '@library/presource';
import { triggerObjectFunction } from '../trigger/object';
import { accessorReferenceFunction } from './reference';

export const useAccessorReactiveFunction = (data: { react: any; context: any; field?: string }) => {
  // Exporting information
  const { react, context, field } = data;
  const { database } = context;

  // Get the Observable Value
  const observedValue = objectStringify(isInvalid(field) ? database : database[field]);

  // We are only intersted in set value
  const setValue = react.useState(observedValue)[1];

  react.useEffect(() => {
    // Get the current value based on the string
    const currentValue = objectStringify(isInvalid(field) ? database : database[field]);
    if (!isEqual(currentValue, observedValue)) {
      // Set the value directly
      setValue({});
    } else {
      // Save the trigger function
      const triggerSet = triggerObjectFunction(context, field);
      // Adding to Set list
      triggerSet.add(setValue);

      // Returning the cleanup function
      return () => {
        // Remove the setValue from List
        triggerSet.delete(setValue);
      };
    }
  }, [observedValue]);

  // Return the accessor Function
  return accessorReferenceFunction(data);
};
