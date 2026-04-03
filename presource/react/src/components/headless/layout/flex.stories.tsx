import { Meta } from '@storybook/react';
import { FlexColumn, FlexRow } from '@presource/react';
import React from 'react';

// This is configuration
const meta: Meta = {
    title: 'Presource/React/Components/Headless/Flex',
    // Setting the component
    component: React.memo(() => {
        return (
            <FlexRow justify={'flex-start'}>
                <FlexColumn>{1}</FlexColumn>
                <FlexColumn>{2}</FlexColumn>
                <FlexColumn>{3}</FlexColumn>
                <FlexColumn>{4}</FlexColumn>
            </FlexRow>
        );
    })
};

export default meta;

// Storybook
export const Flex = {};
