import { nodePipeline } from '@presource/pipeline';
import { nodePipelineEntry } from '../entry';

describe('appending into the pipeline', () => {
    it('should able to append through method', () => {
        const mapping = nodePipeline();
        const node1 = nodePipelineEntry({ id: 1 });
        const node2 = nodePipelineEntry({ id: 2 });
        const node3 = nodePipelineEntry({ id: 3 });
        mapping.append(node1, node2, node3);

        expect(mapping).toStrictEqual({
            1: node1,
            2: node2,
            3: node3
        });
    });
});
