import { Meta } from '@storybook/react';
import { InputSwitch } from '@react/material';
import { configureStoryControls } from '@library/test';

// This is configuration
const meta: Meta = {
    title: 'React/Material/Components/Input/Switch',
    // Setting the component
    component: InputSwitch
};

export default meta;

configureStoryControls(meta, {
    label: '',
    value: false
});

// Storybook
export const Switch = {};
