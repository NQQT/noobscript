import React from 'react';
import { prototypeComponent } from '@presource/react';
import { InputTextField, InputTextFieldProps } from './InputTextField';

export type InputTextAreaProps = InputTextFieldProps;

export const InputTextArea = React.memo((props: InputTextAreaProps) => {
    const { rows, ...rest } = props;

    const inputTextFieldProps: InputTextFieldProps = {
        ...rest,
        multiline: true,
        maxRows: rows
    };

    return <InputTextField {...inputTextFieldProps} />;
});

export const prototypeInputTextArea = prototypeComponent(InputTextArea, {
    label: 'Input Text Area',
    rows: 10
});
