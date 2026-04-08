import { Meta } from '@storybook/react';
import { fn } from 'storybook/test';
import { button } from '@react/material';

// This is configuration
const meta: Meta = {
    title: 'Presource/React/Components/Prototype/Prototype Button',
    // Setting the component
    component: button(),
    args: {
        onClick: fn()
    }
};

export default meta;

// Storybook
export const PrototypeButton = {};
