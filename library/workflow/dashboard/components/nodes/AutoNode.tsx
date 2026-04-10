import React from 'react';
import { StandardNode } from './StandardNode';

// This is a standard auto node. Some items are automatically resolves
export const AutoNode = React.memo((props) => {
    // Simply pass through
    return <StandardNode {...props} />;
});
