import { MapperCallback } from '../assets/interface';
import { NULL } from '../../../js/constants/primitive';

export const stringMapWrapper = (name: string): MapperCallback => {
  return () => {
    // Return Empty Object for Wrapping
    return { [name]: NULL };
  };
};
