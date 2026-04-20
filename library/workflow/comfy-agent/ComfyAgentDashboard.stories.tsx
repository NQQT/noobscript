import { Meta } from '@storybook/react';
import { ComfyAgentDashboard } from './ComfyAgentDashboard';
import { asTestStory } from '@library/test';

// This is configuration
const meta: Meta = {
    title: 'Library/Workflow/Comfy Agent/Dashboard',
    // Setting the component
    component: ComfyAgentDashboard
};

export default meta;

// Storybook
export const AgentDashboard = asTestStory(async () => {
    // TODO Add Test Later
});
