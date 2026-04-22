import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppBar, Box, Paper, Toolbar, Typography } from '@mui/material';

export type ThreeColumnDashboardProps = {
    leftColumn: React.ReactNode;
    rightColumn: React.ReactNode;
    middleColumn: React.ReactNode;
};

const MIN_COL_WIDTH = 120;
const DIVIDER_WIDTH = 6;
const DIVIDER_COUNT = 2;

function useDrag(onDrag: (delta: number) => void) {
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

    // Column widths in pixels
    const [leftWidth, setLeftWidth] = useState<number | null>(null);
    const [rightWidth, setRightWidth] = useState<number | null>(null);

    // Initialize pixel widths from container on first render
    const getInitialWidths = useCallback(() => {
        if (!containerRef.current) return;
        if (leftWidth !== null) return; // already initialized
        const total = containerRef.current.offsetWidth - DIVIDER_WIDTH * DIVIDER_COUNT;
        setLeftWidth(Math.floor(total * 0.25));
        setRightWidth(Math.floor(total * 0.25));
    }, [leftWidth]);

    useEffect(() => {
        getInitialWidths();
    }, [getInitialWidths]);

    const getAvailableWidth = () =>
        containerRef.current ? containerRef.current.offsetWidth - DIVIDER_WIDTH * DIVIDER_COUNT : 800;

    const onDragLeft = useCallback(
        (delta: number) => {
            const total = getAvailableWidth();
            setLeftWidth((prev) => {
                const lw = prev ?? Math.floor(total * 0.25);
                const rw = rightWidth ?? Math.floor(total * 0.25);
                const newLeft = Math.max(MIN_COL_WIDTH, Math.min(lw + delta, total - rw - MIN_COL_WIDTH));
                const newMiddle = total - newLeft - rw;
                if (newMiddle < MIN_COL_WIDTH) return lw;
                return newLeft;
            });
        },
        [rightWidth]
    );

    const onDragRight = useCallback(
        (delta: number) => {
            const total = getAvailableWidth();
            setRightWidth((prev) => {
                const rw = prev ?? Math.floor(total * 0.25);
                const lw = leftWidth ?? Math.floor(total * 0.25);
                const newRight = Math.max(MIN_COL_WIDTH, Math.min(rw - delta, total - lw - MIN_COL_WIDTH));
                const newMiddle = total - lw - newRight;
                if (newMiddle < MIN_COL_WIDTH) return rw;
                return newRight;
            });
        },
        [leftWidth]
    );

    const leftDrag = useDrag(onDragLeft);
    const rightDrag = useDrag(onDragRight);

    const total = getAvailableWidth();
    const lw = leftWidth ?? Math.floor(total * 0.25);
    const rw = rightWidth ?? Math.floor(total * 0.25);

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
                {/* Left column — fixed pixel width */}
                <Box
                    sx={{
                        width: lw,
                        minWidth: MIN_COL_WIDTH,
                        flexShrink: 0,
                        overflow: 'auto'
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

                {/* Middle column — flex: 1 fills remaining space naturally */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: MIN_COL_WIDTH,
                        overflow: 'auto'
                        // No explicit width — it stretches to fill whatever's left
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

                {/* Right column — fixed pixel width */}
                <Box
                    sx={{
                        width: rw,
                        minWidth: MIN_COL_WIDTH,
                        flexShrink: 0,
                        overflow: 'auto'
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
