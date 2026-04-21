import { Meta } from '@storybook/react';
import { ImageBox as MaterialImageBox } from '@react/material';
import { configureStoryControls } from '@library/test';
import React from 'react';
import { arrayCreate } from '@presource/core';
import { FlexRow } from '@react/headless';

// This is configuration
const meta: Meta = {
    title: 'React/Material/Components/Display/Image Box',
    // Setting the component
    component: React.memo((props) => {
        const { count, ...rest } = props;
        return (
            <FlexRow wrap={'wrap'} justify={'flex-start'}>
                {arrayCreate(count).map((index) => {
                    return <MaterialImageBox {...rest} key={index} />;
                })}
            </FlexRow>
        );
    })
};

export default meta;

configureStoryControls(meta, {
    count: 1,
    width: 1080,
    height: 720,
    source: 'https://oithis.com/oithis/images/real_examples.jpg',
    text: 'John'
});

// Storybook
export const ImageBox = {};
