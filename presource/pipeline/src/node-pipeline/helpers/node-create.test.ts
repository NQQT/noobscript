import { nodePipeline } from '@presource/pipeline';

describe('how to use node create', () => {
    it('should able to create a new node in the pipeline', () => {
        // Building the pipeline
        const pipeline = nodePipeline();

        const node = pipeline.create({
            values: {
                name: 'Jack'
            }
        });

        // Must append the node
        pipeline.append(node);

        expect(pipeline).toStrictEqual({
            0: {
                id: 0,
                name: 'simple node',
                flags: {},
                type: 'script',
                attributes: {},
                properties: {
                    name: {
                        value: 'Jack'
                    }
                }
            }
        });
    });

    it('should create lots of new node in the pipeline', () => {
        const pipeline = nodePipeline();
        const node0 = pipeline.create({
            values: {
                name: 'Jack'
            }
        });
        const node1 = pipeline.create({
            values: {
                name: 'John'
            }
        });

        // Appending the node
        pipeline.append(node0, node1);

        expect(pipeline).toStrictEqual({
            0: node0,
            1: node1
        });
    });
});
