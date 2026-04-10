import { functionControl } from '@presource/core';
import { UserEvent, userEvent } from 'storybook/test';

export const $user = functionControl(({ key }) => {
    const user: any = userEvent.setup();
    return user[key]?.bind(user);
}) as UserEvent;
