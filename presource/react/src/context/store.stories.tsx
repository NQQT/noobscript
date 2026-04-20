import { Meta } from '@storybook/react';
import { $dom, asTestStory } from '@library/test';
import React from 'react';
import { Button } from '@react/material';
import { reactContextStore } from '@presource/react';
import { FlexRow } from '@react/headless';

// This is configuration
const meta: Meta = {
    title: 'Presource/React/Context/Context Store',
    // Setting the component
    component: React.memo(() => {
        const reactStore = React.useMemo(
            () =>
                reactContextStore({
                    counter: 0
                }),
            []
        );
        // Demonstration of the context store
        const { counter } = reactStore();

        console.log('re-rendered');
        return (
            <FlexRow wrap={'wrap'}>
                <Button
                    label={`Counter: ${counter}`}
                    onClick={() => {
                        console.log('clicked');
                        reactStore.counter++;
                    }}
                />
                <Button label={`Reset`} />
            </FlexRow>
        );
    })
};

export default meta;

// Verifying that counter button works
export const ContextStore = asTestStory(async () => {
    await $dom.button('Counter: 0').click();
    await $dom.button('Counter: 1').click();
    await $dom.button('Counter: 2').click();
    await $dom.button('Counter: 3').click();
});
