import { nodePipeline } from '@library/pipeline';
import { nodePipelineNode } from './structure';

describe('nodeMapping requirements', () => {
    it('should returns a mapping', () => {
        const node1 = nodePipelineNode({ id: 1 });
        const node2 = nodePipelineNode({ id: 2 });
        const node3 = nodePipelineNode({ id: 3 });
        const node4 = nodePipelineNode({ id: 4 });
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
