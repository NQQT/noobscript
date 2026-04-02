import React from 'react';
import { isFunction, objectEach, typeSwitch } from '@presource/core';
import { isReactComponent, propsReactive } from '../../../utilities';

export type FunctionalComponent = <Component extends React.FC<React.ComponentProps<Component>>>(
    Component: Component | string,
    reactiveLogic?:
        | (React.ComponentProps<Component> & ThisType<React.ComponentProps<Component>>)
        | ((input: React.ComponentProps<Component>) => React.ReactNode | void | React.ComponentProps<Component>)
) => React.FC<Partial<React.ComponentProps<Component>>>;

export const functionalComponent: FunctionalComponent = (component, functionalProps) => {
    // Wrapping the Component correctly
    const Component: React.FC<any> = typeSwitch(component, {
        string: ({ value }) => {
            return () => value;
        },
        default: ({ value }) => value
    });

    return React.memo((props) => {
        // Evaluating the logic
        const evaluatedLogic = typeSwitch(functionalProps, {
            object: ({ value }) => {
                // We don't want to modify the original value
                const magicProps = { ...value };

                // Build it as reactive props
                const reactiveProps = propsReactive(magicProps);

                // Modifying the magic props, remapping all the values
                objectEach(magicProps, ({ key, value: originalValue }) => {
                    if (isFunction(originalValue)) {
                        magicProps[key] = (...args: any[]) => originalValue.apply(reactiveProps, args);
                    }
                });

                return reactiveProps;
            },
            function: ({ value }) => {
                return value(propsReactive(props));
            }
        });

        return typeSwitch(evaluatedLogic, {
            null: () => null,
            object: ({ value }) => {
                // If it is React component, returns it as is
                if (isReactComponent(value)) return value;

                return React.createElement(Component, value);
            },
            default: () => <Component {...props} />
        });
    }) as any;
};
