import { isEqual, objectObserve, objectUpdate } from '@library/presource';
import { useEffect, useState } from 'react';

type ReactiveValueType = <T>(values: T) => T & (() => T);

/**
 * This is another way to use data without a context provider.
 * Everything is mounted and unmounted by useState
 * !!
 */
export const createDataState: ReactiveValueType = (unproxiedData) => {
  // List of components that need to be refreshed if state changes.
  const list = new Set<() => void>();

  // This is a reactiveHook, useData
  const useData = () => {
    // Calling this will make sure the component render on refresh
    const setState = useState({})[1];
    useEffect(() => {
      // The refresh hook
      const refresh = () => setState({});
      // Adding the refresh hook into the list to be re-rendered
      list.add(refresh);
      return () => {
        // Clean up. Remove the hook if refresh happened.
        list.delete(refresh);
      };
    }, []);
    // Adding new Refresh Instance to Memory
    return useData;
  };

  // Wrapping use data with unproxied data
  objectUpdate(useData, unproxiedData);

  // Creating Proxy to modify actual unproxiedData
  const proxy: any = objectObserve(useData, ({ paths, method }) => {
    // Force forceRefresh data
    if (isEqual(method, 'set')) {
      // Forcing everything to be refreshed
      list.forEach((refresh) => refresh());
    }
  });

  // Return the proxy for generation instead
  return proxy;
};
