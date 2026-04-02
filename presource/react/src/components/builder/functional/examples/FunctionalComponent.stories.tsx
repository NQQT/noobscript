import { Meta } from '@storybook/react';
import { MaterialButton } from '@library/react';
import { functionalComponent } from '@presource/react';
import React from 'react';

const StandardButton = functionalComponent(MaterialButton, {
    label: 'Checking label',
    onClick() {
        this.label = 'Changed';
    }
});

// This is configuration
const meta: Meta = {
    title: 'Presource/React/Components/Functional/Functional Component',
    // Setting the component
    component: React.memo(() => {
        return (
            <>
                <StandardButton />
            </>
        );
    })
};

export default meta;

// Storybook
export const FunctionalComponent = {};
