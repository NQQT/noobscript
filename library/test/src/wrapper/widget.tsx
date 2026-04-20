import React from 'react';
import { FlexColumn } from '@react/headless';
import { propsReactive } from '@presource/react';

export const widgetTestWrapper = (Component: React.FC<any>) => {
    return React.memo((props: any) => {
        // Widget uses standard data input
        const data = propsReactive({
            value: 'test'
        });

        return (
            <FlexColumn>
                <pre>{JSON.stringify(data, null, 2)}</pre>
                <Component data={data} />
            </FlexColumn>
        );
    });
};
