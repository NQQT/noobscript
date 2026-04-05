// For Resolve Node within the pipeline
import { objectEach, objectMap } from '@presource/core';
import { NodePipeline } from '../type';

export function nodePipelineHelperResolve(this: NodePipeline) {
    const mapping = this;
    const completed = objectMap(mapping, () => false);
    const status = {};

    // For resolving
    const resolve = (nodeId: number | string) => {
        const node = mapping[nodeId];

        const params: any = {};
        for (const key of Object.keys(node.inputs)) {
            const inputData = node.inputs[key];
            const { link } = inputData;
            let value = inputData.value;
            if (link) {
                const linkedNode = mapping[link];
                value = linkedNode.outputs[key].value;
            }

            // Return invalid resolve
            if (value === null) {
                return false;
            }
            params[key] = value;
        }

        // tslint:disable-next-line:no-eval
        const func = eval(`(${node.value})`);

        const result = func(params);

        // Updating the outputs configuration
        objectEach(node.outputs, ({ key, value: data }) => {
            data.value = result[key];
        });
    };

    // Scanning completed
    objectEach(completed, ({ key, value: done }) => {
        if (!done) {
            resolve(key);
        }
    });

    return this;
}
