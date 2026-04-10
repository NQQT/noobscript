import React from 'react';
import { Card, CardContent, CardHeader, CardHeaderProps, IconButton, Paper } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { FlexColumn } from '@react/headless';
import { nodeComponent } from '../../utils';
import { Handle, Position } from 'reactflow';
import { AutoInput } from '../inputs';

// Standard Nodes displays everything, giving the most complex controls
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

    const properties = Object.keys(node.properties);

    return (
        <Card sx={{ minWidth: 450 }}>
            <CardHeader {...cardHeaderProps} />
            <CardContent>
                <FlexColumn>
                    {properties.map((key) => {
                        return (
                            <Paper key={key} sx={{ position: 'relative', padding: '0px 5px' }}>
                                <AutoInput label={key} property={node.properties[key]} />
                                <Handle type="target" position={Position.Left} id={key} />
                                <Handle type="source" position={Position.Right} id={key} />
                            </Paper>
                        );
                    })}
                </FlexColumn>
            </CardContent>
        </Card>
    );
});
