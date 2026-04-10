import { Meta } from '@storybook/react';
import { configureStoryControls } from '@library/test';
import { functionalComponent } from '@presource/react';
import { InputString } from './InputString';

// This is configuration
const meta: Meta = {
    title: 'Library/Workflow/Components/Input/Text Field',
    // Setting the component
    component: functionalComponent(InputString, (props) => {
        return {
            ...props,
            onChange: (newValue) => {
                props.value = newValue;
            }
        };
    })
};

export default meta;

configureStoryControls(meta, {
    label: 'name',
    value: false
});

// Storybook
export const TextField = {};
