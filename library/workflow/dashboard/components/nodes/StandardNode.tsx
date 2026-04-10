import React from 'react';
import { Card, CardContent, CardHeader, CardHeaderProps, IconButton, Paper } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { FlexColumn } from '@react/headless';
import { nodeComponent } from '../../utils';
import { Handle, Position } from 'reactflow';

export const StandardNode = nodeComponent(({ node }) => {
    const cardHeaderProps: CardHeaderProps = {
        title: 'Standard Node',
        subheader: 'Standard Node',
        action: (
            <IconButton>
                <ExpandMore />
            </IconButton>
        )
    };

    console.log('the nodes', node);

    const inputs = Object.keys(node.inputs);
    const outputs = Object.keys(node.outputs);

    return (
        <Card sx={{ minWidth: 450 }}>
            <CardHeader {...cardHeaderProps} />
            <CardContent>
                <FlexColumn>
                    {inputs.map((key) => {
                        return (
                            <Paper sx={{ position: 'relative' }}>
                                <Handle type="target" position={Position.Left} id={key} />
                            </Paper>
                        );
                    })}

                    {outputs.map((key) => {
                        return (
                            <Paper sx={{ position: 'relative' }}>
                                <Handle type="source" position={Position.Right} id={key} />
                            </Paper>
                        );
                    })}
                </FlexColumn>
            </CardContent>
        </Card>
    );
});
