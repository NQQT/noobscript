import { Meta } from '@storybook/react';
import { AgentComponent } from '@library/workflow';
import { asTestStory, configureStoryControls } from '@library/test';

// This is configuration
const meta: Meta = {
    title: 'Library/Workflow/Comfy Agent/Components/Agent/Agent Chip',
    // Setting the component
    component: AgentComponent
};

export default meta;

configureStoryControls(meta, {
    name: 'James',
    label: 'downloading files...',
    status: ['active', 'inactive', 'error'],
    duration: 999
});

// Storybook
export const AgentChip = asTestStory(async () => {
    // Add test
});
