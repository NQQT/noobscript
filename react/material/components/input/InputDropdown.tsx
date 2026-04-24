import React from 'react';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';

export type InputAutoCompleteProps = Omit<AutocompleteProps, 'onChange', 'renderInput'> & {
    onChange?: (value: any) => void;
};

// Standard input dropdown
export const InputDropdown = React.memo((props: InputAutoCompleteProps) => {
    const { label, options, onChange, ...rest } = props;

    // Configurating the input props
    const inputProps: AutocompleteProps = {
        ...rest,
        options: options || [],
        renderInput: (params) => {
            return <TextField {...params} label={label} />;
        },
        onChange: (_, value) => {
            // Calling on Change
            onChange?.(value);
        }
    };

    return <Autocomplete {...inputProps} />;
});
