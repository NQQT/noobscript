import { Meta } from '@storybook/react';
import { configureStoryControls } from '@library/test';
import { InputBoolean } from './InputBoolean';
import React from 'react';

// This is configuration
const meta: Meta = {
    title: 'Library/Workflow/Components/Input/Boolean Field',
    // Setting the component
    component: React.memo((props) => {
        const { label, value } = props;
        return <InputBoolean label={label} property={{ value }} />;
    })
};

export default meta;

configureStoryControls(meta, {
    label: 'name',
    value: false
});

// Storybook
export const BooleanField = {};
