import { nodePipeline } from '@presource/pipeline';
import { nodePipelineNode } from '../structure';

describe('resolving nodes all within nodePipeline', () => {
    it('should resolve with basic node', () => {
        const mapping = nodePipeline(
            nodePipelineNode({
                id: 1,
                inputs: {
                    name: {
                        value: 'John'
                    }
                },
                value: (({ name }: any) => {
                    return {
                        greeting: `Hello ${name}!`
                    };
                }).toString()
            })
        );

        const item = mapping.resolve()[1];
        expect(mapping.resolve()[1].name);

        expect(mapping.resolve()[1]);

        console.log(JSON.stringify(mapping.resolve()));
    });
});
