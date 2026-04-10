import React from 'react';
import { Switch, SwitchProps } from '@mui/material';

export type InputSwitchProps = {
    label?: string;
    value?: boolean;
    onChange?: (value: boolean) => void;
};

export const InputSwitch = React.memo((props: InputSwitchProps) => {
    const { value, onChange } = props;

    const switchProps: SwitchProps = {
        checked: !!value,
        onClick: () => {
            // When onclick. Changes the value
            onChange?.(!value);
        }
    };
    return <Switch {...switchProps} />;
});
