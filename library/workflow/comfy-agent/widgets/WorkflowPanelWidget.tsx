import React from 'react';
import { InputTextArea, TabContent } from '@react/material';
import { FlexColumn } from '@react/headless';
import { jsonEditor } from '@presource/utility';

export type WorkflowPanelWidgetProps = {
    data: {
        bin: string;
        workflow: ReturnType<typeof jsonEditor>;
    };
};

export const WorkflowPanelWidget = React.memo((props: WorkflowPanelWidgetProps) => {
    const content = {
        Panel: <GraphicEditor {...props} />,
        Raw: <RawEditor {...props} />
    };

    return (
        <FlexColumn padding={2}>
            <TabContent content={content} />
        </FlexColumn>
    );
});

const GraphicEditor = React.memo((props: WorkflowPanelWidgetProps) => {
    const {
        data: { workflow }
    } = props;

    return (
        <FlexColumn>
            <FlexColumn>{'waiting'}</FlexColumn>
        </FlexColumn>
    );
});

const RawEditor = React.memo((props: WorkflowPanelWidgetProps) => {
    const {
        data: { workflow }
    } = props;

    return (
        <FlexColumn>
            <FlexColumn>
                <InputTextArea variant={'outlined'} value={workflow.string()} />
            </FlexColumn>
        </FlexColumn>
    );
});
