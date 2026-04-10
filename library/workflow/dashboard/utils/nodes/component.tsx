import React from 'react';
import { NodePipelineEntry } from '@presource/pipeline';

// The Node Component Props to be passed in
type NodeComponentProps = {
    // This is the node pipeline entry
    node: NodePipelineEntry;
};

type NodeComponent = (component: React.FC<WorkflowNodeProps>) => React.FC<WorkflowNodeProps>;

export const nodeComponent: NodeComponent = (Component) => {
    // Simply return the node component for now
    return React.memo((props: NodeComponentProps) => {
        const { data } = props;

        // Passing in the props
        const componentProps = {
            node: data.node
        };

        return <Component {...componentProps} />;
    });
};
