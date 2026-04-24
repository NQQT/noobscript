import { MapperCallback } from '../assets/interface';

type Callback = (...args: string[]) => void | { [key: string]: any };
/** Design for mapping values only */
export const stringMapValue = (callback: Callback): MapperCallback => {
  // Creating a Simple Map Value
  return (data) => callback(...data.v);
};
