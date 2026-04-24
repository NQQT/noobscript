import { Meta } from '@storybook/react';
import { InputTextField } from '@react/material';
import { configureStoryControls } from '@library/test';

// This is configuration
const meta: Meta = {
    title: 'React/Material/Components/Input/Text Field',
    // Setting the component
    component: InputTextField
};

export default meta;

configureStoryControls(meta, {
    label: 'Input text field',
    variant: ['standard', 'outlined']
});

// Storybook
export const TextField = {};
