export type NodeStructure = {
    id: number;
    // The type of node this is.
    type: 'script';
    value: string;
    pos: number[];
    size: number[];
    flags: {
        [key: string]: boolean;
    };
    // The input of this node.
    inputs: {
        [key: string]: {
            value: string;
            // Where does it come from
            links?: number;
        };
    };
    // This is an output of a function
    outputs: {
        [key: string]: {
            links: number[];
        };
    };
};

//  For designing a node structure
export const nodeStructure = (inputStructure?: Partial<NodeStructure>) => {
    const defaultStructure: NodeStructure = {
        id: 0,
        type: 'script',
        // Script is for execution
        value: (({ name }: any) => `hello ${name}`).toString(),
        pos: [0, 0],
        size: [0, 0],
        flags: {},
        inputs: {
            name: {
                value: ''
            }
        },
        outputs: {
            greeting: {
                links: []
            }
        }
    };

    return {
        ...defaultStructure,
        ...inputStructure
    };
};
