/**
 * Display Nodes reveals information only.
 * It should not do anything more than that.
 */
import React from 'react';
import { Container } from '../../components/container';

// Coordinate from the Top Left Corner
type Corrdinate = {
  // Basically the x-coordinate
  i: number;
  // Basically the y-coordinate
  j: number;
  // Attempting to create a box of specific width
  w: number;
  // Attempting to create a box of specific height
  h: number;
};

export const DisplayNodes = React.memo(() => {
  return <Container></Container>;
});
