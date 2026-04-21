import { Meta } from '@storybook/react';
import { JsonFieldEditor } from '@react/material';
import { asTestStory, widgetTestWrapper } from '@library/test';

// This is configuration
const meta: Meta = {
    title: 'React/Material/Widgets/Data/Json Field',
    // Setting the component
    component: widgetTestWrapper(JsonFieldEditor)
};

export default meta;

// Storybook
export const TextField = asTestStory(async () => {
    // TODO Adding necessary test
});
