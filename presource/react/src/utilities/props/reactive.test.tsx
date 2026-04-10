import { propsReactive } from './reactive';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('reactive props requirement', () => {
    it('should cause a re-render with shallow props', async () => {
        type ComponentProps = { label: string };

        // Standard Component
        const Component = React.memo((props: ComponentProps) => {
            const reactiveProps = propsReactive({ ...props });

            const onClick = () => {
                reactiveProps.label = 'updated';
            };

            // Standard button example
            return <button onClick={onClick}>{reactiveProps.label}</button>;
        });

        const user = userEvent.setup();
        render(<Component label={'label'} />);

        // Clicking the button on the screen
        await user.click(await screen.findByRole('button', { name: 'label' }));

        // Expect that it works
        expect(await screen.findByRole('button', { name: 'updated' })).toBeDefined();
    });

    it('should cause a re-render with nested props', async () => {
        type ComponentProps = {
            family: {
                father: string;
                mother: string;
            };
        };

        // Standard Component
        const Component = React.memo((props: ComponentProps) => {
            const reactiveProps = propsReactive({ ...props });

            const onClick = () => {
                reactiveProps.family.father = 'Jack';
            };

            // Standard button example
            return <button onClick={onClick}>{reactiveProps.family.father}</button>;
        });

        const user = userEvent.setup();
        render(<Component family={{ father: 'John', mother: 'Jane' }} />);

        // Clicking the button on the screen
        await user.click(await screen.findByRole('button', { name: 'John' }));

        // Expect that it works
        expect(await screen.findByRole('button', { name: 'Jack' })).toBeDefined();
    });
});
