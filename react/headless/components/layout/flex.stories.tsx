import { Meta } from '@storybook/react';
import { FlexColumn, FlexRow } from '@react/headless';
import React from 'react';
import { configureStoryControls } from '@library/test';

// This is configuration
const meta: Meta = {
    title: 'Presource/React/Components/Headless/Flex',
    // Setting the component
    component: React.memo(() => {
        return (
            <FlexRow>
                <FlexColumn isGrid>{1}</FlexColumn>
                <FlexColumn isGrid>{2}</FlexColumn>
                <FlexColumn isGrid>{3}</FlexColumn>
                <FlexColumn isGrid>{4}</FlexColumn>
            </FlexRow>
        );
    })
};

export default meta;

configureStoryControls(meta, {
    system: false
});

// Storybook
export const Flex = {};
