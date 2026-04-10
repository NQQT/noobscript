import { NodePipeline, NodePipelineEntrySimple } from '../types';
import { isInvalid, isNumber, objectMap } from '@presource/core';

// This is a faster way to create a node, using preset
export function nodePipelineHelperCreate(this: NodePipeline, nodeInput: NodePipelineEntrySimple) {
    // Accessing the pipeline
    const pipeline = this;

    if (isInvalid(nodeInput.id)) {
        nodeInput.id = Object.keys(pipeline).length;
    }

    // Configuring Attributes
    const attributes: any = {};
    if (nodeInput.script) {
        attributes.script = nodeInput.script.toString();
    }

    return {
        id: nodeInput.id,
        type: 'script',
        name: 'simple node',
        // Script must be decoded
        flags: {},
        attributes,
        // Updating inputs
        properties: objectMap(nodeInput.values, ({ value }) => {
            if (isNumber(value)) {
                return {
                    linkedNode: {
                        id: value
                    }
                };
            }
            return { value };
        })
    };
}
