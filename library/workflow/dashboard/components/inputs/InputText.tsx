import React from 'react';
import { FlexColumn, FlexRow } from '@react/headless';
import { InputTextField } from '@react/material';

export type InputTextFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
};

export const InputText = React.memo((props: InputTextFieldProps) => {
    const { label, value, onChange } = props;

    return (
        <FlexRow>
            <FlexColumn>{label}</FlexColumn>
            <FlexColumn>
                <InputTextField value={value} />
            </FlexColumn>
        </FlexRow>
    );
});
