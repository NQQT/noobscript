// Standard agent component props
export type AgentComponentProps = {
    // All agent should have name
    name: string;
    label: string;
    // The status of the agent
    status: 'active' | 'inactive';
    // How long does this task been running for
    duration: number;
};
