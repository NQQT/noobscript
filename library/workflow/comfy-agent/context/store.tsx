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
        // Will change to today's date always for random job
        bin: 'random_job_42',
        stashId: '1776957040281',
        workflow: klein9bSingleFlow
    }
});
