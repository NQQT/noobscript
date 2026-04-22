import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppBar, Box, Paper, Toolbar, Typography } from '@mui/material';

export type ThreeColumnDashboardProps = {
    leftColumn: React.ReactNode;
    rightColumn: React.ReactNode;
    middleColumn: React.ReactNode;
};

const MIN_COL_WIDTH = 120;
const DIVIDER_WIDTH = 6;

function useDrag(onDrag: (delta: number) => void, containerRef: React.RefObject<HTMLDivElement>) {
    const dragging = useRef(false);
    const lastX = useRef(0);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        dragging.current = true;
        lastX.current = e.clientX;
        e.preventDefault();
    }, []);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!dragging.current) return;
            const delta = e.clientX - lastX.current;
            lastX.current = e.clientX;
            onDrag(delta);
        };
        const onMouseUp = () => {
            dragging.current = false;
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [onDrag]);

    return { onMouseDown };
}

export const ThreeColumnDashboard = React.memo((props: ThreeColumnDashboardProps) => {
    const { leftColumn, middleColumn, rightColumn } = props;
    const containerRef = useRef<HTMLDivElement>(null);

    // Column widths as fractions (0–1), left + middle + right = 1
    const [leftPct, setLeftPct] = useState(0.25);
    const [rightPct, setRightPct] = useState(0.25);
    // middlePct = 1 - leftPct - rightPct

    const getContainerWidth = () => (containerRef.current ? containerRef.current.offsetWidth - DIVIDER_WIDTH * 2 : 800);

    // Drag the divider between left and middle
    const onDragLeft = useCallback(
        (delta: number) => {
            const total = getContainerWidth();
            setLeftPct((prev) => {
                const middlePct = 1 - prev - rightPct;
                const newLeft = Math.max(
                    MIN_COL_WIDTH / total,
                    Math.min(prev + delta / total, 1 - rightPct - MIN_COL_WIDTH / total)
                );
                const newMiddle = 1 - newLeft - rightPct;
                if (newMiddle * total < MIN_COL_WIDTH) return prev;
                return newLeft;
            });
        },
        [rightPct]
    );

    // Drag the divider between middle and right
    const onDragRight = useCallback(
        (delta: number) => {
            const total = getContainerWidth();
            setRightPct((prev) => {
                const middlePct = 1 - leftPct - prev;
                const newRight = Math.max(
                    MIN_COL_WIDTH / total,
                    Math.min(prev - delta / total, 1 - leftPct - MIN_COL_WIDTH / total)
                );
                const newMiddle = 1 - leftPct - newRight;
                if (newMiddle * total < MIN_COL_WIDTH) return prev;
                return newRight;
            });
        },
        [leftPct]
    );

    const leftDrag = useDrag(onDragLeft, containerRef);
    const rightDrag = useDrag(onDragRight, containerRef);

    const middlePct = 1 - leftPct - rightPct;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100%',
                overflow: 'hidden',
                bgcolor: 'background.default'
            }}
        >
            {/* Header */}
            <AppBar position="static" elevation={1} sx={{ flexShrink: 0, zIndex: 10 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Column area */}
            <Box
                ref={containerRef}
                sx={{
                    display: 'flex',
                    flex: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    minHeight: 0
                }}
            >
                {/* Left column */}
                <Box
                    sx={{
                        width: `${leftPct * 100}%`,
                        minWidth: MIN_COL_WIDTH,
                        overflow: 'auto',
                        flexShrink: 0
                    }}
                >
                    <Paper square elevation={0} sx={{ height: '100%', borderRight: 1, borderColor: 'divider' }}>
                        {leftColumn}
                    </Paper>
                </Box>

                {/* Divider: left | middle */}
                <Box
                    {...leftDrag}
                    sx={{
                        width: DIVIDER_WIDTH,
                        cursor: 'col-resize',
                        flexShrink: 0,
                        bgcolor: 'divider',
                        transition: 'background-color 0.15s',
                        '&:hover': { bgcolor: 'primary.main' },
                        '&:active': { bgcolor: 'primary.dark' },
                        zIndex: 1
                    }}
                />

                {/* Middle column */}
                <Box
                    sx={{
                        width: `${middlePct * 100}%`,
                        minWidth: MIN_COL_WIDTH,
                        overflow: 'auto',
                        flexShrink: 0,
                        flexGrow: 1
                    }}
                >
                    <Paper square elevation={0} sx={{ height: '100%' }}>
                        {middleColumn}
                    </Paper>
                </Box>

                {/* Divider: middle | right */}
                <Box
                    {...rightDrag}
                    sx={{
                        width: DIVIDER_WIDTH,
                        cursor: 'col-resize',
                        flexShrink: 0,
                        bgcolor: 'divider',
                        transition: 'background-color 0.15s',
                        '&:hover': { bgcolor: 'primary.main' },
                        '&:active': { bgcolor: 'primary.dark' },
                        zIndex: 1
                    }}
                />

                {/* Right column */}
                <Box
                    sx={{
                        width: `${rightPct * 100}%`,
                        minWidth: MIN_COL_WIDTH,
                        overflow: 'auto',
                        flexShrink: 0
                    }}
                >
                    <Paper square elevation={0} sx={{ height: '100%', borderLeft: 1, borderColor: 'divider' }}>
                        {rightColumn}
                    </Paper>
                </Box>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    flexShrink: 0,
                    px: 3,
                    py: 1.5,
                    bgcolor: 'background.paper',
                    borderTop: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Typography variant="caption" color="text.secondary">
                    © {new Date().getFullYear()} Dashboard Footer
                </Typography>
            </Box>
        </Box>
    );
});
