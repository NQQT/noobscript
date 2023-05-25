import { isInvalid, typeSwitch, isUndefined, objectKeys, objectUpdate } from '@library/presource';
import { triggerListenerFunction } from '../trigger/listener';
import { triggerObserverFunction } from '../trigger/observer';

// This will only access by reference only. There is no reactivity
export const accessorReferenceFunction = (data: { context: any; field?: string }) => {
  // Return the Accessor Function
  return (value?: any) => {
    // Extracting Information
    const { context, field } = data;
    // Extracting Database from Context Structure
    const { database } = context;

    // The Getter Function
    if (isUndefined(value)) return isInvalid(field) ? database : database[field];

    // When field is defined
    if (!isInvalid(field)) {
      // Update the Database with Value
      database[field] = value;

      // Trigger the Listener
      triggerListenerFunction(context, [field]);
      // Trigger the Observer
      triggerObserverFunction(context);
      // Returning whether it is successful or not
      return true;
    }
    // When Field is not Defined. Treated it as advance accessor function
    return typeSwitch(value, {
      // If value is object
      object: () => {
        // Updating the database with new values
        objectUpdate(database, value);
        // Trigger the Listener and Observer
        triggerListenerFunction(context, objectKeys(value));
        triggerObserverFunction(context);
        return true;
      },
      // Returning False
      default: () => false,
    });
  };
};
