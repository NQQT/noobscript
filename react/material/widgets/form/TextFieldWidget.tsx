import React from 'react';
import { WidgetPropsType } from '../type';
import { FlexColumn, FlexRow } from '@react/headless';
import { Button, ButtonProps, prototypeInputTextField } from '../../components';
import { useReferenceHook } from '@presource/react';

export type TextFieldWidgetProps = WidgetPropsType & {
    // Any additional type
};

export const TextFieldWidget = React.memo((props: TextFieldWidgetProps) => {
    const { data } = props;
    const inputValue = useReferenceHook(data?.value);

    const buttonProps: ButtonProps = {
        label: 'Submit',
        variant: 'outlined',
        onClick: () => {
            // Updating the data value with reference value
            data.value = inputValue();
        }
    };

    const InputTextField = prototypeInputTextField({
        label: 'Text',
        onChange: (value) => {
            // Updating the value
            inputValue(value);
        }
    });

    return (
        <FlexColumn>
            <FlexRow>
                <InputTextField />
            </FlexRow>
            <FlexRow justify={'flex-end'}>
                <Button {...buttonProps} />
            </FlexRow>
        </FlexColumn>
    );
});
