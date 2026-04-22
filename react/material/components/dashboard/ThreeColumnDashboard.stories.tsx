import { Meta } from '@storybook/react';
import { ThreeColumnDashboard } from '@react/material';
import { asTestStory } from '@library/test';
import React from 'react';
import { FullScreen } from '@react/headless';

// This is configuration
const meta: Meta = {
    title: 'React/Material/Components/Dashboard/Three Column',
    // Setting the component
    component: React.memo(() => {
        const props = {
            leftColumn: <>{'left column'}</>,
            middleColumn: <>{'middle column'}</>,
            rightColumn: <>{'right column'}</>
        };

        return (
            <FullScreen>
                <ThreeColumnDashboard {...props} />
            </FullScreen>
        );
    })
};

export default meta;

// Storybook
export const ThreeColumn = asTestStory(async () => {
    // TODO Test
});
