// Allowing Function to be Triggered
import { isInvalid } from '@library/presource/js/is/invalid';
import { objectHasKey } from '@library/presource/js/object/has';
import { instanceCreate } from '@library/presource/js/instance/create';
import { setConstant } from '@library/presource/js/set/constant';

export const triggerObjectFunction = (context: any, field?: string) => {
  // If field Id is invalid, then return the observer trigger
  if (isInvalid(field)) return context.observer;
  // If Field is Valid then get the specific Listener instead
  const { listener } = context;
  // Make sure that listener has the field
  if (!objectHasKey(listener, field)) {
    // Creating a new Set
    listener[field] = instanceCreate(setConstant());
  }
  // Return the Set
  return listener[field];
};
