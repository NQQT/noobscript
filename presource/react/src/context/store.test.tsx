import meta, { ContextStore } from './store.stories';
import { interactionTestRunner } from '@library/test';
import React from 'react';
import { Button, ButtonProps } from '@react/material';
import { render, screen } from '@testing-library/react';
import { reactContextStore } from './store';
// import userEvent from '@testing-library/user-event';
import { userEvent } from 'storybook/test';

describe('React Context Store Interaction Test', () => {
    interactionTestRunner(meta, {
        ContextStore
    });

    it('should triggers correctly', async () => {
        const context = reactContextStore({
            counter: 0
        });

        // Building the React Component
        const Component = React.memo(() => {
            const { counter } = context();
            const buttonProps: ButtonProps = {
                label: `Counter: ${counter}`,
                onClick: () => {
                    context.counter++;
                }
            };
            return <Button {...buttonProps} />;
        });

        render(<Component />);

        const user = userEvent.setup();
        await user.click(await screen.findByRole('button', { name: `Counter: 0` }));
        await user.click(await screen.findByRole('button', { name: `Counter: 1` }));
        await user.click(await screen.findByRole('button', { name: `Counter: 2` }));
    });
});
