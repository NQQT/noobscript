import { Meta } from '@storybook/react';
import { asTestStory, configureStoryControls } from '@library/test';
import { TabContent as MaterialTabContent } from './TabContent';
import React from 'react';
import { objectCreate } from '@presource/core';

// This is configuration
const meta: Meta = {
    title: 'React/Material/Components/Layout/Tab Content',
    // Setting the component
    component: React.memo(({ count }) => {
        const props = {
            content: objectCreate(count, ({ value }) => <>{`Content for ${value}`}</>)
        };
        return <MaterialTabContent {...props} />;
    })
};

export default meta;

configureStoryControls(meta, {
    count: 1
});

// Storybook
export const TabContent = asTestStory(async () => {
    // TODO
});
