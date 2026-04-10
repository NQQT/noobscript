import React from 'react';
import { NodePipelineEntryProperty } from '@presource/utility';
import { isBoolean, stringSwitch } from '@presource/core';
import { InputBoolean, InputString } from './preset';

export type AutoInputProps = {
    label: string;
    property: NodePipelineEntryProperty;
};
export const AutoInput = React.memo((props: AutoInputProps) => {
    const {
        label,
        property: { value, type }
    } = props;

    // Determining the value type
    const valueType = type ? type : getValueType(value);

    return stringSwitch(valueType, {
        // if it is a boolean
        boolean: () => {
            const onChange = () => {
                // TODO
            };
            return <InputBoolean label={label} value={value} onChange={onChange} />;
        },
        string: () => {
            const onChange = () => {
                /// TODO
            };
            return <InputString label={label} value={value} onChange={onChange} />;
        },
        default: () => {
            const onChange = () => {
                /// TODO
            };
            return <InputString label={label} value={value} onChange={onChange} />;
        }
    });

    return null;
});

const getValueType = (value: any) => {
    if (isBoolean(value)) return 'boolean';
    // if it is a number, then determine it as a number
    if (!isNaN(+value)) return 'number';
    // If value length is less than 50 then it is a string
    if (value.length < 50) return 'string';
    // Return as a free text field
    return 'text';
};
