import React from 'react';
import { FlexColumn, FlexRow } from '@react/headless';
import { InputSwitch } from '@react/material';

export type InputBooleanFieldProps = {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
};

// This is the input boolean field
export const InputBoolean = React.memo((props: InputBooleanFieldProps) => {
    const { label, value, onChange } = props;

    return (
        <FlexRow>
            <FlexColumn>{label}</FlexColumn>
            <FlexColumn>
                <InputSwitch value={value} onChange={onChange} />
            </FlexColumn>
        </FlexRow>
    );
});
