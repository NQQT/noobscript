// This is the entry of the node pipeline
export type NodePipelineEntry = {
    // The nodeId
    id: number;
    // The name of the node (for identification)
    name: string;
    // The type of node that this is
    type: 'script';
    // Flag configuration
    flags: {
        [key: string]: boolean;
    };
    // Attributes that determines the node entry
    attributes: {
        // Data can stored into attributes
        [key: string]: any;
    };
    properties: {
        // Name of the property
        [key: string]: {
            // The value of the property
            value: any;
            // Property type. Can be string, number. Default will auto resolve
            // There are many more type than just "string", "number", "boolean"
            // These are determined by the node controls
            type?: string;
            linkedNode?: {
                // The linked node id
                id: number;
                // If the name differ from the properties name
                name?: string;
            };
        };
    };
};

export type NodePipelineEntrySimple = {
    id?: number;
    script?: (input: { [key: string]: any }) => { [key: string]: any };
    values: {
        [key: string]: any;
    };
};
