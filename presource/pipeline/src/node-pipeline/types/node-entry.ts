// This is the entry of the node pipeline
export type NodePipelineEntry = {
    id: number;
    // The type of node this is.
    type: 'script';
    value: null | string;
    props: {};
    flags: {
        [key: string]: boolean;
    };
    // The input of this node.
    inputs: {
        [key: string]: {
            // The value for this key
            value: any;
            // Whether this is a link to another node
            isLink?: boolean;
        };
    };
    // This is an output of a function
    outputs: {
        // The resolved value, stored in memory only?
        [key: string]: any;
    };
};

export type NodePipelineEntrySimple = {
    id?: number;
    script?: (input: { [key: string]: any }) => { [key: string]: any };
    values: {
        [key: string]: any;
    };
};
