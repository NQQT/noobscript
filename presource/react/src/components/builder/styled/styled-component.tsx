import React from 'react';
import { objectEach, stringSwitch, typeSwitch } from '@presource/core';
import styled from '@emotion/styled';
import { styleCombine, styleMedia, styleStructure } from './utility';

type PrimaryInput<T> = {
    [key in keyof React.CSSProperties]: React.CSSProperties[key] | 'custom' | ((input: T) => {});
};

export type StyledComponent = <T>(component: string | React.FC<T>, input: PrimaryInput<T>) => React.FC<T>;

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
    });
};
