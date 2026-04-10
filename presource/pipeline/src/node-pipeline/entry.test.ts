import { nodePipelineEntry } from '@presource/pipeline';

describe('how to use node structure', () => {
    it('should generate out a proper node structure', () => {
        const structure = nodePipelineEntry({
            id: 1
        });

        expect(structure).toEqual({
            id: 1,
            type: 'script',
            // Script is for execution
            value: (({ name }: any) => ({ greeting: `hello ${name}` })).toString(),
            attributes: {
                position: { x: 0, y: 0 },
                size: { x: 0, y: 0 }
            },
            flags: {},
            properties: {
                name: {
                    value: 'John',
                    isLink: false
                }
            }
        });
    });
});
