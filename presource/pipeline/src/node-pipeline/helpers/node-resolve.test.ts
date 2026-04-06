import { nodePipeline } from '@presource/pipeline';
import { nodePipelineEntry } from '../entry';

describe('resolving nodes all within nodePipeline', () => {
    it('should resolve with basic node', () => {
        const mapping = nodePipeline(
            nodePipelineEntry({
                id: 1,
                inputs: {
                    name: {
                        value: 'John',
                        isLink: false
                    }
                },
                value: (({ name }: any) => {
                    return {
                        greeting: `Hello ${name}!`
                    };
                }).toString()
            })
        );

        // Resolve the mapping
        mapping.resolve();

        // Expecting the outputs
        expect(mapping[1].outputs['greeting']).toBe('Hello John!');
    });

    it('should resolve with chained node', () => {
        // Building the first node
        const node0 = nodePipelineEntry({
            id: 0,
            //  When value is null
            value: null,
            // Inputs is output. It simply passes through
            inputs: {
                name: {
                    value: 'Jane'
                }
            }
        });
        // Building second node
        const node1 = nodePipelineEntry({
            id: 1,
            inputs: {
                name: {
                    value: 0,
                    isLink: true
                }
            },
            value: (({ name }: any) => {
                return {
                    greeting: `Hello ${name}!`
                };
            }).toString()
        });

        const pipeline = nodePipeline(node0, node1);
        // Resolve the mapping
        pipeline.resolve();
        // Expecting the outputs
        expect(pipeline[1].outputs['greeting']).toBe('Hello Jane!');
    });

    it('should resolves with complex layout', () => {
        const pipeline = nodePipeline();
        const node0 = pipeline.create({
            values: {
                name: 'John'
            }
        });

        const node1 = pipeline.create({
            values: {
                age: '39'
            }
        });

        const node2 = pipeline.create({
            values: {
                name: node0.id,
                age: node1.id
            },
            script: ({ name, age }) => ({
                bio: `${name} is ${age} year old`
            })
        });

        pipeline.resolve();
        expect(node2.outputs.bio).toBe('John is 39 year old');
    });
});
