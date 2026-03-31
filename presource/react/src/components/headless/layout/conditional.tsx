import React from 'react';

export type ShowOnlyProps = {
    if: boolean;
    children: React.ReactNode;
};

// Conditional ShowOnly
export const ShowOnly = React.memo((props: ShowOnlyProps) => {
    // Do not show if !== true
    if (!props.if) return null;

    // Otherwise, return the children
    return props.children;
});
