import { nodePipeline } from '@presource/utility';
import { nodePipelineEntry } from '../entry';

describe('resolving nodes all within nodePipeline', () => {
    it('should resolve with basic node', () => {
        const mapping = nodePipeline(
            nodePipelineEntry({
                id: 1,
                properties: {
                    name: {
                        value: 'John'
                    }
                },
                attributes: {
                    script: (({ name }: any) => {
                        return {
                            greeting: `Hello ${name}!`
                        };
                    }).toString()
                }
            })
        );

        // Resolve the mapping
        mapping.resolve();

        // Expecting the outputs
        expect(mapping[1].properties['greeting'].value).toBe('Hello John!');
    });

    it('should resolve with chained node', () => {
        // Building the first node
        const node0 = nodePipelineEntry({
            id: 0,
            // Inputs is output. It simply passes through
            properties: {
                name: {
                    value: 'Jane'
                }
            }
        });
        // Building second node
        const node1 = nodePipelineEntry({
            id: 1,
            properties: {
                name: {
                    value: null,
                    linkedNode: {
                        id: 0
                    }
                }
            },
            attributes: {
                script: (({ name }: any) => {
                    return {
                        greeting: `Hello ${name}!`
                    };
                }).toString()
            }
        });

        const pipeline = nodePipeline(node0, node1);
        // Resolve the mapping
        pipeline.resolve();
        // Expecting the outputs
        expect(pipeline[1].properties.greeting.value).toBe('Hello Jane!');
    });

    it('should resolves with complex layout', async () => {
        const pipeline = nodePipeline();
        const node0 = pipeline.create({
            values: {
                name: 'John'
            }
        });

        pipeline.append(node0);

        const node1 = pipeline.create({
            values: {
                age: '39'
            }
        });

        pipeline.append(node1);

        const node2 = pipeline.create({
            values: {
                name: node0.id,
                age: node1.id
            },
            script: ({ name, age }) => ({
                bio: `${name} is ${age} year old`
            })
        });

        pipeline.append(node2);

        const resolved = await pipeline.resolve();
        expect(resolved).toStrictEqual(true);

        expect(node2.properties.bio.value).toBe('John is 39 year old');
    });
});
