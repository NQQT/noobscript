import { instanceCreate } from '../instance/create';
import { mapConstant } from './constant';

/** For Creating a New Map Instance */
export const mapCreate = (input?: any) => {
  // For Creating a Set
  return instanceCreate(mapConstant());
};
