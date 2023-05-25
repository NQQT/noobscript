import React, { createContext, useContext, useReducer } from 'react';
import { objectMerge } from '@library/presource';

type NestedObjectType = { [key: string]: any };
type ContextProviderType<T> = React.FC<{ value?: Partial<T>; children: React.ReactNode }>;
type ContextStateType = <T extends NestedObjectType>(
  initialState: T,
) => [
  ContextProviderType<T>,
  {
    (): T;
    (update: Partial<T>): void;
  },
];

/**
 * Simple use of Context State. This is not as efficient as tree. Or maybe it is more efficient
 * Who knows. It works, it works.
 */

export const createReactContextState: ContextStateType = (initialState) => {
  const Context = createContext(initialState);
  let dispatchHook;
  // Creating a Dispatch Function
  const useDispatcher = (input?) => {
    // If input is invalid, return the context
    if (!input) return useContext(Context);
    dispatchHook(input);
  };

  type T = typeof initialState;

  // Magic happens here
  const reducer = (state, update) => {
    return objectMerge(state, update) as T;
  };

  const ContextProvider: ContextProviderType<T> = React.memo(({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // Store it as reference
    dispatchHook = dispatch;
    return <Context.Provider value={state}>{children}</Context.Provider>;
  });

  // Passing the Context Provider
  return [ContextProvider, useDispatcher];
};
