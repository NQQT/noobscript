import { ObjectKeys } from './keys';

/** For excluding certain type from an object */
export type ObjectExcludes<Base, Conditions = any> = Omit<Base, ObjectKeys<Base, Conditions>>;
