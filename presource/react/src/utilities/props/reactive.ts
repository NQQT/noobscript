import { useState } from 'react';
import { objectProxy } from '@presource/core';

export type PropsReactive = <T extends {}>(input: T) => T;
export const propsReactive: PropsReactive = (initialProps) => {
    const [props, setProps] = useState(initialProps);

    return objectProxy(props, {
        set: ({ key, value }) => {
            setProps({
                ...props,
                [key]: value
            });
            return true;
        }
    });
};
