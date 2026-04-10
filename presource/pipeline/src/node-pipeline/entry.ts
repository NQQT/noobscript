//  For designing a node structure

import { NodePipelineEntry } from './types';

export const nodePipelineEntry = (inputStructure?: Partial<NodePipelineEntry>) => {
    const defaultStructure: NodePipelineEntry = {
        id: 0,
        name: 'node',
        type: 'script',
        // Script is for execution
        // Properties of the nodes
        attributes: {
            // Position of the node on the screen
            position: { x: 0, y: 0 },
            // The size of the node on the screen
            size: { x: 0, y: 0 },
            script: (({ name }: any) => ({ greeting: `hello ${name}` })).toString()
        },
        // Flags are slightly different, as it only accepts booleans
        flags: {},
        properties: {
            name: {
                value: 'John'
            }
        }
    };

    return {
        ...defaultStructure,
        ...inputStructure
    };
};
