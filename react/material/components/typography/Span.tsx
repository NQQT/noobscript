import React from 'react';
import { Typography } from '@mui/material';

export type SpanProps = {
    children: React.ReactNode;
};

export const Span = React.memo((props: SpanProps) => {
    const { children } = props;
    return <Typography>{children}</Typography>;
});
