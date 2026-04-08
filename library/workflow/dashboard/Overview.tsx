import React, { useCallback } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap, useEdgesState, useNodesState } from 'reactflow';

import 'reactflow/dist/style.css';
import { NodePipeline } from '@presource/pipeline';
import { PipelineNode } from './components';
import { nodeDefinitions } from './utils/nodes';

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } }
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export type WorkflowDashboardOverview = {
    pipeline: NodePipeline;
};

const nodeTypes = {
    pipelineNode: PipelineNode
};

export const WorkflowDashboardOverview = React.memo((props: WorkflowDashboardOverviewProps) => {
    const { pipeline } = props;

    const [nodes, setNodes, onNodesChange] = useNodesState(nodeDefinitions(pipeline));
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
});
