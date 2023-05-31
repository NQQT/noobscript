import React from 'react';
import { createReactContextTree } from '@library/react';

/** Exporting Standard Tree Context */
export const {
  context: TreeContext,
  provider: TreeContextProvider,
  reactive: useTreeState,
  reference: useTreeReference,
  handler: treeContext,
} = createReactContextTree(React);
