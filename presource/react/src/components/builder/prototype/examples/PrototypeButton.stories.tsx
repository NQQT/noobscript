import { Meta } from '@storybook/react';
import { fn } from 'storybook/test';
import { materialButton } from '@library/react';

// This is configuration
const meta: Meta = {
    title: 'Presource/React/Components/Prototype/Prototype Button',
    // Setting the component
    component: materialButton(),
    args: {
        onClick: fn()
    }
};

export default meta;

// Storybook
export const PrototypeButton = {};
