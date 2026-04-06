//  For designing a node structure

import { NodePipelineEntry } from './types';

export const nodePipelineEntry = (inputStructure?: Partial<NodePipelineEntry>) => {
    const defaultStructure: NodePipelineEntry = {
        id: 0,
        type: 'script',
        // Script is for execution
        value: (({ name }: any) => ({ greeting: `hello ${name}` })).toString(),
        // Properties of the nodes
        props: {
            // Position of the node on the screen
            pos: [0, 0],
            // The size of the node on the screen
            size: [0, 0]
        },
        // Flags are slightly different, as it only accepts booleans
        flags: {},
        inputs: {
            name: {
                value: 'John',
                isLink: false
            }
        },
        outputs: {
            // Any output
        }
    };

    return {
        ...defaultStructure,
        ...inputStructure
    };
};
