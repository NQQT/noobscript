import { Meta } from '@storybook/react';
import { materialButton } from '@library/react';
import { functionalComponent } from '@presource/react';

// This is configuration
const meta: Meta = {
    title: 'Presource/React/Components/Functional/Functional Button',
    // Setting the component
    component: functionalComponent(materialButton(), (props) => {
        return {
            ...props,
            // Onclick re-triggers the label
            onClick: () => {
                // Calculating the label
                const counter = props.label || 0;
                props.label = ((isNaN(+counter) ? 0 : +counter) + 1).toString();
            }
        };
    })
};

export default meta;

// Storybook
export const FunctionalButton = {};
