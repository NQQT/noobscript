import React from 'react';
import { WidgetPropsType } from '../type';
import { FlexColumn } from '@react/headless';
import { TabContent } from '../../components';

export type DataFieldEditorProps = WidgetPropsType & {
    // Any additional type
};

export const JsonFieldEditor = React.memo((props: DataFieldEditorProps) => {
    // Extracting data
    const { data } = props;

    const content = {};

    return (
        <FlexColumn>
            <TabContent content={content} />
        </FlexColumn>
    );
});
