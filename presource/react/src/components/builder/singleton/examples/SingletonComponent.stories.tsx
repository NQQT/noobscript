import { Meta } from '@storybook/react';
import { Button } from '@react/material';
import { singletonComponent } from '@presource/react';
import React from 'react';

// You can build reactive button with functional component!
const singletonButton = singletonComponent(Button, {
    label: 'SingletonButton',
    onClick: () => {
        singletonButton({
            label: 'All changed'
        });
    }
});

// This is configuration
const meta: Meta = {
    title: 'Presource/React/Components/Singleton/Singleton Component',
    // Setting the component
    component: React.memo(() => {
        return (
            <>
                {singletonButton()}
                {singletonButton()}
                {singletonButton()}
                {singletonButton()}
            </>
        );
    })
};

export default meta;

// Storybook
export const SingletonButton = {};
