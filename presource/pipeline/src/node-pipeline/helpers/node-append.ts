// For appending a new node to the mapping
import { NodePipeline, NodePipelineNode } from '../type';

export function nodePipelineHelperAppend(this: NodePipeline, ...entries: NodePipelineNode[]) {
    // error TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.
    entries.forEach((entry: NodePipelineNode) => {
        this[entry.id] = entry;
    });

    return this;
}
