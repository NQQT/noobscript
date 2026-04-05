//  For designing a node structure
import { NodePipelineNode } from './type';

export const nodePipelineNode = (inputStructure?: Partial<NodePipelineNode>) => {
    const defaultStructure: NodePipelineNode = {
        id: 0,
        type: 'script',
        // Script is for execution
        value: (({ name }: any) => `hello ${name}`).toString(),
        pos: [0, 0],
        size: [0, 0],
        flags: {},
        inputs: {
            name: {
                value: null
            }
        },
        outputs: {
            greeting: {
                value: null,
                links: []
            }
        }
    };

    return {
        ...defaultStructure,
        ...inputStructure
    };
};
