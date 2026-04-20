import { Meta } from '@storybook/react';
import { asTestStory, configureStoryControls } from '@library/test';
import { InputTextArea } from './InputTextArea';

// This is configuration
const meta: Meta = {
    title: 'React/Material/Components/Input/Text Area',
    // Setting the component
    component: InputTextArea
};

export default meta;

configureStoryControls(meta, {
    label: 'Input Text Area'
});

// Storybook
export const TextArea = asTestStory(async () => {
    // Integration test
});
