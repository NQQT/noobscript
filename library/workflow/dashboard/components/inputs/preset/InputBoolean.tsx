import React from 'react';
import { FlexColumn, FlexRow } from '@react/headless';
import { InputSwitch } from '@react/material';
import { NodePipelineEntryProperty } from '@presource/utility';
import { reactiveComponent } from '@presource/react';

export type InputBooleanFieldProps = {
    label: string;
    property: NodePipelineEntryProperty;
};

// This is the input boolean field
export const InputBoolean = reactiveComponent((props: InputBooleanFieldProps) => {
    const { label, property } = props;

    return (
        <FlexRow justify={'space-between'}>
            <FlexColumn>{label}</FlexColumn>
            <FlexColumn>
                <InputSwitch
                    value={property.value}
                    onChange={(newValue) => {
                        // Updating property
                        property.value = newValue;
                    }}
                />
            </FlexColumn>
        </FlexRow>
    );
});
