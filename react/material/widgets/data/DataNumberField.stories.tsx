import { Meta } from '@storybook/react';
import { asTestStory, configureStoryControls, widgetTestWrapper } from '@library/test';
import { DataNumberField } from '@react/material';

// This is configuration
const meta: Meta = {
    title: 'React/Material/Widgets/Data/Number Field',
    // Setting the component
    component: widgetTestWrapper(DataNumberField, 100)
};

export default meta;

configureStoryControls(meta, {
    label: 'Input Number Field'
});

// Storybook
export const NumberField = asTestStory(async () => {
    // TODO Adding necessary test
});
