// This to decode the node definitinos
import { NodePipeline } from '@presource/pipeline';
import { objectEach } from '@presource/core';

export const nodeDefinitions = (pipeline: NodePipeline) => {
    //  The definition to be returened
    const definitions = [];
    objectEach(pipeline, ({ value: entry }) => {
        const { id, props } = entry;

        const pos = props.pos || [0, 0];

        // Setting the definitions
        definitions.push({
            // id must be a string
            id: id.toString(),
            // Defining the position
            position: { x: pos[0], y: pos[1] },
            type: 'pipelineNode',
            data: {
                //  Just pass the entire entry in, really
                node: entry
            }
        });
    });

    // Returning the definitions
    return definitions;
};
