import React from 'react';
import { WidgetPropsType } from '@react/headless';
import { InputTextAreaProps } from '../../components';
import { useStateHook } from '@presource/react';
import { InputTextField } from '@react/material';

export type DataNumberFieldProps = WidgetPropsType & {
    label: string;
};
// This allows modification of data directly
export const DataNumberField = React.memo((props: DataNumberFieldProps) => {
    // Extracting out the necessary label
    const { label, data, alias } = props;
    // The value pointer
    const valuePointer = alias?.value || 'value';

    // Get the current value
    const currentValue = useStateHook(data[valuePointer]);

    // Configuring the input props
    const inputProps: InputTextAreaProps = {
        label,
        // Setting the current value
        value: currentValue(),
        // It will cause onchange modification
        onChange: (value: string) => {
            const numberedValue = +value;
            // Only allow update if it is a number
            if (!isNaN(numberedValue)) {
                data[valuePointer] = numberedValue;
                // Updating the value into the input
                currentValue(numberedValue);
            }
        }
    };

    return <InputTextField {...inputProps} />;
});
