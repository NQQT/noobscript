import React from 'react';
import { StandardBreakpoint } from './types';
import { objectEach, stringSwitch, typeSwitch } from '@presource/core';
import styled from '@emotion/styled';
import { styleCombine, styleMedia, styleStructure } from './utility';

type PrimaryInput<T> = {
    [key in keyof React.CSSProperties]: React.CSSProperties[key] | 'custom' | ((input: T) => {});
};

type StandardReactProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
};

type BreakpointProps = {
    [key in StandardBreakpoint]?: React.CSSProperties;
};

type Breakpoints<T = string | number> = T & {
    [key in StandardBreakpoint]?: T;
};

type BuilderType<T> = StandardReactProps &
    BreakpointProps & {
        [key in keyof T]?: Breakpoints<T[key]>;
    };

export type StyledComponent = <T>(component: string | React.FC<T>, input: PrimaryInput<T>) => React.FC<BuilderType<T>>;

// The styledComponent should return a React.FC<T>
export const styledComponent: StyledComponent = (component: any, input) => {
    const defaultStyling: any = {};
    const customStyling: any = {};

    // Scanning through the input
    objectEach(input, ({ key, value: data }) => {
        typeSwitch(data, {
            number: ({ value, default: defaultCallback }) => {
                defaultCallback(value);
            },
            string: ({ value, default: defaultCallback }) => {
                stringSwitch(value, {
                    custom: () => {
                        customStyling[key] = 'custom';
                    },
                    default: () => {
                        defaultCallback(value);
                    }
                });
            },
            function: ({ value }) => {
                customStyling[key] = (props: any) => {
                    return value(props);
                };
            },
            default: ({ value }) => {
                defaultStyling[key] = value;
            }
        });
    });

    return styled(component)((props) => {
        const { theme, ...rest } = props;
        const breakpoints = {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1600
        };

        const style: any = {};

        objectEach(customStyling, ({ key }) => {
            const value = typeSwitch(customStyling[key], {
                string: () => rest[key],
                function: ({ value: func }) => func(rest)
            });

            if (value !== undefined) {
                style[key] = styleStructure(value);
            }
        });

        return {
            ...defaultStyling,
            ...styleMedia(breakpoints, rest, styleCombine(style))
        };
    }) as any;
};
