import React from 'react';
import { FlexRow } from '@react/headless';
import { Badge, BadgeProps, Box, CircularProgress } from '@mui/material';
import styled from '@emotion/styled';

export type ImageBoxProps = {
    // Image Source
    source?: string;
    // The actual width and height of the image in pixel
    width?: number;
    height?: number;
    text?: string;
    scale?: number;
};

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        left: 'auto',
        right: 10,
        top: 10,
        transform: 'none',
        padding: '0 8px'
    }
}));

export const ImageBox = React.memo((props: ImageBoxProps) => {
    const { source, text, width, height } = props;
    const cleanWidth = width || 720;
    const cleanHeight = height || 720;
    const effectiveWidth = 200;
    const effectiveHeight = cleanHeight * (effectiveWidth / cleanWidth);

    const boxSx = {
        width: `${effectiveWidth}px`,
        height: `${effectiveHeight}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
        <Box sx={boxSx}>
            <StyledBadge
                badgeContent={text}
                color={source ? 'success' : 'primary'}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                <Box
                    sx={{
                        ...boxSx,
                        border: 2,
                        borderColor: source ? 'success.main' : 'primary.main',
                        borderRadius: 1
                    }}
                >
                    {source ? <ImageBoxLoaded {...props} /> : <ImageBoxLoading />}
                </Box>
            </StyledBadge>
        </Box>
    );
});

// When image is loading
const ImageBoxLoading = React.memo((props) => {
    return <CircularProgress aria-label="Loading…" sx={{ width: '100%', height: '100%' }} />;
});

const ImageBoxLoaded = React.memo((props: ImageBoxProps) => {
    const { source } = props;

    const handleClick = () => {
        if (!source) return;
        const win = window.open();
        if (win) {
            win.document.write(`<img src="${source}" style="max-width:100%;display:block;margin:auto;" />`);
            win.document.close();
        }
    };

    return (
        <FlexRow>
            <img src={source} alt="" width="100%" height="100%" onClick={handleClick} style={{ cursor: 'zoom-in' }} />
        </FlexRow>
    );
});
