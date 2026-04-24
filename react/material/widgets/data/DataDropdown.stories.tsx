import { Meta } from '@storybook/react';
import { asTestStory, configureStoryControls, widgetTestWrapper } from '@library/test';
import { DataDropdown } from '@react/material';
import React from 'react';

// This is configuration
const meta: Meta = {
    title: 'React/Material/Widgets/Data/Dropdown',
    // Setting the component
    component: widgetTestWrapper(
        React.memo((props) => {
            const options = ['apple', 'banana', 'pear'];

            return <DataDropdown {...props} options={options} />;
        }),
        'apple'
    )
};

export default meta;

configureStoryControls(meta, {
    label: 'Input Dropdown'
});

// Storybook
export const Dropdown = asTestStory(async () => {
    // TODO Adding necessary test
});
