import { functionControl } from '@presource/core';
import { userEvent } from 'storybook/test';

export const $user = functionControl(({ key }) => {
    const user = userEvent.setup();
    return user[key as keyof typeof user]?.bind(user);
}) as ReturnType<typeof userEvent.setup>;
