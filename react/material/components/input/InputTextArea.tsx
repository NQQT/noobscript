import React from 'react';
import { FormControl, Input, InputLabel, OutlinedInput } from '@mui/material';
import { stringSwitch } from '@presource/core';
import { prototypeComponent } from '@presource/react';

export type InputTextAreaProps = {
    label?: string;
    value?: string;
    variant?: 'standard' | 'outlined';
    rows?: number;
    maxRows?: number;
    onChange?: (value: string) => void;
};

export const InputTextArea = React.memo((props: InputTextAreaProps) => {
    const { label, variant, value, rows, maxRows, onChange } = props;

    const InputComponent = stringSwitch(variant, {
        outlined: () => OutlinedInput,
        default: () => Input
    });

    const inputComponentProps = {
        value,
        multiline: true,
        rows: maxRows ? undefined : rows,
        maxRows: maxRows ?? rows,
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

export const prototypeInputTextArea = prototypeComponent(InputTextArea, {
    label: 'Input Text Area',
    rows: 10
});
