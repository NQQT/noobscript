import { ReactRenderer } from '@storybook/react';
import { PlayFunction } from 'storybook/internal/types';
import { asStory } from '../story';

type ConfigureStorybookPlay<Args = {}> = {
    (): PlayFunction<ReactRenderer, Args>;
    // tslint:disable-next-line:unified-signatures
    (playFunction: PlayFunction<ReactRenderer, Args>): PlayFunction<ReactRenderer, Args>;
};

export const $play = ((playFunction: any) => {
    // Getting the context
    const context = asStory();

    if (playFunction) {
        context.play = playFunction;
    }

    // Return original play function
    return context.play;
}) as any;
