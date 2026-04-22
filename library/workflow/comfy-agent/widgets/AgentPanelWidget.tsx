import React, { useEffect } from 'react';
import { FlexColumn, FlexRow } from '@react/headless';
import { AgentComponent } from '../components';
import { signalState } from '@presource/react';
import { Filebin, parseComfyAgentStatuses } from '@presource/web';

// Creating a signal
const agents = signalState({} as ReturnType<typeof parseComfyAgentStatuses>);

const repeatingCall = (data: AgentPanelWidgetProps['data']) => {
    const { bin } = data;
    const filebin = new Filebin({ bin: `${bin}_agent` });
    filebin.list().then((list) => {
        const result = parseComfyAgentStatuses(list);
        // Updating agent
        agents(result);
        // Repeat the call

        setTimeout(() => {
            repeatingCall(data);
        }, 0);
    });
};

export type AgentPanelWidgetProps = {
    data: {
        bin: string;
    };
};

export const AgentPanelWidget = React.memo((props: AgentPanelWidgetProps) => {
    const { data } = props;
    const list = agents();

    useEffect(() => {
        repeatingCall(data);
    }, []);

    return (
        <FlexColumn padding={2}>
            {Object.keys(list).map((name, key) => {
                const { status, duration, details } = list[name];

                const agentProps: any = {
                    name,
                    label: details,
                    status,
                    duration
                };
                return (
                    <FlexRow justify={'flex-start'} key={key}>
                        <AgentComponent {...agentProps} />
                    </FlexRow>
                );
            })}
        </FlexColumn>
    );
});
