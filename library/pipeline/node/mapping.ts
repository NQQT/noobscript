import { NodeStructure } from './structure';
import { objectEach } from '@presource/core';

// The mapping configuration
export type NodeMapping = {
    [key: string]: NodeStructure;
} & {
    append: (entry: NodeStructure) => void;
};

export const nodeMapping = (...entries: NodeStructure[]): NodeMapping => {
    const result: any = {};

    // Scanning through and add to node mapping
    entries.forEach((entry: NodeStructure) => {
        result[entry.id] = entry;
    });

    const methods = {
        append: nodeMappingAppend
    };

    objectEach(methods, ({ key, value }) => {
        Object.defineProperty(result, key, {
            value,
            enumerable: false,
            writable: false,
            configurable: true
        });
    });

    return result;
};

function nodeMappingAppend(this: NodeMapping, entry: NodeStructure) {
    // error TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.
    this[entry.id] = entry;
}
