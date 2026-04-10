import React from 'react';
import { StandardNode } from './StandardNode';
import { NodeComponentProps } from '../../utils';

// Standard AutoNode Props
export type AutoNodeProps = {
    data: NodeComponentProps;
};

// This is a standard auto node. Some items are automatically resolves
export const AutoNode = React.memo((props: AutoNodeProps) => {
    // Simply pass through
    return <StandardNode {...props} />;
});
