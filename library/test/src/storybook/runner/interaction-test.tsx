import { isFunction, objectEach } from '@presource/core';
import { composeStory } from '@storybook/react';
import { render } from '@testing-library/react';
import React from 'react';

export type InteractionTestRunner = <T extends { [key: string]: any }>(meta: any, input: T) => void;

// For running interaction test within jest environment
export const interactionTestRunner: InteractionTestRunner = (meta, list) => {
    objectEach(list, ({ key, value }) => {
        // Building the component
        const Component = composeStory(value, meta);

        // Setting the story name correctly
        const storyName = key.toString();

        // Describing the interaction test
        describe(storyName, () => {
            // Standard interaction test
            it('should passes interaction test', async () => {
                const { args } = Component;
                // Render the component
                render(<Component {...args} />);

                const playFunction = Component.play;
                if (isFunction(playFunction)) {
                    await playFunction({ canvasElement: document, args });
                }
            });
        });
    });
};
