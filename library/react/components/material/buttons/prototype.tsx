import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { prototypeComponent } from '@presource/react';

export type MaterialButtonProps = Omit<ButtonProps, 'children'> & {
    label: string;
};

// Building a standard material Button
export const MaterialButton = React.memo((props: MaterialButtonProps) => {
    const { label, ...rest } = props;

    console.log('label:', label);

    return <Button {...rest}>{label}</Button>;
});

// Standard material button
export const materialButton = prototypeComponent(MaterialButton, {
    label: 'Material Button'
});
