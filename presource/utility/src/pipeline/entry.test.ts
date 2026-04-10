import { nodePipelineEntry } from '@presource/utility';

describe('how to use node structure', () => {
    it('should generate out a proper node structure', () => {
        const structure = nodePipelineEntry({
            id: 1
        });

        expect(structure).toEqual({
            id: 1,
            name: 'node',
            type: 'script',
            attributes: {
                position: { x: 0, y: 0 },
                size: { x: 0, y: 0 },
                script: (({ name }: any) => ({ greeting: `hello ${name}` })).toString()
            },
            flags: {},
            properties: {
                name: {
                    value: 'John'
                }
            }
        });
    });
});
