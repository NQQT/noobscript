import { asStory } from './story';
import { PlayFunction } from 'storybook/internal/types';

export const asTestStory = (playFunction: PlayFunction<any, any>) => {
    return asStory({
        play: playFunction
    });
};
