import React from 'react';
import { FormControl, Input, InputLabel, OutlinedInput } from '@mui/material';
import { stringSwitch } from '@presource/core';
import { prototypeComponent } from '@presource/react';

export type InputTextFieldProps = {
    label?: string;
    variant?: 'standard' | 'outlined';
};

export const InputTextField = React.memo((props: InputTextFieldProps) => {
    const { label, variant } = props;

    // Base on the requirement, the input component is different
    const InputComponent = stringSwitch(variant, {
        outlined: () => OutlinedInput,
        default: () => Input
    });

    return (
        <FormControl>
            {label ? <InputLabel id={'label'}>{label}</InputLabel> : null}
            <InputComponent />
        </FormControl>
    );
});

export const prototypeInputTextField = prototypeComponent(InputTextField, {
    label: 'Input Text Field'
});
