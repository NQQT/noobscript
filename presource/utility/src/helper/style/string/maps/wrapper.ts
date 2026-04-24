import { MapperCallback } from '../assets/interface';

export const stringMapWrapper = (name: string): MapperCallback => {
    return () => {
        // Return Empty Object for Wrapping
        return { [name]: null };
    };
};
