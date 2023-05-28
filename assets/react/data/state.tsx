import { objectObserve, objectUpdate } from '@library/presource';
import { useState } from 'react';

type ReactiveValueType = <T>(values: T) => T & (() => T);

/**
 * This is another way to use data without a context provider.
 * Everything is mounted and unmounted by useState
 */
export const createDataState: ReactiveValueType = (unproxiedData) => {
  // Set the Force Refresh Hook
  let forceRefresh;

  // This is a reactiveHook, useData
  const useData = () => {
    const setState = useState({})[1];
    // Force a Refresh
    forceRefresh = () => setState({});
    return useData;
  };
  objectUpdate(useData, unproxiedData);

  // Creating Proxy to modify actual unproxiedData
  const proxy: any = objectObserve(useData, ({ paths, method }) => {
    // Force forceRefresh data
    if (method === 'set') {
      forceRefresh();
    }
  });
  return proxy;
};
