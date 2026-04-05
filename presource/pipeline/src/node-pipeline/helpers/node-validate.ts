// Validate the node
import { NodePipeline } from '../type';
import { objectEach } from '@presource/core';

export function nodePipelineHelperValidate(this: NodePipeline) {
    const mapping = this;
    const errors: string[] = [];
    objectEach(mapping, ({ value: entry }) => {
        const { inputs, outputs } = entry;

        // Verifying the inputs are connected correctly
        objectEach(inputs, ({ value: { link } }) => {
            if (link) {
                // Cannot find the node that is connected to this output
                if (!mapping[link]) {
                    errors.push(`node ${link} is missing`);
                }
            }
        });

        objectEach(outputs, ({ value: { links } }) => {
            links.forEach((link) => {
                // Cannot find the node that connected to this output
                if (!mapping[link]) {
                    errors.push(`node ${link} is missing`);
                }
            });
        });
    });

    // Return the list of errors
    return errors;
}
