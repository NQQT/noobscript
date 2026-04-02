import { useRef, useState } from 'react';
import { objectProxy } from '@presource/core';

export type PropsReactive = <T extends { [key: string]: any }>(input: T) => T;

export const propsReactive: PropsReactive = (changeableProps) => {
    const [_, refresh] = useState({});

    console.log('changed props', changeableProps);
    // ref always holds the latest props, never stale
    const propsRef = useRef(changeableProps);
    console.log('propsrefs', propsRef.current);

    return objectProxy(propsRef.current, {
        get: ({ key }) => {
            // Always read from the live ref, not the closure snapshot
            return propsRef.current[key];
        },
        set: ({ key, value }) => {
            propsRef.current = { ...propsRef.current, [key]: value };

            // Tell the component to refresh
            refresh({});
            return true;
        }
    });
};
