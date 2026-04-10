import { Meta } from '@storybook/react';
import { configureStoryControls } from '@library/test';
import { InputBoolean } from './InputBoolean';
import { functionalComponent } from '@presource/react';

// This is configuration
const meta: Meta = {
    title: 'Library/Workflow/Components/Input/Boolean Field',
    // Setting the component
    component: functionalComponent(InputBoolean, (props) => {
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
export const BooleanField = {};
