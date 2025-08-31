import { objectConstant } from './constant';

/** Return the Keys in object as Array[Key] List */
export const objectValues = <T extends {}>(object: T): T[keyof T][] => objectConstant().values(object);
