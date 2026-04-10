import { Meta } from '@storybook/react';
import { Button, ButtonProps } from '@react/material';
import React from 'react';
import { configureStoryControls } from '@library/test';
import { reactiveComponent } from '../reactive-component';

// This is configuration
const meta: Meta = {
    title: 'Presource/React/Components/Reactive/Reactive Button',
    // Setting the component
    component: reactiveComponent((props: ButtonProps) => {
        return (
            <Button
                {...props}
                onClick={() => {
                    props.label = 'Label Changed!';
                }}
            />
        );
    })
};

export default meta;

configureStoryControls(meta, {
    label: 'Reactive Button'
});

// Storybook
export const ReactiveButton = {};
