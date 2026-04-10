import { functionControl } from '@presource/core';
import { Meta, ReactRenderer, StoryObj } from '@storybook/react';
import { PlayFunction, StoryContext } from 'storybook/internal/types';

type ContextMemory<T = any> = {
    meta: Meta<T> | null;
    currentStory: StoryObj<T> | null;
    playContext: StoryContext<ReactRenderer, T> | null;
    playFunction: PlayFunction<ReactRenderer, T> | null;
};

const storyMemory: ContextMemory = {
    meta: null,
    currentStory: null,
    playContext: null,
    playFunction: null
};

export const $memory = functionControl<ContextMemory>(({ key }) => {
    return key ? (storyMemory as any)[key] : storyMemory;
});
