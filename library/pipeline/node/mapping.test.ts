import { nodeMapping } from './mapping';
import { nodeStructure } from './structure';

describe('nodeMapping requirements', () => {
    it('should returns a mapping', () => {
        const node1 = nodeStructure({ id: 1 });
        const node2 = nodeStructure({ id: 2 });
        const node3 = nodeStructure({ id: 3 });
        const node4 = nodeStructure({ id: 4 });
        const mapping = nodeMapping(node1, node2, node3, node4);

        expect(mapping).toStrictEqual({
            1: node1,
            2: node2,
            3: node3,
            4: node4
        });

        const node5 = nodeStructure({ id: 5 });
        mapping.append(node5);

        expect(mapping).toStrictEqual({
            1: node1,
            2: node2,
            3: node3,
            4: node4,
            5: node5
        });
    });
});
