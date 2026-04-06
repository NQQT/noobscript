// Validate the node
import { NodePipeline } from '../types';
import { objectEach } from '@presource/core';

export function nodePipelineHelperValidate(this: NodePipeline) {
    const mapping = this;
    const errors: string[] = [];
    objectEach(mapping, ({ value: entry }) => {
        const { inputs } = entry;

        // Verifying the inputs are connected correctly
        objectEach(inputs, ({ value: { value, isLink } }) => {
            if (isLink) {
                // Cannot find the node that is connected to this output
                if (!mapping[value]) {
                    errors.push(`node ${value} is missing`);
                }
            }
        });
    });

    // Return the list of errors
    return errors;
}
