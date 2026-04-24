import { WidgetPropsType } from '@react/headless';
import { InputDropdown } from '../../components';
import { useStateHook } from '@presource/react';
import React from 'react';

export type DataDropdownProps = WidgetPropsType & {
    label: string;
    // List of available options
    options: string[] | { label: string }[];
};

// Configuration for the data dropdown
export const DataDropdown = React.memo((props: DataDropdownProps) => {
    const { label, data, alias, options } = props;
    // The value pointer
    const valuePointer = alias?.value || 'value';
    const currentValue = useStateHook(data[valuePointer]);

    const inputProps = {
        label,
        options,
        value: currentValue(),
        onChange: (value) => {
            currentValue(value);
            data[valuePointer] = value;
        }
    };

    return <InputDropdown {...inputProps} />;
});
