import React from 'react';

export type StandardBreakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Breakpoints<T = string | number> = T & {
    [key in StandardBreakpoints]?: T;
};

export type BreakpointStyling = {
    [key in StandardBreakpoints]?: React.CSSProperties;
};

// For combination styling
export type CombinedStyleList<T = string | number> = {
    [key in StandardBreakpoints]?: { [key: string]: T };
};
