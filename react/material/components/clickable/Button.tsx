import React from 'react';
import { Button as MaterialButton, ButtonProps as MaterialButtonProps } from '@mui/material';
import { prototypeComponent } from '@presource/react';

export type ButtonProps = Omit<MaterialButtonProps, 'children'> & {
    label: string;
};

// Building a standard material Button
export const Button = React.memo((props: ButtonProps) => {
    const { label, ...rest } = props;

    return <MaterialButton {...rest}>{label}</MaterialButton>;
});

// Standard material button
export const button = prototypeComponent(Button, {
    label: 'Material Button'
});
