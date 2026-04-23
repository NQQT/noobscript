import { reactContextStore } from '@presource/react';
import { klein9bSingleFlow } from '../workflow';
import { comfyJson } from '@presource/utility';

export type ComfyAgentDashboardStore = {
    data: {
        bin: string;
        stashId: string;
        workflow: ReturnType<typeof comfyJson>;
    };
};

export const comfyAgentDashboardStore = reactContextStore<ComfyAgentDashboardStore>({
    data: {
        bin: 'random_job_42',
        stashId: 'temporary',
        workflow: klein9bSingleFlow
    }
});
