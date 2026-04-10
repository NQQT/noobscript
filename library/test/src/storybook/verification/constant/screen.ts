import { functionControl } from '@presource/core';
import { within } from 'storybook/test';
import { $memory } from './memory';

// Global $screen control
export const $screen = functionControl(({ key }) => {
    // Accessing the current storybook canvas element
    const { canvasElement } = $memory().playContext?.context!;

    const screen: any = within(canvasElement);

    return screen[key]?.bind(screen) || (canvasElement as any)[key]?.bind(canvasElement);
}) as Screen & HTMLElement;
