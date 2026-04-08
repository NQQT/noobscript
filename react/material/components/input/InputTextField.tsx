import React from 'react';
import { FormControl, Input } from '@mui/material';

export type InputTextFieldProps = {
    label?: string;
};

export const InputTextField = React.memo((props: InputTextFieldProps) => {
    const { label } = props;
    return (
        <FormControl>
            {label ? <InputLabel id={'label'}>{label}</InputLabel> : null}
            <Input />
        </FormControl>
    );
});
