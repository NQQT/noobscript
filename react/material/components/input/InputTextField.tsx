import React from 'react';
import { FormControl, Input, InputLabel, OutlinedInput } from '@mui/material';
import { stringSwitch } from '@presource/core';
import { prototypeComponent } from '@presource/react';

export type InputTextFieldProps = {
    label?: string;
    value?: string;
    variant?: 'standard' | 'outlined';
    onChange?: (value: string) => void;
    onEnter?: () => void;
};
export const InputTextField = React.memo((props: InputTextFieldProps) => {
    const { label, variant, value, onChange, onEnter } = props;

    const InputComponent = stringSwitch(variant || 'outlined', {
        outlined: () => OutlinedInput,
        default: () => Input
    });

    const inputComponentProps = {
        value,
        onChange: (event: any) => {
            onChange?.(event.target.value);
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                onEnter?.();
            }
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
