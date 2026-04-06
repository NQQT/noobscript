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
            props: {
                pos: [0, 0],
                size: [0, 0]
            },
            flags: {},
            inputs: {
                name: {
                    value: 'John',
                    isLink: false
                }
            },
            outputs: {}
        });
    });
});
