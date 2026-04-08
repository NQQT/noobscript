import React from 'react';
import { prototypeComponent } from '@presource/react';

export type HeadlessButtonProps = React.ComponentPropsWithoutRef<'button'> & {
    label: string;
};

// This is a standard headless button
export const HeadlessButton = React.memo((props: HeadlessButtonProps) => {
    const { label, ...rest } = props;

    return <button {...rest}>{label}</button>;
});

// Standard Prototype Component
export const headlessButton = prototypeComponent(HeadlessButton, {
    label: 'Headless Button'
});
