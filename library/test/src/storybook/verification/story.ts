import { StoryObj } from '@storybook/react';
import { $memory } from './constant';
import { typeSwitch } from '@presource/core';

export type AsStory = {
    (): StoryObj<any>;
    // tslint:disable-next-line:unified-signatures
    (update?: StoryObj<any>): StoryObj<any>;
    // tslint:disable-next-line:unified-signatures
    (callback?: () => void): StoryObj<any>;
};

export const asStory: AsStory = ((input: any) => {
    // Create a base current story for modification
    $memory().currentStory ||= {};
    // Clear out the play function
    $memory().playFunction = null;

    typeSwitch(input, {
        object: ({ value }) => {
            $memory().currentStory = {
                ...value,
                play: async (context) => {
                    $memory().playContext = context;
                    await value.play?.(context);
                }
            };
        },
        function: ({ value, object }) => {
            // @ts-ignore
            object(value() || $memory().currentStory);
        }
    });

    return $memory().currentStory;
}) as any;
