import { nodeStructure } from './structure';

describe('how to use node structure', () => {
    it('should generate out a proper node structure', () => {
        const structure = nodeStructure({
            id: 1
        });

        expect(structure).toEqual({
            id: 1,
            type: 'script',
            // Script is for execution
            value: (({ name }: any) => `hello ${name}`).toString(),
            pos: [0, 0],
            size: [0, 0],
            inputs: {
                name: {
                    value: ''
                }
            },
            outputs: {
                greeting: {}
            }
        });
    });
});
