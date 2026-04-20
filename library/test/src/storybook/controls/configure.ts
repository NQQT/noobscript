import React from 'react';
import { Meta } from '@storybook/react';
import { objectMap, objectMerge, typeSwitch } from '@presource/core';

type AllowableType = string | number | boolean;
type StandardControlOptions = AllowableType | AllowableType[];
type ComplexControlOptions = { [key: string]: AllowableType };
type ControlSettingFullOptions = {
    default: any;
    options?: StandardControlOptions | ComplexControlOptions;
    control?: string;
};
type ReactNodeOptionList = {
    [key: string]: React.ReactNode;
};

type ControlList = {
    [key: string]: StandardControlOptions | ControlSettingFullOptions | ReactNodeOptionList;
};

type ConfigureStoryControls = (meta: Meta<any>, controls?: ControlList) => ConfigureStoryControls;

export const configureStoryControls: ConfigureStoryControls = (meta, controls = {}) => {
    const fullControls = convertToStandardFormat(controls);
    const storybookControls = convertToStorybookFormat(fullControls);

    meta.argTypes = objectMerge((meta.argTypes ||= {}), storybookControls);
    const { argTypes } = meta;

    const args = objectMap(argTypes as typeof storybookControls, ({ value }) => {
        return value.default;
    });

    meta.args = objectMerge((meta.args ||= {}), args);

    return (newMeta, newControls = {}) => {
        return configureStoryControls(newMeta, objectMerge(newControls, argTypes));
    };
};

// This is to convert the control to standard format
const convertToStandardFormat = (controls: ControlList) => {
    return objectMap(controls, ({ value: option }) => {
        return typeSwitch(option, {
            boolean: ({ value }) => ({
                default: value,
                control: 'boolean'
            }),
            number: ({ value }) => ({
                default: value,
                control: 'number'
            }),
            string: ({ value }) => ({
                default: value,
                control: 'text'
            }),
            array: ({ value }) => {
                const initialValue = value[0];
                if (value.length < 5) {
                    return {
                        default: initialValue,
                        options: value,
                        control: 'radio'
                    };
                }
                return {
                    default: initialValue,
                    options: value,
                    control: 'select'
                };
            },
            function: () => {
                // TODO. Something to do with function
            },
            default: ({ value }: any) => {
                if (value.control) return value;
                const keyList = Object.keys(value);
                return {
                    options: keyList,
                    mapping: value,
                    control: {
                        type: 'select',
                        labels: objectMap(value, ({ key }) => key)
                    }
                };
            }
        });
    }) as {
        [key: string]: ControlSettingFullOptions;
    };
};

const convertToStorybookFormat = (controls: { [key: string]: ControlSettingFullOptions }) => {
    return objectMap(controls, ({ value }) => {
        const { control } = value;
        const result: any = {
            ...value,
            control: {
                type: ''
            }
        };

        typeSwitch(control, {
            string: () => {
                result.control.type = control;
            },
            object: () => {
                result.control = control;
            }
        });

        return result;
    });
};
