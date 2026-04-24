import { Meta } from '@storybook/react';
import { asTestStory, configureStoryControls, widgetTestWrapper } from '@library/test';
import { DataTextField } from '@react/material';

// This is configuration
const meta: Meta = {
    title: 'React/Material/Widgets/Data/Text Field',
    // Setting the component
    component: widgetTestWrapper(DataTextField, 'this is a value')
};

export default meta;

configureStoryControls(meta, {
    label: 'Input Text Field'
});

// Storybook
export const TextField = asTestStory(async () => {
    // TODO Adding necessary test
});
