import React from 'react';
import { styledDivComponent } from '../../builder';

export type FlexColumnProps = {
    justify: React.CSSProperties['justifyContent'];
    spacing: number;
    padding: number;
    margin: number;
    // If true, flex-basis = 0 and flex-grow =
    isGrid: boolean;
};

export const FlexColumn = styledDivComponent<FlexColumnProps>({
    display: 'flex',
    justifyContent: ({ justify }) => justify || 'space-between',
    flexDirection: 'column',
    flexBasis: ({ isGrid }) => (isGrid ? '0' : 'auto'),
    flexGrow: ({ isGrid }) => (isGrid ? '1' : '0'),
    padding: 'custom',
    margin: 'custom',
    gap: ({ spacing }) => spacing || 2
});

export type FlexRowProps = {
    justify: React.CSSProperties['justifyContent'];
    align: React.CSSProperties['alignItems'];
    wrap: React.CSSProperties['flexWrap'];
    padding: number;
    margin: number;
    spacing: number;
};

export const FlexRow = styledDivComponent<FlexRowProps>({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: ({ wrap }) => wrap || 'nowrap',
    justifyContent: ({ justify }) => justify || 'center',
    alignItems: ({ align }) => align || 'center',
    padding: 'custom',
    margin: 'custom',
    gap: ({ spacing }) => spacing || 2
});
