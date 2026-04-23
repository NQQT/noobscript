import React from 'react';
import { ThreeColumnDashboard } from '@react/material';
import { AgentPanelWidget, ImagePanelWidget, WorkflowPanelWidget } from './widgets';
import { FullScreen } from '@react/headless';
import { comfyAgentDashboardStore } from './context';

export const ComfyAgentDashboard = React.memo(() => {
    // Extracting out the data
    const { data } = comfyAgentDashboardStore();

    // Passing Data through the props
    const props = {
        leftColumn: <AgentPanelWidget data={data} />,
        middleColumn: <ImagePanelWidget data={data} />,
        rightColumn: <WorkflowPanelWidget data={data} />
    };

    return (
        <FullScreen>
            <ThreeColumnDashboard {...props} />
        </FullScreen>
    );
});
