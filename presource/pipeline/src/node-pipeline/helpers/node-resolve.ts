// For Resolve Node within the pipeline
import { isObject, objectEach, objectMap } from '@presource/core';
import { NodePipeline } from '../types';

export function nodePipelineHelperResolve(this: NodePipeline) {
    const pipeline = this;
    const completed = objectMap(pipeline, () => false);
    const status = {
        // Count
        count: Object.keys(pipeline).length,
        completed: 0
    };

    // For resolving
    const resolve = (nodeId: number | string) => {
        const node = pipeline[nodeId];

        const params: any = {};
        for (const key of Object.keys(node.inputs)) {
            const inputData = node.inputs[key];
            const { isLink } = inputData;
            let value = inputData.value;
            if (isLink) {
                const linkedNode = pipeline[value];
                value = linkedNode.outputs[key];
            }

            // Return invalid resolve
            if (value === null) {
                return false;
            }
            params[key] = value;
        }

        // Updating the outputs with the params
        node.outputs = { ...params };

        // Resolve the value
        if (node.type === 'script' && node.value) {
            // tslint:disable-next-line:no-eval
            const func = eval(`(${node.value})`);
            const result = func(params);

            // Result is invalid. It should be an object return
            if (!isObject(result)) {
                return false;
            }

            // Updating the outputs
            objectEach(result, ({ key, value }) => {
                node.outputs[key] = value;
            });
        }

        // Configured that this is completed
        completed[nodeId] = true;
        // Increased complete count
        status.completed++;
    };

    let completedSofar = -1;

    // Infinite loop to resolve all nodes
    while (1) {
        // If nothing changes then break
        if (completedSofar === status.completed) {
            break;
        }
        // Scanning completed
        objectEach(completed, ({ key, value: done }) => {
            // Attemping to resolve
            if (!done) resolve(key);
        });
        // Updating the completed
        completedSofar = status.completed;
    }

    // Return self
    return this;
}
