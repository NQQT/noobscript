import { Meta } from '@storybook/react';
import { TextFieldWidget } from '@react/material';
import { asTestStory, widgetTestWrapper } from '@library/test';

// This is configuration
const meta: Meta = {
    title: 'React/Material/Widgets/Form/Text Field',
    // Setting the component
    component: widgetTestWrapper(TextFieldWidget)
};

export default meta;

// Storybook
export const TextField = asTestStory(async () => {
    // TODO Adding necessary test
});
