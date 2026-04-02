import { objectEach } from '@presource/core';
import React from 'react';
import { ReactiveComponentProps } from '@presource/types';

// The PrototypeComponent Props
export type PrototypeComponent = <
    PrototypeProps extends ReactiveComponentProps<React.ComponentProps<Component>> &
        ReactiveComponentProps<PrototypeComponent>,
    Component extends React.FC<React.ComponentProps<Component>>
>(
    Component: Component,
    prototypeProps?: PrototypeProps
) => (
    overrideProps?: ReactiveComponentProps<React.ComponentProps<Component>>
) => React.FC<Partial<React.ComponentProps<Component>>>;

// Prototype Components
export const prototypeComponent: PrototypeComponent = (Component, prototypeProps) => {
    // Returning the factory function
    return (overrideProps: any) => {
        // Building the merged props
        const mergedProps = {
            ...prototypeProps,
            ...overrideProps
        };

        const fixedProps: any = {};
        const hookDrivenProps: any = {};

        // Calculating all the props
        objectEach(mergedProps, ({ key, value }) => {
            const propsKey = key.toString();
            if (propsKey.startsWith('use')) {
                const strippedKey = propsKey[3].toLowerCase() + propsKey.substring(4);
                hookDrivenProps[strippedKey] = value;
            } else {
                fixedProps[propsKey] = value;
            }
        });

        // Return a React component
        return React.memo((props) => {
            // Resolving the props
            const resolvedProps: any = {
                ...fixedProps,
                ...props
            };

            objectEach(hookDrivenProps, ({ key, value }) => {
                resolvedProps[key] = (value as any)(resolvedProps);
            });

            return <Component {...resolvedProps} />;
        });
    };
};
