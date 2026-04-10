import { instanceCreate } from '../instance';
import { setConstant } from './constant';

export const setCreate = (input?: any) => {
    // For Creating a Set
    return instanceCreate(setConstant());
};
