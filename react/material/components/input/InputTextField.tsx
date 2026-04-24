import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { prototypeComponent } from '@presource/react';

export type InputTextFieldProps = Omit<TextFieldProps, 'onChange', 'onEnter'> & {
    onChange?: (value: string) => void;
    onEnter?: () => void;
};
export const InputTextField = React.memo((props: InputTextFieldProps) => {
    const { variant, onChange, onEnter, ...rest } = props;

    const textFieldProps: TextFieldProps = {
        ...rest,
        variant: variant || 'outlined',
        fullWidth: true,
        onChange: (event: any) => {
            onChange?.(event.target.value);
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                onEnter?.();
            }
        }
    };

    return <TextField {...textFieldProps} />;
});

export const prototypeInputTextField = prototypeComponent(InputTextField, {
    label: 'Input Text Field'
});
