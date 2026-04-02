import React from 'react';
import { signalState } from '../../../hooks';
import { isUndefined, objectProxy, typeSwitch } from '@presource/core';
import { isReactComponent } from '../../../utilities';

export type SingletonComponent = <T extends { [key: string]: any }>(
    component: React.FC<T>,
    initialProps?: Partial<T>
) => {
    (prop: string): any;
    (): React.ReactNode;
    (updateProps?: Partial<T>): void;
    state: ReturnType<typeof signalState<T>>;
};

// Singleton Button will bind all components to a single source
// This is useful when the same component appears in multiple places
export const singletonComponent: SingletonComponent = (componentDesign, initialProps = {}) => {
    const state = signalState(initialProps);

    // Singleton Component
    const Component = () => {
        // Ensuring things get rendered
        state();

        const reactiveProps = objectProxy(state.value(), {
            set: ({ key, value }) => {
                state({
                    ...state.value(),
                    [key]: value
                });
            }
        });

        const renderFunction = typeSwitch(componentDesign, {
            function: ({ value }) => value,
            object: ({ value }) => {
                if (isReactComponent(value)) {
                    // If it is a React Component
                    return (props: any) => {
                        return React.createElement(value as any, props);
                    };
                }
            }
        });

        // Render with reactive props
        return renderFunction(reactiveProps);
    };

    // Building the handler function
    const handler: any = (input: any) => {
        // If there is no input, just render it as it is
        if (isUndefined(input)) return <Component />;

        return typeSwitch(input, {
            string: ({ value: key }) => state.value()[key],
            // Props upgrade
            object: () => {
                state({
                    ...state.value(),
                    ...input
                });
            }
        });
    };

    // Adding State to the Handler Function
    Object.assign(handler, {
        state
    });

    return handler;
};
