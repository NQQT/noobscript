import React from 'react';
import { Typography } from '@mui/material';
import { prototypeComponent } from '@presource/react';

export type H2Props = {
    children: React.ReactNode;
};

export const H2 = React.memo((props: H2Props) => {
    const { children } = props;
    return <Typography variant="h1">{children}</Typography>;
});

// Standard prototype component
export const h2 = prototypeComponent(H2, {
    children: 'Heading 2'
});
