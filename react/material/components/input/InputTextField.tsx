import React from 'react';
import { FormControl, Input, InputLabel, OutlinedInput } from '@mui/material';
import { stringSwitch } from '@presource/core';
import { prototypeComponent } from '@presource/react';

export type InputTextFieldProps = {
    label?: string;
    value?: string;
    variant?: 'standard' | 'outlined';
    onChange?: (value: string) => void;
};
export const InputTextField = React.memo((props: InputTextFieldProps) => {
    const { label, variant, value, onChange } = props;

    const InputComponent = stringSwitch(variant, {
        outlined: () => OutlinedInput,
        default: () => Input
    });

    const inputComponentProps = {
        value,
        onChange: (event: any) => {
            onChange?.(event.target.value);
        }
    };

    return (
        <FormControl sx={{ width: '100%' }}>
            {label ? <InputLabel id={'label'}>{label}</InputLabel> : null}
            <InputComponent {...inputComponentProps} />
        </FormControl>
    );
});

export const prototypeInputTextField = prototypeComponent(InputTextField, {
    label: 'Input Text Field'
});
