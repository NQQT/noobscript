import React from 'react';
import { FullScreen } from '@react/headless';
import { ThreeColumnDashboard } from '@react/material';
import { AgentPanelWidget, ImagePanelWidget, WorkflowPanelWidget } from './widgets';
import { reactContextStore } from '@presource/react';
import { klein9bSingleFlow } from './workflow';

const store = reactContextStore({
    data: {
        bin: 'kaggle_test',
        workflow: klein9bSingleFlow
    }
});

export const ComfyAgentDashboard = React.memo(() => {
    // Extracting out the data
    const { data } = store();

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
