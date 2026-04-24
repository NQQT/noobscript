interface StatusFile {
    filename: string;
    updated: string;
}

interface AgentStatus {
    status: string;
    details: string;
    duration: number;
}

export function parseComfyAgentStatuses(files: StatusFile[], now: Date = new Date()): Record<string, AgentStatus> {
    const agentMap = new Map<string, { status: string; details: string; updated: Date }>();

    for (const file of files) {
        const baseName = file.filename.replace(/\.status$/, '');
        const parts = baseName.split('_');

        if (parts.length < 3) continue;

        const agentName = parts[0].toLowerCase();
        const status = parts[1];
        const details = parts.slice(2).join('-');
        const updatedAt = new Date(file.updated);

        const existing = agentMap.get(agentName);
        if (!existing || updatedAt > existing.updated) {
            agentMap.set(agentName, { status, details, updated: updatedAt });
        }
    }

    return Object.fromEntries(
        [...agentMap.entries()].map(([agent, { status, details, updated }]) => [
            agent,
            {
                status,
                details,
                duration: Math.floor((now.getTime() - updated.getTime()) / 1000)
            }
        ])
    );
}
