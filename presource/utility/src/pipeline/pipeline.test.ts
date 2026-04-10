import { nodePipeline, nodePipelineEntry } from '@presource/utility';

describe('nodeMapping requirements', () => {
    it('should returns a mapping', () => {
        const node1 = nodePipelineEntry({ id: 1 });
        const node2 = nodePipelineEntry({ id: 2 });
        const node3 = nodePipelineEntry({ id: 3 });
        const node4 = nodePipelineEntry({ id: 4 });
        const mapping = nodePipeline(node1, node2, node3, node4);

        expect(mapping).toStrictEqual({
            1: node1,
            2: node2,
            3: node3,
            4: node4
        });
    });

    it('should able to validate the mapping', () => {
        const mapping = nodePipeline();
        expect(mapping.validate()).toStrictEqual([]);
    });
});
