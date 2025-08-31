import { instanceCreate } from '../instance/create';
import { setConstant } from './constant';

export const setCreate = (input?: any) => {
  // For Creating a Set
  return instanceCreate(setConstant());
};
