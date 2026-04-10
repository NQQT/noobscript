// For Resolve Node within the pipeline
import { isObject, isUndefined, objectEach, objectMap } from '@presource/core';
import { NodePipeline } from '../types';

type Callbacks = {
    // Continue processing or not
    continue: () => boolean;
    onError: () => boolean;
    onSuccess: () => boolean;
};

// This is to resolve the pipeline
export async function nodePipelineHelperResolve(this: NodePipeline, callbacks: Callbacks) {
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

        for (const key of Object.keys(node.properties)) {
            const inputData = node.properties[key];
            const { linkedNode } = inputData;
            let value = inputData.value;
            if (!isUndefined(linkedNode)) {
                const linkedNodeEntry = pipeline[linkedNode.id];
                value = linkedNodeEntry.properties[key].value;
            }

            // Return invalid resolve
            if (value === null) {
                return false;
            }

            // Storing the value into node
            node.properties[key] = {
                value
            };
        }

        // Resolve the value
        if (node.type === 'script') {
            const { script } = node.attributes;
            if (script) {
                // tslint:disable-next-line:no-eval
                const func = eval(`(${script})`);
                const params = objectMap(node.properties, ({ value: { value } }) => {
                    return value;
                });
                const result = func(params);

                // Result is invalid. It should be an object return
                if (!isObject(result)) {
                    return false;
                }

                // Updating the outputs
                objectEach(result, ({ key, value }) => {
                    // Updating the properties
                    node.properties[key] = {
                        value
                    };
                });
            }
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
    return true;
}
