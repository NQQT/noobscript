import { functionOptions } from '@presource/core';
import { $screen, $user } from '../../constant';
import { expect } from 'storybook/test';

export const documentButton = (label: string) => {
    return functionOptions({
        // For selecting the button element
        async element() {
            // return the button element
            return await $screen.findByRole('button', { name: label }, { timeout: 2000 });
        },
        // For clicking on the button
        async click() {
            const element = await this.element();
            await $user.click(element);
        },
        async isValid() {
            const element = await this.element();
            await expect(element).toBeValid();
        }
    });
};
