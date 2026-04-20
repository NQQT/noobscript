import React from 'react';
import { WidgetPropsType } from '../type';
import { FlexColumn, FlexRow } from '@react/headless';
import { Button, ButtonProps, InputTextFieldProps, prototypeInputTextField } from '../../components';
import { useStateHook } from '@presource/react';

export type TextFieldWidgetProps = WidgetPropsType & {
    // Any additional type
};

const InputTextField = prototypeInputTextField({
    label: 'Text'
});

export const TextFieldWidget = React.memo((props: TextFieldWidgetProps) => {
    // Data Props
    const { data } = props;
    const inputValue = useStateHook(data?.value);

    const buttonProps: ButtonProps = {
        label: 'Submit',
        variant: 'outlined',
        onClick: () => {
            // Updating the data value with reference value
            data.value = inputValue();
        }
    };

    const inputFieldProps: InputTextFieldProps = {
        value: inputValue(),
        variant: 'outlined',
        onChange: (value) => {
            // Updating the value
            inputValue(value);
        },
        onEnter: () => {
            // Updating the data value with reference value
            data.value = inputValue();
        }
    };

    return (
        <FlexColumn>
            <FlexRow>
                <InputTextField {...inputFieldProps} />
            </FlexRow>
            <FlexRow justify={'flex-end'}>
                <Button {...buttonProps} />
            </FlexRow>
        </FlexColumn>
    );
});
