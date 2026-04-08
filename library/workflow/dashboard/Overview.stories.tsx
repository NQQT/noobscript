import { Meta } from '@storybook/react';
import { WorkflowDashboardOverview } from '@library/workflow';
import { nodePipeline } from '@presource/pipeline';

const pipeline = nodePipeline();
pipeline.append(
    pipeline.create({
        values: {
            name: 'John',
            age: '39'
        }
    })
);

pipeline.append(
    pipeline.create({
        values: {
            name: 'Jane',
            age: '28'
        }
    })
);

pipeline.resolve();

// This is configuration
const meta: Meta = {
    title: 'Library/Workflow/Overview',
    // Setting the component
    component: WorkflowDashboardOverview,
    args: {
        pipeline
    }
};

export default meta;

// Storybook
export const Overview = {};
