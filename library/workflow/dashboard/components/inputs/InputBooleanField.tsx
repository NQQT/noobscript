import React from 'react';

export type InputBooleanFieldProps = {
    label: string;
    value: boolean;
};
// This is the input boolean field
export const InputBooleanField = React.memo((props: InputBooleanFieldProps) => {
    return <FlexRow></FlexRow>;
});
