import { Meta } from '@storybook/react';
import { InputDropdown } from '@react/material';
import { asTestStory, configureStoryControls } from '@library/test';
import React from 'react';

// This is configuration
const meta: Meta = {
    title: 'React/Material/Components/Input/Dropdown',
    // Setting the component
    component: React.memo((props) => {
        const options = ['apple', 'banana', 'pear'];
        return <InputDropdown options={options} {...props} />;
    })
};

export default meta;

configureStoryControls(meta, {
    label: 'Material dropdown'
});

// Storybook
export const Dropdown = asTestStory(async () => {
    // Add Test Stories
});
