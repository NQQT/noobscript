import type { Meta, StoryObj } from '@storybook/react';
import { composeStories } from '@storybook/react';

// A properly typed CSF module shape
type StoriesModule = {
    default: Meta<any>;
    [key: string]: StoryObj<any> | Meta<any>;
};

export const storybookTestRunner = (stories: StoriesModule) => {
    const composed = composeStories(stories);

    Object.entries(composed).forEach(([name, Story]) => {
        it(`${name} interaction test should pass`, async () => {
            await Story.run();
        });
    });
};
