// Validate the node
import { NodePipeline } from '../types';
import { isUndefined, objectEach } from '@presource/core';

export function nodePipelineHelperValidate(this: NodePipeline) {
    const mapping = this;
    const errors: string[] = [];
    objectEach(mapping, ({ value: entry }) => {
        const { properties } = entry;

        // Verifying the inputs are connected correctly
        objectEach(properties, ({ value: { linkedNode } }) => {
            if (!isUndefined(linkedNode)) {
                const { id } = linkedNode;
                // Cannot find the node that is connected to this output
                if (!mapping[id]) {
                    errors.push(`linking node ${id} is missing`);
                }
            }
        });
    });

    // Return the list of errors
    return errors;
}
