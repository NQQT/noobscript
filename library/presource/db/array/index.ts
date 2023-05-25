import { ArrayDatabase } from './class';
// The Database Memory Listing
type List = { [key: string]: any }[];

// Constructing Array Database
export const arrayDatabase = (data: List = []) => {
  // Return a New Class
  return new ArrayDatabase(...data);
};
