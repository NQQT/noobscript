import React from 'react';
import { Button, InputTextArea, InputTextAreaProps, TabContent } from '@react/material';
import { FlexColumn, FlexRow } from '@react/headless';
import { comfyJson } from '@presource/utility';
import { useStateHook } from '@presource/react';
import { Filebin } from '@presource/web';

export type WorkflowPanelWidgetProps = {
    data: {
        bin: string;
        workflow: ReturnType<typeof comfyJson>;
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
        data: { workflow, bin }
    } = props;

    const configs = workflow.configs();
    const names = Object.keys(configs);
    return (
        <FlexColumn>
            <FlexColumn>
                {names.map((name, key) => {
                    const { inputs, options } = configs[name];
                    return (
                        <FlexColumn key={key}>
                            {Object.keys(options).map((inputKey, editorKey) => {
                                const { type } = options[inputKey];

                                const editorProps = {
                                    type,
                                    label: inputKey,
                                    inputs
                                };

                                return <Editor {...editorProps} />;
                            })}
                        </FlexColumn>
                    );
                })}
            </FlexColumn>
            <FlexRow justify={'flex-end'}>
                <Button
                    variant={'contained'}
                    color={'primary'}
                    label={'Submit'}
                    onClick={() => {
                        // When clicked, this should submit to the server
                        const filebin = new Filebin({ bin });
                        // Submitting the file
                        filebin.upload('workflow.json', workflow.string());
                    }}
                />
            </FlexRow>
        </FlexColumn>
    );
});

type EditorProps = {
    label: string;
    type: string;
    inputs: ReturnType<WorkflowPanelWidgetProps['data']['workflow']['configs']>[0]['inputs'];
};

const Editor = React.memo((props: EditorProps) => {
    const { label, inputs } = props;
    // The orignal value
    const state = useStateHook(inputs[label]);

    // Input props
    const inputProps: InputTextAreaProps = {
        label,
        variant: 'outlined',
        value: state(),
        onChange: (value: string) => {
            inputs[label] = value;
            state(value);
        }
    };

    // The individual input
    return <InputTextArea {...inputProps} />;
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
