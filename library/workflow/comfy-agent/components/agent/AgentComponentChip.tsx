// Design for loading agent
import React from 'react';
import { Avatar, Badge, BadgeProps, Chip, ChipProps, useTheme } from '@mui/material';
import { AgentComponentProps } from './agent-type';
import { stringSwitch } from '@presource/core';
import { stringAbbreviate } from '@presource/utility';

export const AgentComponent = React.memo((props: AgentComponentProps) => {
    const { name, label, duration, status } = props;
    const theme = useTheme();

    const chipProps: ChipProps = {
        label: label || 'no idea...',
        variant: 'outlined'
    };

    stringSwitch(status, {
        active: () => {
            chipProps.color = 'success';
        },
        inactive: () => {
            chipProps.color = 'primary';
        },
        attention: () => {
            chipProps.color = 'warning';
        },
        default: () => {
            chipProps.color = 'error';
        }
    });

    const badgeProps: BadgeProps = {
        badgeContent: `${duration || 0}`,
        color: chipProps.color,
        max: 999
    };

    // Resolve actual hex values from the theme — bypasses outlined chip CSS overrides
    const palette = (theme as any).palette[chipProps.color!];

    chipProps.avatar = (
        <Avatar
            sx={{
                // !important needed to win over .MuiChip-outlined .MuiAvatar-root
                bgcolor: `${palette.main} !important`,
                color: `${palette.contrastText} !important`
            }}
        >
            {stringAbbreviate(name)}
        </Avatar>
    );

    return (
        <Badge {...badgeProps}>
            <Chip {...chipProps} />
        </Badge>
    );
});
