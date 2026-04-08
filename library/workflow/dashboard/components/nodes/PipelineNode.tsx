import React from 'react';
import { NodePipelineEntry } from '@presource/pipeline';
import { Handle, Position } from 'reactflow';

type WorkflowNodeProps = {
    data: {
        node: NodePipelineEntry;
    };
};
export const PipelineNode = React.memo((props: WorkflowNodeProps) => {
    const {
        data: { node }
    } = props;
    const style = {
        padding: '10px 20px',
        border: '1px solid #ccc',
        borderRadius: '4',
        background: '#fff'
    };

    const inputs = Object.keys(node.inputs);
    const outputs = Object.keys(node.outputs);

    return (
        <div style={style}>
            {inputs.map((inputId, i) => (
                <Handle
                    key={inputId}
                    type="target"
                    position={Position.Left}
                    id={inputId}
                    style={{ top: `${((i + 1) / (inputs.length + 1)) * 100}%` }}
                />
            ))}
            <span>{'Hi John!'}</span>
            {outputs.map((inputId, i) => (
                <Handle
                    key={inputId}
                    type="source"
                    position={Position.Right}
                    id={inputId}
                    style={{ top: `${((i + 1) / (outputs.length + 1)) * 100}%` }}
                />
            ))}
        </div>
    );
});
