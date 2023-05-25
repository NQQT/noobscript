import { configureAge } from './configure/age';
import { configureFirstname } from './configure/firstname';
import { configureLastname } from './configure/lastname';

/**
 * For inserting into biopedia. This will keep records for all possible characters for usage.
 */

export const database = (id: string) => {
  return {
    age: configureAge(id),
    firstname: configureFirstname(id),
    lastname: configureLastname(id),
  };
};
