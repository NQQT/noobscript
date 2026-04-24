import { loopFor } from '@presource/core';
import { ArrayDatabase } from '../class';

export const eachFunction = ($self: ArrayDatabase, callback: (args: { value: any; index: number }) => any) => {
    // Scanning Through the Loop Function
    loopFor($self.length, ({ index }) =>
        // Scanning Through Each Function
        callback({
            value: $self[index],
            index
        })
    );
};
