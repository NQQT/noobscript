// The mapping configuration
import { objectEach } from '@presource/core';
import { NodePipeline, NodePipelineEntry } from './types';
import {
    nodePipelineHelperAppend,
    nodePipelineHelperCreate,
    nodePipelineHelperResolve,
    nodePipelineHelperValidate
} from './helpers';

export const nodePipeline = (...entries: NodePipelineEntry[]): NodePipeline => {
    const result: any = {};

    // Scanning through and add to node mapping
    entries.forEach((entry: NodePipelineEntry) => {
        result[entry.id] = entry;
    });

    const methods = {
        append: nodePipelineHelperAppend,
        create: nodePipelineHelperCreate,
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
