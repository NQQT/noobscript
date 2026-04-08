import React from 'react';
import { Typography } from '@mui/material';
import { prototypeComponent } from '@presource/react';

export type H1Props = {
    children: React.ReactNode;
};

export const H1 = React.memo((props: H1Props) => {
    const { children } = props;
    return <Typography variant="h1">{children}</Typography>;
});

export const h1 = prototypeComponent(H1, {
    children: 'Heading 1'
});
