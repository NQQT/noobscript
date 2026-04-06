import { NodePipelineEntry, NodePipelineEntrySimple } from './node-entry';

export type NodePipeline = {
    [key: string]: NodePipelineEntry;
} & {
    append: (...entries: NodePipelineEntry[]) => NodePipeline;
    create: (input: NodePipelineEntrySimple) => NodePipelineEntry;
    resolve: () => NodePipeline;
    validate: () => string[];
};
