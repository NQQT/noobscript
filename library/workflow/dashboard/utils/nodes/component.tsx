import React from 'react';
import { NodePipelineEntry } from '@presource/utility';

// The Node Component Props to be passed in
export type NodeComponentProps = {
    // This is the node pipeline entry
    node: NodePipelineEntry;
};

export type NodeComponent = (component: React.FC<NodeComponentProps>) => React.FC<{ data: NodeComponentProps }>;

// For building the nodeComponent
export const nodeComponent: NodeComponent = (Component) => {
    // Simply return the node component for now
    return React.memo((props) => {
        const {
            data: { node }
        } = props;

        // Passing in the props
        const componentProps = {
            node
        };

        return <Component {...componentProps} />;
    });
};
