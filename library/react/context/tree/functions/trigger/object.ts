import { instanceCreate, isInvalid, objectHasKey, setConstant } from '@library/presource';

// Allowing Function to be Triggered
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
