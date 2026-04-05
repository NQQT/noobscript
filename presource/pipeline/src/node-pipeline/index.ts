// The mapping configuration
import { objectEach } from '@presource/core';
import { NodePipeline, NodePipelineNode } from './type';
import { nodePipelineHelperAppend, nodePipelineHelperResolve, nodePipelineHelperValidate } from './helpers';

export const nodePipeline = (...entries: NodePipelineNode[]): NodePipeline => {
    const result: any = {};

    // Scanning through and add to node mapping
    entries.forEach((entry: NodePipelineNode) => {
        result[entry.id] = entry;
    });

    const methods = {
        append: nodePipelineHelperAppend,
        validate: nodePipelineHelperValidate,
        resolve: nodePipelineHelperResolve
    };

    objectEach(methods, ({ key, value }) => {
        Object.defineProperty(result, key, {
            value,
            enumerable: false,
            writable: false,
            configurable: true
        });
    });

    return result;
};
