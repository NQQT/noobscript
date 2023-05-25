import { ObjectKeys } from './keys';

/** For including certain types within an Object */
export type ObjectIncludes<Base, Conditions = any> = Pick<Base, ObjectKeys<Base, Conditions>>;
