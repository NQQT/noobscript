// For appending a new node to the mapping
import { NodePipeline, NodePipelineEntry } from '../types';

export function nodePipelineHelperAppend(this: NodePipeline, ...entries: NodePipelineEntry[]) {
    // error TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.
    entries.forEach((entry: NodePipelineEntry) => {
        this[entry.id] = entry;
    });

    return this;
}
