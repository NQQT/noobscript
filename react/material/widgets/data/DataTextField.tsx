import React from 'react';
import { WidgetPropsType } from '@react/headless';
import { InputTextArea, InputTextAreaProps } from '../../components';
import { useStateHook } from '@presource/react';

export type DataTextFieldProps = WidgetPropsType & {
    label: string;
};
// This allows modification of data directly
export const DataTextField = React.memo((props: DataTextFieldProps) => {
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
            data[valuePointer] = value;
            // Updating the value into the input
            currentValue(value);
        }
    };

    return <InputTextArea {...inputProps} />;
});
