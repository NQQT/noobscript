import { NodePipeline, NodePipelineEntry, NodePipelineEntrySimple } from '../types';
import { isInvalid, isNumber, objectMap } from '@presource/core';

// This is a faster way to create a node, using preset
export function nodePipelineHelperCreate(this: NodePipeline, nodeInput: NodePipelineEntrySimple) {
    // Accessing the pipeline
    const pipeline = this;

    if (isInvalid(nodeInput.id)) {
        nodeInput.id = Object.keys(pipeline).length;
    }

    const node: NodePipelineEntry = {
        id: nodeInput.id,
        type: 'script',
        // Script must be decoded
        value: nodeInput.script ? nodeInput.script.toString() : null,
        props: {},
        flags: {},
        // Updating inputs
        inputs: objectMap(nodeInput.values, ({ value }) => {
            return {
                value,
                isLink: isNumber(value)
            };
        }),
        outputs: {}
    };

    // Appending the node
    pipeline.append(node);

    // Return the nodeId
    return node;
}
