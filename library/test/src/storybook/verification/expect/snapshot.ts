import { arrayEachAsync, arrayEnsures, stringSwitchAsync } from '@presource/core';
import { expectText } from './components';

export const expectSnapshot = async (options: SnapshotOptions) => {
    // Getting the necessary keys
    const keys: (keyof typeof options)[] = Object.keys(options) as any;
    // Scanning through each item
    await arrayEachAsync(keys, async ({ value: key }) => {
        // Verifying the String Switch
        await stringSwitchAsync(key, {
            text: async () => await expectText(...arrayEnsures(options[key]))
        });
    });
};

type SnapshotInput = string | RegExp;
type SnapshotOptionInput = SnapshotInput | SnapshotInput[];

export type SnapshotOptions = Partial<{
    text: SnapshotOptionInput;
}>;
