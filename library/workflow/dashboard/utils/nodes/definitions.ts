// This to decode the node definitinos
import { NodePipeline } from '@presource/utility';
import { objectEach } from '@presource/core';
import { Node } from 'reactflow';

export const nodeDefinitions = (pipeline: NodePipeline) => {
    //  The definition to be returened
    const definitions: Node[] = [];

    // Scannign through the pipeline and generate out the necessary node
    objectEach(pipeline, ({ value: entry }) => {
        const { id, attributes, properties } = entry;

        const position = attributes.pos || { x: 0, y: 0 };

        // Setting the definitions
        definitions.push({
            // id must be a string
            id: id.toString(),
            // Defining the position
            position,
            // TODO Depending on the property defined, the node type is defined here
            type: 'autoNode',
            data: {
                //  Just pass the entire entry in, really
                node: entry
            }
        });
    });

    // Returning the definitions
    return definitions;
};
