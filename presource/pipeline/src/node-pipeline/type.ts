export type NodePipeline = {
    [key: string]: NodePipelineNode;
} & {
    append: (...entries: NodePipelineNode[]) => NodePipeline;
    validate: () => string[];
    resolve: () => NodePipeline;
};

export type NodePipelineNode = {
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
            // The value that taken
            // If null, it should obtain from the link
            value: any;
            // Where does it come from
            link?: number;
        };
    };
    // This is an output of a function
    outputs: {
        [key: string]: {
            // The resolved value, stored in memory only?
            value: any;
            links: number[];
        };
    };
};
