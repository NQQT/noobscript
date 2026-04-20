import { arrayEachAsync } from '@presource/core';
import { expect } from 'storybook/test';
import { $dom } from '../../selector';

export const expectText = async (...fragments: any[]) => {
    await arrayEachAsync(fragments, async ({ value }) => {
        await expect(`expecting ${value.valueOf()} to be visible on the screen`).toBeTruthy();
        await $dom.text(value).isValid();
    });
};
