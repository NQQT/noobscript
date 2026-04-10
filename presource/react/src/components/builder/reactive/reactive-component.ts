import React from 'react';
import { propsReactive } from '../../../utilities';

export type ReactiveComponent = <T extends {}>(component: React.FC<T>) => React.FC<T>;

// For building a reactive component
export const reactiveComponent: ReactiveComponent = (component) => {
    return React.memo((props: any) => {
        console.log('the props', props);

        return component(propsReactive(props));
    });
};
