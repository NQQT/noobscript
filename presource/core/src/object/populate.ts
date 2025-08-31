import { objectEach } from './each';

type ObjectPopulate = <T, P>(referencedObject: T, populationData: P) => any;

/** To Populate an Object with secondary parameters
 *
 * Note that reference is kept
 */
export const objectPopulate: ObjectPopulate = (referencedObject, populationData) => {
  objectEach;
};
