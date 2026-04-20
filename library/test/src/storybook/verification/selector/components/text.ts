import { functionOptions, typeSwitch } from '@presource/core';
import { $screen } from '../../constant';
import { expect } from 'storybook/test';

export const documentText = (fragment: string | RegExp) => {
    return functionOptions({
        // For selecting an element that contains this particular text
        element: async () => {
            // Getting the expression
            const expression = typeSwitch(fragment, {
                string: ({ value }) => {
                    return new RegExp(value);
                },
                default: ({ value }) => value
            });

            const list = await $screen.findAllByText(expression);

            // Return the first element found
            return list[0];
        },
        async isValid() {
            const element = await this.element();
            await expect(element).toBeValid();
        }
    });
};
