import { objectConstant } from './constant';

/** Return the Keys in object as Array[Key] List */
export const objectKeys = <T extends {}, K extends keyof T>(object: T) => objectConstant().keys(object) as K[];
